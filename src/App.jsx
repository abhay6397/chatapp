import {Routes, Route} from 'react-router-dom'
import LoginPage from "./pages/LoginPage"
import ChatBox from "./components/ChatBox"
import './App.css';
import Otp from './components/Otp';
import VideoCall from './components/VideoCall'

function App() {
  return (
<>
<div className=" bg-slate-700 h-screen flex items-center justify-center ">
  <Routes>
  <Route path="/" element={<LoginPage/>} />
  <Route path="chat-box" element={<ChatBox/>}/>
  <Route path="otp" element={<Otp/>}/>
  <Route path="video" element={<VideoCall/>} />
</Routes>
</div>
</>
  )
}

export default App
