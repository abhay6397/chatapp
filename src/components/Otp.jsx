import React, { useEffect, useRef, useState } from 'react'


const Otp = ({setOtp, verifyOtp}) => {
  const refs = [useRef(), useRef(), useRef(), useRef(),  useRef(),  useRef(),]
  const emptyArry = ['', '', '', '', '','']
  const [inputs, setInputs] = useState(emptyArry)
  const [missing, setMissing]= useState(emptyArry)
  const [submitted, setSubmitted] = useState('');

//  setOtp('123456')
  useEffect(() => {
    if (submitted) {
      setOtp(submitted);
      verifyOtp();
      setSubmitted('');
    }
  }, [submitted])

  const handleSubmit = ()=>{
    const missed = inputs.map((val, index)=>{
      if(val === ""){
        return index
      }
      return undefined
    }).filter((val)=> val!==undefined)
    setMissing(missed)

    if(missed.length) return;
    const userInputs = inputs.join('')
    setOtp(userInputs)
    setSubmitted(userInputs)

    // console.log('submited', userInputs)

  }

  const handlechange = (e, i) => {
    const val = e.target.value;
    // console.log(i, val)
    // console.log(!Number(val))
    if (!Number(val) && val !=='0')
      return;
    // console.log(val)
    if (i < inputs.length - 1) { //0<5
      refs[i + 1].current.focus()
    }
    const copyInputs = [...inputs]
    copyInputs[i] = val
    // console.log(copyInputs)
    setInputs(copyInputs)
  }

  const handleKeyDown =(e, index)=>{
  //  console.log(e.keyCode, index)
   if(e.keyCode === 8 ){
    const copyInputs = [...inputs]
    copyInputs[index]=''
    setInputs(copyInputs) 
    
    if(index>0){
      refs[index-1].current.focus()
    }
   }
  }

  const handlePaste = (e) =>{
   const data  = e.clipboardData.getData('text');
  //  console.log(data)

   if(!Number(data) || data.length>inputs.length) return;

   const pasteCode = data.split('');
   
   setInputs(pasteCode)
   refs[inputs.length-1].current.focus();
  }

  useEffect(() => {
    refs[0].current.focus();
  }, [])
  return (
    <div className='bg-white h-40 w-72 rounded-lg flex flex-col items-center justify-center mt-4 shadow-xl'>
      <h3 className='text-left w-full my-2 px-3'>Enter the OTP</h3>
      <div className='w-full flex  justify-evenly'>
        {emptyArry.map((val, i) => {
          return <input type="text"
            ref={refs[i]}
            key={i}
            value={inputs[i]}
            maxLength='1'
            className={`border-gray-600 border border-solid w-10 h-10 rounded-md py-3 px-3 shadow-md
                         focus:outline-blue-600 ${missing.includes(i)?'outline-red-500 outline-1 outline':''}`}
            onChange={(e) => (handlechange(e, i))}
            onKeyDown={(e) => { handleKeyDown(e, i) }}
            onPaste={handlePaste}
          />
        })}
      </div>
      <button onClick={handleSubmit} className='text-white bg-[#2E294E] py-2 px-5 my-4 rounded-lg hover:scale-105 transition ease-in 
      '>Verify</button>
    </div>
  )
}

export default Otp
