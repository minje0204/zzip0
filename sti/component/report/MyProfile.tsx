// @ts-nocheck
import {useEffect} from 'react';
//mui, css
import home from '../../styles/Home.module.css';
import { getUser, updateUser, widthdrawUser } from '../../lib/api/member'
import { userState } from '../../lib/recoil/member'
import { useRecoilState } from 'recoil';
interface Test { }

const MyProfile: Test = () => {
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [data, setData] = userState({membername :'', email :'', profileImage :''})
  const []
  useEffect(() => {
    getUser().then((res)=>{
      console.log(res)
      setCurrentUser(res.data)
    })
  },[])
  return (
    <div className={home.homecontainer}>
      MyProfile
      <div>{currentUser.email}</div>
      <div>{currentUser.providerId}</div>
      <div>{currentUser.membername}</div>
      <button>회원정보 수정</button>
    </div>
  );
};

export default MyProfile