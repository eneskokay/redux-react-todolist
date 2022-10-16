import React from 'react';
import style from './../styles/app.module.css';
import { useDispatch } from 'react-redux';
import { removeTodoItem, changeStatement, changeContent } from '../redux/todos/TodosSlice';
import { useState, useRef, useEffect } from 'react';


function TodoBox({id, content, todoID, checked}) {
    const [ContentChange, setContentChange] = useState(false);
    const NameContentREF = useRef();
    const [NameContent, SetNameContent] = useState(content);
    const dispatch = useDispatch();
    const removeClick = () => {
        dispatch(removeTodoItem({todoID:todoID, id:Number(id)}))
    }
    
    const changeStateClicke = () => {
        dispatch(changeStatement({todoID:todoID, id:Number(id)}))
    }
    
    const changeContentSubmit = () => {
        dispatch(changeContent({todoID:todoID, id:Number(id), NameContent:NameContent}));
        setContentChange(false);
    }
    
    useEffect(() => {
        ContentChange && NameContentREF.current.focus();
    })

  return (
    <div className={style.todoBox}>

        {!checked ? 
        <>
        {!ContentChange ?

        <span className={style.contentSpan} >{content}</span>
        
        :
            <form className={style.contentInput} onSubmit={(e) => {changeContentSubmit(); e.preventDefault(); } } >
                <input className={"entercontentinput"} ref={NameContentREF}  onChange={(e) => SetNameContent(e.target.value)} value={NameContent} /> 
            </form>
        }

            <div className={style.TodoButtons}>

                <div onClick={() => setContentChange(e => !e)} className={style.button+" ".concat(style.editButton)}>
                    <svg viewBox="0 0 512 512" height="18" width="18" stroke="currentColor" fill="currentColor" strokeWidth="0">
                        <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/> 
                    </svg>
                </div>
                
                <div onClick={() => removeClick()} className={style.button+" ".concat(style.removeButton)} >
                    <svg viewBox="0 0 448 512" height="18" width="18" stroke="currentColor" fill="currentColor" strokeWidth="0" >
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                    </svg>
                </div>
                
                <div onClick={() => changeStateClicke()} className={style.button+" ".concat(style.removeButton)}>
                    <svg  height="28" width="28" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                </div>
    
            </div>
            </>

            :

            <>
            <span><s>{content}</s></span>
            <div className={style.TodoButtons}>
                
                <div onClick={(e) => removeClick(e,id )} className={style.button+" ".concat(style.removeButton)} >
                    <svg viewBox="0 0 448 512" height="18" width="18" stroke="currentColor" fill="currentColor" strokeWidth="0" >
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                    </svg>
                </div>

                <div onClick={ (e) => changeStateClicke(id) } className={style.button+" ".concat(style.removeButton)} >
                    <svg viewBox="0 0 320 512"  height="26" width="26" stroke="currentColor" fill="currentColor" strokeWidth="0">
                        <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
                    </svg>
                </div>

            </div>
            </>
    
        }

    </div>
  )
}


export default TodoBox;
