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
  const [users,setUsers] = useState([{user_name: "bot", ikon: "/bot.jpg"}]);
  const [history,setHistory] = useState([{user_id: 1, talk: "sampleです", up_photo: "/user_sample.jpg"}]);
  const [currentUser,setCurrentUser] = useState();

  function fetchData(){
      // Promise.allで並列に複数の非同期処理を実行
  Promise.all([
    // m_userの取得
    fetch("/api/user")
      .then((response) => {
        console.log("/userです");
        if (!response.ok) {
          throw new Error('エラーが発生しました');
        }
        return response.json();
      })
      .then((data) => {
        console.log("fetchしました", data);
        const newData = [...users, ...data];
        const userlist =newData.filter((elem) =>elem.user_name !=="user");
        setUsers(userlist);
        console.log(newData);
      })
      .catch((error) => console.error(error)),

      // t_historyの取得
    fetch("/api/history")
    .then((response) => {
      console.log("/historyです");
      if (!response.ok) {
        throw new Error('エラーが発生しました');
      }
      return response.json();
    })
    .then((data) => {
      const newData = [...messages, ...data];
      setMessages(newData);
      console.log("historyもfetchしました", data);
    })
    .catch((error) => console.error(error))
]).catch((error) => console.error(error)); // Promise.all内でのエラーハンドリング
}
//マウント時にDBからのデータ取得
  useEffect(() => {
    fetchData()
    console.log("マウントが切り替わりました")
  },[])  

  return (
    <>
      <div>
        {currentView === 'Top' ? (
        <Top 
        setCurrentView={setCurrentView} 
        currentView={currentView} 
        setUsers ={setUsers} 
        users={users} 
        currentUser = {currentUser} 
        setCurrentUser = {setCurrentUser}
        />
        ):(
        <Talk 
        setCurrentView={setCurrentView} 
        currentView={currentView} 
        message={message} 
        setMessage={setMessage} //いらないかも
        setSend={setSend} //いらないかも
        input={input} 
        setInput={setInput} 
        messages={messages} 
        setMessages={setMessages} 
        setHistory ={setHistory} //いらないかも
        history ={history} //いらないかも
        currentUser = {currentUser} 
        />
        )}
      </div>
    </>
  )
}

export default App
