import React from 'react'
import Login from '../components/Login'
import PhoneLogin from '../components/PhoneLogin'

const LoginPage = () => {
  return (
    <div className='flex items-center justify-center flex-col bg-pink-100 h-1/2 w-1/4 rounded-2xl shadow-lg min-w-96'>
      <Login/>
      {/* <PhoneLogin/> */}
    </div>
  )
}

export default LoginPage
