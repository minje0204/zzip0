// @ts-nocheck
import { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
//mui, css
import home from '../../styles/Home.module.css';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
//api
import { getUser, updateUser, widthdrawUser } from '../../lib/api/member';
import { getFollow, postFollow, deleteFollow } from '../../lib/api/follow';
// recoil
import { userState } from '../../lib/recoil/member';
import { useRecoilState } from 'recoil';
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
  const [isEdit, setIsEdit] = useState(false);
  const [isMe, setIsMe] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [proBtnText, setProBtnText] = useState('프로필 편집');
  const [nameValue, setNameValue] = useState('');

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
      unFollow();
    } else if (!isMe && !isFollow) {
      // 내가 follow 하고 있지 않은 사람
      setProBtnText('팔로우 취소');
      setIsFollow(true);
      follow();
    }
  };

  const ChangeName = (e) => {
    setNameValue(e.target.value);
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

  const getFollowList = () => {
    getFollow().then((res) => {
      console.log(res);
    });
  };

  const follow = () => {
    console.log({ followeePID: params.proId });
    postFollow(params.proId).then((res) => {
      console.log(res);
    });
  };

  const unFollow = () => {
    deleteFollow(params.proId).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    // 나인지 받아오는 것
    getUser().then((res) => {
      console.log(res);
      setCurrentUser(res.data);
      setEmail(res.data.email);
      setId(res.data.providerId);
      setName(res.data.membername);
    });
  }, []);

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
      <ProfileContainer>
        <ProfileTopContainer>
          <ProfileImgContainer>
            <img src={`/roomsample.jpeg`} id="pro-img" />
          </ProfileImgContainer>
          <ProfileRightContainer>
            <div id="myname">
              {isEdit ? (
                <Input
                  defaultValue={currentUser.membername}
                  onChange={(e) => ChangeName(e)}
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
                <div id="follownum">00</div>
              </div>
              <div id="follower">
                <div>팔로잉 </div>
                <div>00</div>
              </div>
            </div>
            <div id="muscript">자기소개</div>
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
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  #pro-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
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
  }
  #muscript {
    width: 100%;
    margin-left: 100px;
  }
`;

export default MyProfile;
