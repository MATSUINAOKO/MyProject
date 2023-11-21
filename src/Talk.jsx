import React from 'react'
import { useRef } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import back from '../public/kkrn_icon_modoru_16.png'
import send from '../public/e-mail-send_icon_1153-300x300.png'
import './Talk.css'
const apiKey = import.meta.env.VITE_API_KEY;
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export default function Talk(props) {
  const {setCurrentView,currentView,message,setMessage,
    setSend,input, setInput,messages, setMessages,setHistory,history}=props

    const inputRef = useRef();

  const setSendFunc = async (e) => {
    inputRef.current.value = "";
    const postUserMessage = { talk: input, user_name: 'user' }
    const newMessages = [...messages, postUserMessage]

    await setMessages(newMessages);
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          apikey: apiKey,
          query: input
        })
      });
      const data = await response.json();
     
      if (data.status === 0) {
          setMessages(messages => [...messages, { talk: data.results[0].reply, user_name: 'bot' }]);
        } else {
          setMessages(messages => [...messages, { talk: 'エラー発生。確認してください。', user_name: 'bot' }]);
        }
      } catch (error) {
        setMessages(messages => [...messages, { talk: 'エラー発生。APIサーバーからの応答なし。', user_name: 'bot' }]);
      }
      await setInput('');
  }


    return (
    <>
    <div className='headter'>
    <a className='button' onClick={() =>{setCurrentView('Top')}}>
    <img src={back} width="30" height="30" alt="戻る" ></img>
    </a>
    </div>
    <p>{message}</p>
    <br></br>
    <div className="chatbot">
      <ul className="messages">
        {messages.map((message, index) => (
          <li key={index} className={message.user_name}>
            <img src={`/${message.user_name}.jpg`} alt={`/${message.user_name}Icon`} />
            <span>{message.talk}</span>
          </li>
     
        ))}
         </ul>
     </div>
    <div className='footer'>
    <input className='inputelm' ref ={inputRef} onChange = {(e) => setInput(e.target.value)} ></input>
    <a className='button' onClick={()=> {setSendFunc()}}>
    <img  src={send} width="30" height="30" alt="送信" ></img>
    </a>
    </div>
    </>
    );
  }
