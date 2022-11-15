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
import { getUser, updateUser, getOther } from '../../lib/api/member';
import {
  getFollowee,
  getFollower,
  postFollow,
  deleteFollow
} from '../../lib/api/follow';
// recoil
import { userState } from '../../lib/recoil/member';
import { useRecoilState } from 'recoil';
import { read } from 'fs';
interface Test {}

const MyProfile: Test = () => {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [data, setData] = useState({
    membername: '',
    email: '',
    profileImage: ''
  });
  const router = useRouter();
  const params = router.query;
  const [email, setEmail] = useState('');
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [follower, setFollower] = useState(0);
  const [followee, setFollowee] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [isMe, setIsMe] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [proBtnText, setProBtnText] = useState('프로필 편집');
  const [nameValue, setNameValue] = useState('');
  const [Image, setImage] = useState('/blank.jpg');
  const fileInput = useRef(null);

  const handleBtnClick = () => {
    // 나인데 프로필 편집중이었음
    if (isMe && isEdit) {
      setProBtnText('완료');
      setIsEdit(false);
      // 이름 수정하는  api 여기다가 요청 보내기
    } else if (isMe && !isEdit) {
      setProBtnText('프로필 편집');
      setIsEdit(true);
    } else if (!isMe && isFollow) {
      // 내가 follow 하고 있는 사람
      setProBtnText('팔로우 하기');
      setIsFollow(false);
      setFollowee(followee - 1);
      unFollow();
    } else if (!isMe && !isFollow) {
      // 내가 follow 하고 있지 않은 사람
      setProBtnText('팔로우 취소');
      setIsFollow(true);
      setFollowee(follower + 1);
      follow();
    }
  };
  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setImage('/blank.png');
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const changeName = (e) => {
    setNameValue(e.target.value);
  };

  const changeProfile = () => {
    fileInput.current.click();
  };

  const updateUserInfo = () => {
    updateUser({
      membername: '이름수정테스트',
      email: '2riing2@gmail.com',
      profileImage: '..'
    }).then((res) => {
      console.log(res);
    });
  };
  const cntFollowee = (value) => {
    getFollowee(value).then((res) => {
      if (res.data != null) {
        setFollowee(res.data.length);
      }
    });
  };
  const cntFollower = (value) => {
    getFollower(value).then((res) => {
      if (res.data != null) {
        setFollower(res.data.length);
      }
    });
  };
  const follow = () => {
    postFollow(params.proId).then((res) => {});
  };
  const unFollow = () => {
    deleteFollow(params.proId).then((res) => {});
  };

  useEffect(() => {
    // 나인지 받아오는 것
    getUser().then((res) => {
      setCurrentUser(res.data);
      setEmail(res.data.email);
      setId(res.data.providerId);
      setName(res.data.membername);
    });
  }, []);

  useEffect(() => {
    cntFollowee(params.proId);
    cntFollower(params.proId);
    getOther(params.proId).then((res) => {
      console.log('other user info', res.data);
    });
  }, [router.isReady]);

  useEffect(() => {
    console.log('id출력', params.proId, currentUser.providerId);
    if (params.proId === currentUser.providerId) {
      console.log('its me!');
      setIsMe(true);
      setProBtnText('프로필 편집');
    } else {
      setIsMe(false);
      console.log('not me');
      if (isFollow) {
        setProBtnText('팔로우 취소');
      } else {
        setProBtnText('팔로우 하기');
      }
    }
  }, [currentUser]);

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
            <img src={`/blank.jpg`} id="pro-img" />
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
          </ProfileImgContainer>
          <ProfileRightContainer>
            <div id="myname">
              {isEdit ? (
                <Input
                  defaultValue={currentUser.membername}
                  onChange={(e) => changeName(e)}
                />
              ) : (
                <div id="name-container">{currentUser.membername}</div>
              )}

              <Button
                color="inherit"
                variant="outlined"
                fontSize="12px"
                onClick={() => {
                  handleBtnClick();
                }}
                sx={{ width: '100px', padding: '3px' }}
              >
                {proBtnText}
              </Button>
            </div>
            <div id="followerContainer">
              <div id="follower">
                <div>팔로워 </div>
                <div id="follownum">{follower}</div>
              </div>
              <div id="follower">
                <div>팔로잉 </div>
                <div id="follownum">{followee}</div>
              </div>
            </div>
            <div id="myscript">자기소개</div>
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
  postiion: relative;
  overflow: hidden;
  #pro-img {
    width: 100px;
    height: 100px;
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
    margin-left: 100px;
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
    margin-left: 100px;
    margin-bottom: 10px;
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
