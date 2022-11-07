// @ts-nocheck
import {useEffect} from 'react';
//mui, css
import home from '../../styles/Home.module.css';
import { getUser } from '../../lib/api/member'
import { userState } from '../../lib/recoil/member'
import { useRecoilState } from 'recoil';
interface Test { }

const MyProfile: Test = () => {
  const [currentUser, setCurrentUser] = useRecoilState(userState)
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
    </div>
  );
};

export default MyProfile