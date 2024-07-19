import React, { useEffect, useState } from 'react'
import { app } from '../fireBase'
import {getAuth, signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


const LogoutBtn = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [isLongin, setIsLogin] = useState(true)
     useEffect(()=>{
      signOut(auth)
     },[isLongin])

    const handleSignout = () => {
      signOut(auth)
      navigate('/')
      setIsLogin(false)
    }
  return (
    <div className='my-3'>
       <button 
       className='text-white hover:bg-red-600 bg-blue-400 py-3 px-8 
       rounded-2xl shadow-lg transition ease-in' 
       onClick={handleSignout}
       >
        Logout</button>
    </div>
  )
}

export default LogoutBtn
