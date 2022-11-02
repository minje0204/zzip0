import React from 'react';

import Link from 'next/link';

import { GOOGLE_AUTH_URL } from '../src/constants';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { IconButton } from '@mui/material';

import { useRecoilState } from 'recoil';
import { LoginModalOpen } from '../lib/recoil/Modal';

const SignIn = ({ cookies }) => {
  const [open, setOpen] = useRecoilState(LoginModalOpen);

  const cookieStringToObject = (cookieString, key) => {
    if (!cookieString) {
      return '';
    } else {
      cookieString = cookieString.split('; ');
      let result = {};

      for (var i = 0; i < cookieString.length; i++) {
        var cur = cookieString[i].split('=');
        result[cur[0]] = cur[1];
      }
      return result[key];
    }
  };

  const request = (options) => {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    let token = cookieStringToObject(cookies, 'accessToken');

    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    const defaults = { headers: headers };
    console.log(defaults.headers.get('Authorization'));

    options = Object.assign({}, defaults, options);

    return fetch(options.url, options).then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    );
  };

  const onClickhandler = () => {
    console.log('click');
    request({ url: 'https://zzip0.com/api/user/me', method: 'GET' })
      .then((res) => {
        console.log('good');
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <GoogleBtnContainer>
        <ModalHeader>
          <div>
            <strong>Log in with Google</strong>
          </div>
          <div>
            <button id="closeBtn">
              <img
                src="/minus.png"
                width="18px"
                id="closeImg"
                onClick={() => {
                  setOpen(false);
                }}
              />
            </button>
          </div>
        </ModalHeader>
        <div>
          <IconButton
            variant="outlined"
            sx={{
              border: 1,
              borderColor: '#e9e9e9',
              padding: 1.7,
              borderRadius: 4,
              margin: 0.5
            }}
            size="medium"
          >
            <a href={GOOGLE_AUTH_URL}>
              <img src="/google.png" id="google" />
            </a>
          </IconButton>
        </div>
        <div>
          <button onClick={onClickhandler}>내 정보</button>
        </div>
      </GoogleBtnContainer>
    </div>
  );
};
const GoogleBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  #google {
    width: 80px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 15px;
  align-items: center;
  #closeBtn {
    background-color: transparent;
    border-color: transparent;
    cursor: 'pointer';
  }
  #closeBtn:hover {
    cursor: pointer;
  }
`;

export default SignIn;

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie ?? null;
  console.log(cookies);
  return {
    props: { cookies }
  };
}
