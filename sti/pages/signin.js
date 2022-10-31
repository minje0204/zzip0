import React from 'react';
import { GOOGLE_AUTH_URL } from '../src/constants';

const SignIn = ({ cookies }) => {
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
    request({ url: 'http://localhost:8080/user/me', method: 'GET' })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      SignIn
      <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
        <img src="./google-logo.png" alt="Google" /> Log in with Google
      </a>
      <br />
      <button onClick={onClickhandler}>myinfo</button>
    </div>
  );
};

export default SignIn;
export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie ?? null;

  return {
    props: { cookies }
  };
}
