import React from 'react';
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Top from "./Top"
import Talk from "./Talk"
// require("dotenv").config();


function App() {
  const [currentView, setCurrentView] = useState('Top');
  const [message,setMessage] = useState();
  const [send,setSend] = useState();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [users,setUsers] = useState([{id:0 , user_name:"sample"}]);


  function fetchData(){
    fetch("/api")
    .then(response => {
      if (!response.ok) {
        throw new Error('エラーが発生しました');
      }
      // return response;
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));

    // await fetch("/api/user")
    // .then((response) => response.json())
    // .then((data) => console.log("fetchしました",data))
    // .then((data) => setUsers(data))
  }

  useEffect(() => {
    fetchData()
  },[])

  useEffect(() => {
  },[currentView])

  

  return (
    <>
      <div>
      <ul>
          {users.map((elem) => <li key={elem.id}>{elem.user_name}</li>)}
      </ul>
        {currentView === 'Top' ? (
        <Top 
        setCurrentView={setCurrentView} 
        currentView={currentView} 
        />
        ):(
        <Talk 
        setCurrentView={setCurrentView} 
        currentView={currentView} 
        message={message} 
        setMessage={setMessage}//いらないかも
        setSend={setSend}//いらないかも
        input={input} 
        setInput={setInput} 
        messages={messages} 
        setMessages={setMessages} 
        />
        )}
      </div>
    </>
  )
}

export default App
