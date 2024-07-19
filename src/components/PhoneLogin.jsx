import React, { useState } from 'react'
import { app} from '../fireBase';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Otp from './Otp';

const PhoneLogin = () => {
  const auth  = getAuth(app)
  const [phone, setPhone] = useState('+91');
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate()

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      }
    });
  }

  const handleSend = (event) => {
    event.preventDefault();
    setHasFilled(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      }).catch((error) => {
        // Error; SMS not sent
        console.log(error);
        alert('Please enter a valid number ')
      });
  }
  console.log(otp)
 const verifyOtp = () => {
      console.log('verifyopt', otp)
      
    if (otp.length == 6) {
      // verifu otp
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        // User signed in successfully.
        let user = result.user;
        // console.log(user);
        alert('User signed in successfully');
        navigate('chat-box')
        
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        alert('User couldn\'t sign in (bad verification code?)');
      });
    }
    
  }

  if(!hasFilled){
    return (
      <div className=' px-4 h-1/2 bg-white mt-8 rounded-lg shadow-lg min-w-64'>
        <div>
        <h4 className='font-semibold py-3'>Mobile Number</h4>
          <form className='flex flex-col' onSubmit={handleSend}>
            <input className='outline-none shadow-sm border-solid border-2 border-gray-600 rounded-lg py-1
            hover:scale-105 transition ease-in ' type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} />
            <button className=' my-3 py-2  rounded-lg hover:scale-105 transition ease-in 
            bg-[#2E294E] text-white' type='submit' >
              Send OTP</button>
          </form>
        </div>
        <div id="recaptcha"></div>
      </div>
    ) 
  } else {
    return (
      <div className='app__container'>
        <Otp setOtp={setOtp} verifyOtp={verifyOtp}/>
        <div id="recaptcha"></div>
      </div>
    )
  }
}


export default  PhoneLogin ;
