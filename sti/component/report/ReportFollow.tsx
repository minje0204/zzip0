// @ts-nocheck
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { getYearTimeView } from '../../lib/api/timeview';

import { useRecoilState } from 'recoil';
import {
  profileFollowerState,
  profileFolloweeState,
  profileNameState
} from '../../lib/recoil/follow';

interface Test {}

const ReportFollow: Test = () => {
  const [follower, setFollower] = useRecoilState(profileFollowerState);
  const [followee, setFollowee] = useRecoilState(profileFolloweeState);
  const [nameValue, setNameValue] = useRecoilState(profileNameState);

  useEffect(() => {
    console.log(follower, followee);
    console.log(profileNameState);
  }, []);

  const handleImgError = (e) => {
    e.target.src = `/blank.jpg`;
  };
  const moveProfile = (targetId) => {
    window.open(`/report/${targetId}`, '_blank');
  };

  return (
    <ReportFollowContainer>
      <ReportFollowerContainer>
        {nameValue}님을 팔로우 하는 사람들
        {follower.map((data) => (
          <div id="follow-items" onClick={() => moveProfile(data.providerId)}>
            <img
              id="profile-follow-img"
              src={`${data.profileImage}`}
              onError={(e) => handleImgError(e)}
            />
            <div id="follow-text">{data.membername}</div>
          </div>
        ))}
      </ReportFollowerContainer>
      <ReportFolloweeContainer>
        {nameValue}님이 팔로우 하는 사람들
        {followee.map((data) => (
          <div id="follow-items" onClick={() => moveProfile(data.providerId)}>
            <img
              id="profile-follow-img"
              src={`${data.profileImage}`}
              onError={(e) => handleImgError(e)}
            />
            <div id="follow-text">{data.membername}</div>
          </div>
        ))}
      </ReportFolloweeContainer>
    </ReportFollowContainer>
  );
};

const ReportFollowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  postiion: relative;
  overflow: hidden;
  padding: 30px;
  margin: 30px 0px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.5);

  #profile-follow-img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
  }
  #follow-items {
    display: flex;
    width: 300px;
    align-items: center;
    cursor: pointer;
    background-color: rgba(245, 243, 242);
    margin: 5px 30px;
    padding: 20px;
    border-radius: 20px;
  }
  #follow-items:hover {
    filter: brightness(0.9);
  }
  #follow-text {
    font-family: NotoSans;
    font-weight: bold;
  }
`;

const ReportFollowerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ReportFolloweeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export default ReportFollow;
