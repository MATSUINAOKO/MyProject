import React from 'react'
import './index.css'
import './Top.css'


export default function Top(props) {
    const {setCurrentView,users}=props

    return (
    <>
    <body>
    <div>
    <article className='card'>
        {users.map((user) => (
        <ul className="cardContainer" key={user.id} onClick={() => setCurrentView("Tolk")}>
        <img className= "card-img" src={user.ikon} alt={"botIcon"} />
        <a>{user.user_name}</a>
        </ul>
        ))}
    </article>
    </div>
    </body>
    </>
    );
  }

  