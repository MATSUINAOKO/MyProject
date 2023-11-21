import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import bot from '../public/india19-26756.jpg'
// import reactLogo from './assets/react.svg'
import './Top.css'


export default function Top(props) {
    const {setCurrentView,currentView}=props

    return (
    <>
    <body>
    <div>
    <article className='card'>
    <ul className="cardContainer" onClick={() =>{setCurrentView("Tolk")}}>
        <img className= "card-img" src={bot} alt={"botIcon"} />
        <a>Aさん</a>

    </ul>
    <ul className="cardContainer" onClick={() =>{setCurrentView("Tolk")}}>
        <img img className= "card-img" src={bot} alt={"botIcon"} />
        <a>Bさん</a>

    </ul>
    </article>
    </div>
    </body>
    </>
    );
  }

  