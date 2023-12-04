import React from "react";
import { useRef } from "react";
import back from "../public/kkrn_icon_modoru_16.png";
import send from "../public/e-mail-send_icon_1153-300x300.png";
import "./Talk.css";
// import { del } from '../server/knex'

const apiKey = import.meta.env.VITE_API_KEY;
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export default function Talk(props) {
  const {
    setCurrentView,
    message,
    input,
    setInput,
    messages,
    setMessages,
    clickedIndex,
    setClickedIndex,
  } = props;

  //送信inputを空にするため
  const inputRef = useRef();
  //削除、編集の要素を非表示に戻すため
  const contentEl = useRef();

  //kenxへPOST(クエリパラメーター)
  async function postFunc(data) {
    //クエリパラメーターで送るために、url作成
    const queryParams = new URLSearchParams({
      talk: data.talk,
      user_name: data.user_name,
      user_id: data.user_id,
    });
    //fetchで送信
    const response = await fetch(
      `/api?${queryParams}`, //エンドポイントに上で作成したurlをつける
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ヘッダーにContent-Typeを指定（ないとエラー）
        },
        body: JSON.stringify(data),
      } //req.bodyの中身
    );
    try {
      const resData = await response.json();
      console.log("messageです39", messages);
      console.log("POSTresponseです40", resData);
      const { user_id, talk, id } = await resData;

      const currentMessages = [...messages];
      //responseデータ（本当はこのデータをmessagesに入れたかったが、できなかった）
      const resMessage = await {
        talk: data.talk,
        user_name: data.user_name,
        user_id: data.user_id,
        id: id,
      };
    } catch (error) {
      console.log(error);
    }
  }

  const setSendFunc = async (e) => {
    inputRef.current.value = "";
    const postUserMessage = { talk: input, user_name: "user", user_id: 1 };
    const currentMessages = [...messages, postUserMessage];
    await setMessages(currentMessages); //画面表示変更
    await postFunc(postUserMessage); //userメッセージをknexへPOST送信
    //APIに送信
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          apikey: apiKey,
          query: input,
        }),
      });
      const data = await response.json();

      if (data.status === 0) {
        const tolkWord = data.results[0].reply + "だわん";
        const postBotMessage = { talk: tolkWord, user_name: "bot", user_id: 2 };
        await setMessages((messages) => [
          ...messages,
          { talk: tolkWord, user_name: "bot" },
        ]); //画面表示変更
        await postFunc(postBotMessage); //POST送信
      } else {
        setMessages((messages) => [
          ...messages,
          { talk: "エラー発生。確認してください。", user_name: "bot" },
        ]);
      }
    } catch (error) {
      setMessages((messages) => [
        ...messages,
        { talk: "エラー発生。APIサーバーからの応答なし。", user_name: "bot" },
      ]);
    }
    await setInput("");
  };
  //クリックしたらindex番号をセットする
  const onclickFunc = (index) => {
    //2回クリックしたら閉じるようにしたいので、clickedIndexを初期値に戻す
    if (clickedIndex === index) {
      return setClickedIndex(100);
    }
    setClickedIndex(index);
  };

  //削除(パスパラメータ)
  async function deleteFunc(index) {
    const delId = messages[index].id;
    const response = await fetch("/api/" + delId, {
      method: "DELETE",
    });
    try {
      const resData = await response.json();
      const delMessages = await [...messages];
      const result = await delMessages.filter((elem) => elem.id !== delId);
      await setMessages(result);
      //非表示に戻す
      await setClickedIndex(100);
    } catch (error) {
      console.log(error);
    }
  }

  //修正(パスパラメータ)
  async function patchFunc(index) {
    console.log("index,input 120", index, input, messages[index].id);
    try {
      const response = await fetch(`/api/${messages[index].id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // ヘッダーにContent-Typeを指定（ないとエラー）
        },
        body: JSON.stringify({
          talk: input,
        }),
      });

      const resData = await response.json();
      await console.log("responseです141", resData);
      //stateを更新
      const patchMessages = await [...messages];
      patchMessages[index].talk = await input;
      await setMessages(patchMessages);
      //非表示に戻す
      await setClickedIndex(100);
      //inputも元に戻す
      await setInput("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="headter">
        <a
          className="button"
          onClick={() => {
            setCurrentView("Top");
          }}
        >
          <img src={back} width="30" height="30" alt="戻る"></img>
        </a>
      </div>
      <p>{message}</p>
      <br></br>
      <div className="chatbot">
        <ul className="messages">
          {messages.map((message, index) => (
            <li key={index} className={message.user_name}>
              <img
                src={`/${message.user_name}.jpg`}
                alt={`/${message.user_name}Icon`}
              />
              <span onClick={() => onclickFunc(index)}>{message.talk}</span>
              <article
                ref={contentEl}
                style={
                  clickedIndex === index
                    ? { backgroundColor: "yellow" }
                    : { height: "0px", overflow: "hidden" }
                }
              >
                <button onClick={() => deleteFunc(index)}>削除</button>
                <br></br>
                <input
                  placeholder="修正はここで"
                  onChange={(e) => setInput(e.target.value)}
                ></input>
                <button onClick={() => patchFunc(index)}>完了</button>
              </article>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer">
        <input
          className="inputelm"
          ref={inputRef}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <a
          className="button"
          onClick={() => {
            setSendFunc();
          }}
        >
          <img src={send} width="30" height="30" alt="送信"></img>
        </a>
      </div>
    </>
  );
}

// async function postFunc(data){
//   console.log("dataの中身",data)
//   const sendingTalk=data.talk;
//   const sendingUserName=data.user_name;
//   const sendingUserId=data.user_id;
// await fetch("/api/"+sendingTalk+"/"+sendingUserName+"/"+sendingUserId,{
//     method:"POST",
//     // body: data,
//   })
// .then((response) => {
//   console.log("POSTresponseです",response);
// })
// .catch((error) => console.error(error))}
