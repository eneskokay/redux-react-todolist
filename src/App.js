import style from './styles/app.module.css';
import TodoBox from './component/todoBox';
import UsersMenu from './component/usersMenu';
import {AddTodo} from './redux/todos/TodosSlice';
import { useDispatch, useSelector } from 'react-redux';
import {useRef} from 'react';

function App() {
  const dispatch = useDispatch();
  const TodoINPUT  = useRef('');
  const todosFromStorage = useSelector(state => state.todos); 
  const users = useSelector(state => state.users); 
  let currentID = Object.values(users.users).find((element) => element.current === true).id; 
  const todos = todosFromStorage.Todos[currentID] || {} 

  const AddTodoDispatch = () => {
    TodoINPUT.current.trim().length > 0 && dispatch(AddTodo({input:TodoINPUT.current.trim(), userID:currentID, }));   
    document.querySelector('.entertodoinput').value = "";   
    TodoINPUT.current = "";   
  }

  return (
    
    <div className={style.App}>

      <div id={style.TodoListContainer} >
    
      <h1 id={style.header}>Todo List</h1>

          <label id={style.TodoFormLabel}>
            <form id={style.TodoForm} onSubmit={(e) => {AddTodoDispatch(); e.preventDefault();} } >
              <input id={style.EnterTodo} className="entertodoinput" placeholder="Enter a Todo" onChange={(e) => TodoINPUT.current = e.target.value} />
                <div id={style.addTodo} onClick={() => AddTodoDispatch()}>
                  <svg viewBox="0 0 448 512" >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                  </svg>
                </div>
            </form>
          </label>


          <div id={style.todoContainer}>
            <div id={style.todos}>
                <h2>Todos</h2>

                {Object.entries(todos).map((element) => ( 
                  <TodoBox key={element[0]} todoID={currentID} checked={element[1].checked} id={element[0]} content={element[1].name} />   
                 ))}

            </div>
          </div>
          
      </div>

      <UsersMenu contents={Object.values(users.users)} />

    </div>

  );
}



export default App;