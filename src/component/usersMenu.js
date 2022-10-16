import React, { useState } from 'react';
import './../styles/hamburgerMenu.css';
import { useDispatch, useSelector } from 'react-redux';
import {useRef} from 'react';
import { AddUser } from '../redux/users/usersSlice';
import {changeCurrent, removeUser} from '../redux/users/usersSlice';
import {removeTodo} from './../redux/todos/TodosSlice.js';


function UsersMenu({contents}) {
  const users = useSelector(state => state.users);

  const [toggle, setToggle] = useState(false);
  const [menuState, setMenuState] = useState("hidden none");
  const [hamburgerButton, setHamburgerButton] = useState("hamburgerButton unclicked");

  const userName = useRef('');

  const dispatch = useDispatch();

  const updateMenu = () => {
    if(!toggle){
        setMenuState("visible");
        setHamburgerButton("hamburgerButton clicked");
        setToggle(true);
    }
    else{
      setHamburgerButton("hamburgerButton unclicked");
      setMenuState("hidden menukapanis");
      setTimeout(() => {
        setMenuState("none");
      }, 500)
      setToggle(false);
    }
  }
  
  const AddUserDispatch = () => {
    userName.current.split(" ").join("").length > 0 &&
    dispatch(  
      AddUser(userName.current.split(" ").join(""))
     );
     document.getElementById("addUserInput").value = "";
     userName.current = "";
  }

  const removing = (e,id) => {
    e.stopPropagation();
    if(Object.values(users.users).length > 1 ){
      dispatch(removeUser(id))
      dispatch(removeTodo(id))
    }
  }

  return (
    <>
    <div id="overlay" style={toggle ? {display:'block'} : null}></div>

      <div className={hamburgerButton} onClick={updateMenu}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={"usersMenu " + menuState}>
        
        {contents.map((element, index) => ( 
            <div onClick={() => { dispatch(changeCurrent(element.id)) } } key={index} className={"userName "+ (element.current ? "currentUser" : null)} >

              <div className={"userNameChild "}>
                {element.name} 
              </div>
              
                <div onClick={(e) => removing(e,element.id) }  className={"removeUser"}>
                  <svg viewBox="0 0 448 512" height="18" width="18" stroke="currentColor" fill="currentColor" strokeWidth="0" >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                  </svg>
                </div>

            </div>
        )
        )}

          <label id={"addUserLabel"}>
            <form id={"addUserForm"} onSubmit={(e) => { AddUserDispatch(); e.preventDefault(); }}> 
              <input id={"addUserInput"} placeholder="new user" onChange={(e) => userName.current = e.target.value} />
                <div id={"addUserButton"} onClick={() => AddUserDispatch()}>
                  <svg viewBox="0 0 448 512" ><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>  
                </div>
            </form>
          </label>

      </div>

    </>
  )
}

export default UsersMenu