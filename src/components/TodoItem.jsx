import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoItem( {todo} ) {
  const {updateTodo, deleteTodo, toggleComplete} = useTodo()
  const [todoMsg, setTodoMsg] = useState(todo.todo)
  const [isTodoEditable, setIsTodoEditable] = useState(false)

  const editTodo = () => {
    updateTodo(todo.id, {...todo, todo: todoMsg})
    setIsTodoEditable(false)
  }

  const toggleCompleted = () => {
    toggleComplete(todo.id)
  }

  return (
    <div className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-yellow ${todo.completed ? "bg-[green]" : "bg-[red]" }`} >
        <input type="checkbox"
             className='cursor-pointer'
             checked={todo.completed}
             onChange={toggleCompleted}
        />
        <input 
            type = "text"
            className = {`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"} ${todo.completed ? "line-through" : ""}`}
            value = {todoMsg}
            onChange = {(e) => setTodoMsg(e.target.value)}
            readOnly = {!isTodoEditable}
        />

        <button
          className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 diabled:opacity-50'
          onClick = {() => {
            if (todo.completed) return;
            if(isTodoEditable) {
              editTodo();
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled = {todo.completed}
        >
          {isTodoEditable ? "📁" : "✏️"}
        </button>

        <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              onClick={() => deleteTodo(todo.id)}
          >
              ❌
          </button>

    </div>
  )
}

export default TodoItem