// @ts-nocheck
import { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
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
  const [email, setEmail] = useState('');
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isMe, setIsMe] = useState(false);
  const [isFollow, setIsFollow] = useState(false);


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
    postFollow({
      followeePID: '103213797029368742484'
    }).then((res) => {
      console.log(res);
    });
  };

  const unFollow = () => {
    deleteFollow({
      followeePID: '103213797029368742484'
    }).then((res) => {
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
  return (
    <div className={home.homecontainer}>
      <ProfileContainer>
        <ProfileTopContainer>
          <ProfileImgContainer>
            <img src={`/roomsample.jpeg`} id="pro-img" />
          </ProfileImgContainer>
          <ProfileRightContainer>
            <div id="myname">
              <div id="name-container">이름</div>
              <Button 
              color="inherit" 
              variant="outlined" 
              ontSize='12px'
              sx={{ width: '100px', padding: '3px'}}>프로필 편집</Button>
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
            <MyInfoContainer>
              
            </MyInfoContainer>
          </ProfileRightContainer>
        </ProfileTopContainer>
      </ProfileContainer>
      <div>{email}</div>
      <div>{id}</div>
      <div>{name}</div>
      <button onClick={updateUserInfo}>회원정보 수정</button>
      <button onClick={getFollowList}>follow 가져오기</button>
      <button onClick={follow}>follow</button>
      <button onClick={unFollow}>unfollow</button>
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
  #followerContainer{
    display: flex;
    width: 100%;
    margin-left: 100px;
    margin-bottom: 10px;
  }
  #follower {
    margin-right: 30px;
    font-size:14px;
    justify-content: center;
    align-items: center;
  }
  #myname {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-left: 100px;
    margin-bottom: 10px;
  }
  #name-container{
    width: 70px;
    font-size: 20px;
    font-weight: 700;
    margin-right: 20px;
  }
  #follownum{
    font-weight: bold;
  }
  #muscript {
    width: 100%;
    margin-left: 100px;
  }
`;

export default MyProfile;
