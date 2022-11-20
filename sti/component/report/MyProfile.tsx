// @ts-nocheck
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
//mui, css
import home from '../../styles/Home.module.css';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import SettingsIcon from '@mui/icons-material/Settings';
//api
import { getUser, getOther, updateUser } from '../../lib/api/member';
import {
  getFollowee,
  getFollower,
  postFollow,
  deleteFollow
} from '../../lib/api/follow';
import { patchProfileImg } from '../../lib/api/profileImg';
// recoil
import { userState } from '../../lib/recoil/member';
import {
  profileFollowerState,
  profileFolloweeState,
  profileNameState
} from '../../lib/recoil/follow';
import { useRecoilState } from 'recoil';

interface Test {}

const MyProfile: Test = () => {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [data, setData] = useState({
    memberName: '',
    email: '',
    profileImage: ''
  });
  const router = useRouter();
  const params = router.query;
  const [email, setEmail] = useState('');
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [follower, setFollower] = useRecoilState(profileFollowerState);
  const [followerCnt, setFollowerCnt] = useState(0);
  const [followee, setFollowee] = useRecoilState(profileFolloweeState);
  const [followeeCnt, setFolloweeCnt] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [isMe, setIsMe] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [proBtnText, setProBtnText] = useState('프로필 편집');
  const [nameValue, setNameValue] = useState('');
  const [myContent, setMyContent] = useState('');
  const [profileName, setProfileName] = useRecoilState(profileNameState);
  const [profileFollowers, setProfileFollowers] = useState([]);
  const fileInput = useRef(null);
  const [imgData, setImgData] = useState('/blank.jpg');

  const handleBtnClick = () => {
    // 나인데 프로필 편집중이었음
    if (isMe && isEdit) {
      setProBtnText('프로필 편집');
      updateUserInfo();
      setIsEdit(false);
      // 이름 수정하는  api 여기다가 요청 보내기
    } else if (isMe && !isEdit) {
      setProBtnText('완료');
      setIsEdit(true);
    } else if (!isMe && isFollow) {
      // 내가 follow 하고 있는 사람
      setProBtnText('팔로우 하기');
      setIsFollow(false);
      setFollowerCnt(followerCnt - 1);
      unfollow();
    } else if (!isMe && !isFollow) {
      // 내가 follow 하고 있지 않은 사람
      setProBtnText('팔로우 취소');
      setIsFollow(true);
      setFollowerCnt(followerCnt + 1);
      follow();
    }
  };
  const onChange = (e) => {
    if (e.target.files[0]) {
      const formData = new FormData();
      formData.append('upload', e.target.files[0]);
      patchProfileImg(formData).then((res) => {
        setImgData(res.data);
      });
    } else {
      //업로드 취소할 시
      setImageData(`/blank.jpg`);
      return;
    }
  };
  const handleImgError = (e) => {
    e.target.src = `/blank.jpg`;
  };
  const changeName = (e) => {
    setNameValue(e.target.value);
  };
  const changeContent = (e) => {
    setMyContent(e.target.value);
  };
  const changeProfile = () => {
    fileInput.current.click();
  };
  const updateUserInfo = () => {
    updateUser({
      memberName: nameValue,
      introduce: myContent
    });
  };
  const cntFollowee = (value) => {
    getFollowee(value).then((res) => {
      if (res.data != null) {
        setFollowee(res.data);
        setFolloweeCnt(res.data.length);
      }
    });
  };
  const cntFollower = (value) => {
    getFollower(value).then((res) => {
      if (res.data != null) {
        setFollower(res.data);
        setFollowerCnt(res.data.length);
      }
    });
  };
  const follow = () => {
    postFollow(params.proId);
  };
  const unfollow = () => {
    deleteFollow(params.proId);
  };
  const checkIsFollow = () => {
    if (follower) {
      follower.map((data) => {
        if (data.providerId - currentUser.providerId == 0) {
          setIsFollow(true);
          return;
        }
        setIsFollow(false);
      });
    }
  };
  useEffect(() => {
    // 나인지 받아오는 것
    getUser().then((res) => {
      setCurrentUser(res.data);
      setEmail(res.data.email);
      setId(res.data.providerId);
      setName(res.data.memberName);
    });
  }, []);
  useEffect(() => {
    if (params.proId) {
      cntFollowee(params.proId);
      cntFollower(params.proId);
      getOther(params.proId).then((res) => {
        setImgData(res.data.profileImage);
        setProfileName(res.data.memberName);
        setNameValue(res.data.memberName);
        setMyContent(res.data.introduce);
      });
    }
  }, [router.isReady]);
  useEffect(() => {
    if (params.proId) {
      checkIsFollow();
    }
  }, [router.isReady, currentUser, follower]);
  useEffect(() => {
    if (params.proId - currentUser.providerId === 0) {
      setIsMe(true);
      setProBtnText('프로필 편집');
    } else {
      setIsMe(false);
      if (isFollow) {
        setProBtnText('팔로우 취소');
      } else {
        setProBtnText('팔로우 하기');
      }
    }
  }, [currentUser, router.isReady, isFollow]);
  return (
    <div className={home.homecontainer}>
      <input
        type="file"
        style={{ display: 'none' }}
        accept="image/jpg,impge/png,image/jpeg"
        name="profile_img"
        onChange={onChange}
        ref={fileInput}
      />
      <ProfileContainer>
        <ProfileTopContainer>
          <ProfileImgContainer>
            {imgData == null ? (
              <img
                src={'/blank.jpg'}
                id="pro-img"
                onError={(e) => handleImgError(e)}
              />
            ) : (
              <img
                src={imgData}
                id="pro-img"
                onError={(e) => handleImgError(e)}
              />
            )}

            {isMe ? (
              <Button
                color="inherit"
                className="btn1"
                onClick={() => {
                  changeProfile();
                }}
                sx={{
                  padding: '0px',
                  '&.MuiButtonBase-root:hover': {
                    bgcolor: 'transparent'
                  }
                }}
              >
                <SettingsIcon />
              </Button>
            ) : null}
          </ProfileImgContainer>
          <ProfileRightContainer>
            <div id="myname">
              {isEdit ? (
                <Input
                  defaultValue={nameValue}
                  onChange={(e) => changeName(e)}
                  sx={{ width: '190px', fontSize: '14px' }}
                />
              ) : (
                <div id="name-container">{nameValue}</div>
              )}

              <Button
                color="inherit"
                variant="outlined"
                fontSize="12px"
                onClick={() => {
                  handleBtnClick();
                }}
                sx={{ width: '100px', padding: '3px', fontSize: '14px' }}
              >
                {proBtnText}
              </Button>
            </div>
            <div id="followerContainer">
              <div id="follower">
                <div>팔로워 </div>
                <div id="follownum">{followerCnt}</div>
              </div>
              <div id="follower">
                <div>팔로잉 </div>
                <div id="follownum">{followeeCnt}</div>
              </div>
            </div>
            <div id="myscript">
              한줄 소개 👻
              {isEdit ? (
                <Input
                  defaultValue={myContent}
                  onChange={(e) => changeContent(e)}
                  sx={{ width: '300px', fontSize: '18px' }}
                />
              ) : (
                <div>{myContent}</div>
              )}
            </div>
            <MyInfoContainer></MyInfoContainer>
          </ProfileRightContainer>
        </ProfileTopContainer>
      </ProfileContainer>
    </div>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 250px;
`;
const ProfileImgContainer = styled.div`
  overflow: hidden;
  width: 280px;
  #pro-img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
  }
  .btn1 {
    position: relative;
    width: 10px;
    top: -20px;
    left: -50px;
  }
`;
const MyInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ProfileTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  #follower {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const ProfileRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  #followerContainer {
    display: flex;
    width: 100%;

    margin-bottom: 10px;
  }
  #follower {
    margin-right: 30px;
    font-size: 14px;
    justify-content: center;
    align-items: center;
  }
  #myname {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    margin-bottom: 10px;
  }
  #myscript {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 18px;
  }
  #name-container {
    font-size: 20px;
    font-weight: 700;
    margin-right: 20px;
  }
  #follownum {
    font-weight: bold;
    margin-left: 5px;
    font-size: 14px;
  }
  #muscript {
    width: 100%;
    margin-left: 100px;
  }
`;

export default MyProfile;
