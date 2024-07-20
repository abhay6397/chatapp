import {
    LocalUser,
    RemoteUser,
    useIsConnected,
    useJoin,
    useLocalMicrophoneTrack,
    useLocalCameraTrack,
    usePublish,
    useRemoteUsers,
  } from "agora-rtc-react";
  import React, { useState } from "react";
  import { FiVideo } from "react-icons/fi";
import { useSelector } from "react-redux";
  

//   import logo from "./agora-logo.svg";
  


export const VideoCall = () => {
  
    const [calling, setCalling] = useState(false);
    const isConnected = useIsConnected();
    const [appId, setAppId] = useState(""); 
    const [channel, setChannel] = useState(""); 
    const [token, setToken] = useState("");
    // const guser = useSelector(state=>state.user[0])
    // // console.log(guser.displayName)

    const handleClick =()=>{
        setAppId('ebd5c96279cd45c18d948e781a7003dd')
        setChannel('chatapp')
        setToken('007eJxTYDh+riUiXUQmuSzy+PzVhUeDIuJ3Vr2QlZj34I3Df+nM0ycVGFKTUkyTLc2MzC2TU0xMkw0tUixNLFLNLQwTzQ0MjFNS0mpnpzUEMjIwl2xnYWSAQBCfnSE5I7EksaCAgQEA9CIhUw==')
        setCalling(true)
    }
  
    useJoin({appid: appId, channel: channel, token: token ? token : null}, calling);
    //local user
    const [micOn, setMic] = useState(true);
    const [cameraOn, setCamera] = useState(true);
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack } = useLocalCameraTrack(cameraOn);
    usePublish([localMicrophoneTrack, localCameraTrack]);
    //remote users
    const remoteUsers = useRemoteUsers();
  
    return (
      <>
          {isConnected ? (
            <div className="user-list max-w-screen-xl md:flex-row">
              <div className="user min-w-[250px] min-h-[250px] ">
                <LocalUser
                  audioTrack={localMicrophoneTrack}
                  cameraOn={cameraOn}
                  micOn={micOn}
                  videoTrack={localCameraTrack}
                  cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                >
                  <samp className="user-name">You</samp>
                </LocalUser>
              </div>
              {remoteUsers.map((user) => (
                <div className="user min-w-[270px] min-h-[230px]" key={user.uid}>
                  <RemoteUser cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg" user={user}>
                    <samp className="user-name">{user.uid}</samp>
                  </RemoteUser>
                </div>
              ))}
               <div className="control">
            <div className="left-control ">
              <button className="btn" onClick={() => setMic(a => !a)}>
                <i className={`i-microphone ${!micOn ? "off" : ""}`} />
              </button>
              <button className="btn" onClick={() => setCamera(a => !a)}>
                <i className={`i-camera ${!cameraOn ? "off" : ""}`} />
              </button>
            </div>

            <button
              className={`btn btn-phone ${calling ? "btn-phone-active" : ""}`}
              onClick={() => setCalling(a => !a)}
            >
              {calling ? <i className="i-phone-hangup" /> : <i className="i-mdi-phone" />}
            </button>
          </div>
            </div>
          ) : (

  
              <button className="absolute right-7 top-1"
                onClick={()=>handleClick()}
              >
               <FiVideo size={30}/>
              </button>
            
          )}
        
        {/* {isConnected && (
         
        )} */}
      </>
    );

  
}

export default VideoCall

