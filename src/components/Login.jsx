import React, { useEffect, useState } from 'react'
import {GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup,} from 'firebase/auth'
import { app } from '../fireBase.js'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { add } from './store/userSlice.js';
import LogoutBtn from './LogoutBtn.jsx'


const Login = () => {
    const [user, setUser] = useState(false)
    const auth  = getAuth(app);
    const navigate = useNavigate()
    const dispatch  = useDispatch()

    const handleSignUp = ()=>{
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }
    useEffect(()=>{
      const unsubscribe =  onAuthStateChanged(auth, (data)=>{
          // console.log(data)
          setUser(data)
         if(data){dispatch(add(data))
          navigate('chat-box')
         }
         if(!data) navigate('/')
        })
        return ()=>{
          unsubscribe()
         }
    },[auth,dispatch,navigate])

    
    
  
  return (
    <div className=''>
        <button className='text-slate-800 bg-white py-3 px-8 rounded-lg shadow-md flex items-center justify-center
        hover:scale-105 transition ease-in' onClick={handleSignUp}>
           <img width={30} height={30} 
           src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6WwgH7Nl5_AW9nDCnR2Ozb_AU3rkIbSJdAg&s' alt="img"
            />
           Log in with Google</button>
    </div>

  )
}

export default Login
