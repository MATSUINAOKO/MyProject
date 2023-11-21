import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import back from '../public/kkrn_icon_modoru_16.png'
import send from '../public/e-mail-send_icon_1153-300x300.png'
import './Talk.css'
const apiKey = import.meta.env.VITE_API_KEY;
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;


export default function Talk(props) {
  const {setCurrentView,currentView,message,setMessage,
    setSend,input, setInput,messages, setMessages}=props


  const setSendFunc = async (e) => {
    // e.preventDefault();
    const newMessages = [...messages, { text: input, sender: 'user' }]
    await setMessages(newMessages);
    await setInput('');

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
          setMessages(messages => [...messages, { text: data.results[0].reply, sender: 'bot' }]);
        } else {
          setMessages(messages => [...messages, { text: 'エラー発生。確認してください。', sender: 'bot' }]);
        }
      } catch (error) {
        setMessages(messages => [...messages, { text: 'エラー発生。APIサーバーからの応答なし。', sender: 'bot' }]);
      }
    //     const botMessages =  [...messages, { text: data.results[0].reply, sender: 'bot' }]
    //     setMessages(botMessages);
    
    //   } else {
    //     const errorMessages = [...messages, {  text: 'エラー発生。確認してください。', sender: 'bot' }]
    //     setMessages(errorMessages);
    //   }
    // } catch (error) {
    //   const errorAPI =  [...messages, {  text: 'エラー発生。APIサーバーからの応答なし。', sender: 'bot' }]
    //   setMessages(messages => [...messages, { text: 'エラー発生。APIサーバーからの応答なし。', sender: 'bot' }]);
    // }
  }


    return (
    <>
    <div className='headter'>
    <a className='button' onClick={() =>{setCurrentView("Top")}}>
    <img src={back} width="30" height="30" alt="戻る" ></img>
    </a>
    </div>
    <p>{message}</p>
    <br></br>
    <div className="chatbot">
      <ul className="messages">
        {messages.map((message, index) => (
          <li key={index} className={message.sender}>
            <img src={`/${message.sender}.jpg`} alt={`/${message.sender}Icon`} />
            <span>{message.text}</span>
          </li>
     
        ))}
         </ul>
     </div>
    <div className='footer'>
    <input className='inputelm' onChange = {(e) => setInput(e.target.value)} ></input>
    <a className='button' onClick={()=> {setSendFunc()}}>
    <img  src={send} width="30" height="30" alt="送信" ></img>
    </a>
    </div>
    </>
    );
  }

  // Talk.defaultProps = {
  //   messages: [],
  // };
  