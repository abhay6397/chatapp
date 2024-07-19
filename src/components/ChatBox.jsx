import { addDoc, collection, getFirestore, serverTimestamp, onSnapshot, } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import LogoutBtn from './LogoutBtn'
import { useSelector } from 'react-redux'
import { IoMdSend } from "react-icons/io";
import VideoCall from './VideoCall';

const ChatBox = () => {
  const user = useSelector(state => state.user[0])
  // console.log(user.accessToken)
  const [msg, setMsg] = useState('')
  const [data, setData] = useState([])
  // const [shortedData, setShortedData] = useState(null)
  const db = getFirestore()


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'Messages'), {
        text: msg,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      })
    } catch (error) {
      console.log(error)
    }
    setMsg('')
  }

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(collection(db, 'Messages'), (snap) => {
        setData(snap.docs.map((val) => {
          const id = val.id
          return { id, ...val.data() }
        }))
      })
      return () => {
        unsubscribe()
      }
    } 
  }, [])
  data.sort((a,b)=>(a.createdAt-b.createdAt))
    
  return (
    <div>
      <div className={`bg-[#F2F5DE]  w-[40vw] h-[75vh] min-w-min flex flex-col justify-center items-center rounded-2xl shadow-xl relative`}>
        <div className=''>
          <VideoCall/>
        </div>
        <ul className={`w-[100%] my-4 mt-6  h-[55vh]   py-4 px-2 overflow-x-auto bg-[url('https://media.istockphoto.com/id/1201667381/vector/customer-support-related-seamless-pattern-and-background-with-line-icons.jpg?s=612x612&w=0&k=20&c=Z1btZZJLEFG-Eg79Ty7sYIzzxLQx1Cp7Pqn4d-JwcH4=')]`}>
          {data&& data.map((val, index) => (
            <li className={`flex ${val.uid === user.uid ? 'justify-end' : 'justify-start'} w-full `} key={index}>
              <div className={`flex ${val.uid === user.uid ? 'flex-row ' : 'flex-row-reverse pl-0 pr-3'} bg-[#93FF96] mt-3 w-max rounded-3xl px-3 py-2 pr-0 items-center justify-center `}>
                <div>
                  <h4 className='text-container'>{val?.text}</h4>
                </div>
                <div>
                  <img className='mx-2 rounded-full' height={30} width={30} src={
                  `${val?.uri? val.uri:'https://banner2.cleanpng.com/20240211/hch/transparent-doraemon-cartoon-pikachu-with-blue-eyes-and-1710881407967.webp'}`} alt="" />
                </div>
                {/* {console.log(val.createdAt.nanoseconds)} */}
              </div>
            </li>
          ))}
        </ul>
        <form className='text-white my-4 pb-4 flex items-center' onSubmit={(e) => handleSubmit(e)}>
          <input className='text-slate-700 w-80 h-8 rounded-full px-3 shadow-lg
    outline-none' type="text" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder='Type a message' />
          <button
            className='ml-2 py-1 px-2 rounded-full shadow-xl hover:scale-105 transition ease-in bg-[#00A562]'
            type='submit'
          >
           <IoMdSend size={20}/>
            
          </button>
        </form>
      </div>
      <LogoutBtn />
    </div>
  )
}

export default ChatBox
