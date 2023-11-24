import React from 'react';
import { useEffect, useState } from 'react'
import Top from "./Top"
import Talk from "./Talk"


function App() {
  const [currentView, setCurrentView] = useState('Top');
  const [message,setMessage] = useState();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [users,setUsers] = useState([{user_name: "user", ikon: "/user.jpg"}]);
  const [currentUser,setCurrentUser] = useState();

  function fetchData(){
      // Promise.allで並列に複数の非同期処理を実行
  Promise.all([
    // m_userの取得
    fetch("/api/user")
      .then((response) => {
        if (!response.ok) {
          throw new Error('エラーが発生しました');
        }
        return response.json();
      })
      .then((data) => {
        const newData = [...users, ...data];
        const userlist =newData.filter((elem) =>elem.user_name !=="user");
        setUsers(userlist);
      })
      .catch((error) => console.error(error)),

      // t_historyの取得
    fetch("/api/history")
    .then((response) => {
      if (!response.ok) {
        throw new Error('エラーが発生しました');
      }
      return response.json();
    })
    .then((data) => {
      const newData = [...messages, ...data];
      //Limitで持ってきたhistorryデータを昇順に並び替え
      newData.sort((a,b) => a.id -b.id)
      setMessages(newData);
    })
    .catch((error) => console.error(error))
]).catch((error) => console.error(error)); // Promise.all内でのエラーハンドリング
}
//マウント時にDBからのデータ取得
  useEffect(() => {
    fetchData()
  },[])  

  return (
    <>
      <div>
        {currentView === 'Top' ? (
        <Top 
        setCurrentView={setCurrentView} 
        users={users} 
        currentUser = {currentUser} 
        setCurrentUser = {setCurrentUser}
        />
        ):(
        <Talk 
        setCurrentView={setCurrentView} 
        message={message} 
        input={input} 
        setInput={setInput} 
        messages={messages} 
        setMessages={setMessages} 
        currentUser = {currentUser} 
        />
        )}
      </div>
    </>
  )
}

export default App
