// @ts-nocheck
import {useEffect, useState} from 'react';
//mui, css
import home from '../../styles/Home.module.css';
import { getUser, updateUser, widthdrawUser } from '../../lib/api/member'
import { userState } from '../../lib/recoil/member'
import { useRecoilState } from 'recoil';
interface Test { }

const MyProfile: Test = () => {
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [data, setData] = useState({membername :'', email :'', profileImage :''})
  const [email, setEmail] = useState('');
  const [id, setId] = useState(0);
  const [name, setName] = useState('');

  const updateUserInfo = () => {
    updateUser({membername :'이름수정테스트', email :'2riing2@gmail.com', profileImage :'..'}).then((res) => {
      console.log(res)
    })
  }
  // const deleteUser = () => {
  //   widthdrawUser().then((res) => {console.log(res)})
  // }
  useEffect(() => {
    getUser().then((res)=>{
      console.log(res)
      setCurrentUser(res.data)
      setEmail(res.data.email)
      setId(res.data.providerId)
      setName(res.data.membername)
    })
  },[])
  return (
    <div className={home.homecontainer}>
      <div>MyProfile</div>
      <div>{email}</div>
      <div>{id}</div>
      <div>{name}</div>
      <button onClick={updateUserInfo}>회원정보 수정</button>
    </div>
  );
};

export default MyProfile