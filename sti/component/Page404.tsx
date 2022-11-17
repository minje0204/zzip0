// @ts-nocheck
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const Page404: Test = () => {
  const router = useRouter();
  return (
    <DivContainer>
      <Container404>
        <h1>찾으시는 페이지가 존재하지 않습니다.</h1>
        <img src="/Icon404.png" alt="PageNotFound" style={{ width: '300px' }} />
        <div>
          <Button
            onClick={() => router.push('/')}
            variant="contained"
            color="secondary"
            sx={{ color: 'white' }}
          >
            홈으로 가기
          </Button>
        </div>
      </Container404>
    </DivContainer>
  );
};

export default Page404;

const Container404 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const DivContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;
