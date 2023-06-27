import React, { useState } from 'react'
import Task from './Task';
import axios from 'axios';
import up from '../assets/buttons/up-arrow.png'
import down from '../assets/buttons/down-arrow.png'

function Todo({ todo, deleteTodo, editTodo, BASE_URL, appwriteId }) {
    const [title, setTitle] = useState(todo.title)
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState([])
    const [menu, setMenu] = useState(false)

    const editTitle = () => {
        const todoElement = document.activeElement.parentElement;
        const inputElement = todoElement.firstChild;
        inputElement.disabled = false;
        inputElement.focus();
        const editBtn = todoElement.children[1];
        const saveBtn = todoElement.children[2];
        editBtn.style.display = 'none'
        saveBtn.style.display = 'block'
    }

    const saveTitle = () => {
        const todoElement = document.activeElement.parentElement;
        const inputElement = todoElement.firstChild;
        if (inputElement.value.trim() === "") {
            alert("Title field cannot be empty")
            inputElement.focus();
            return;
        }
        const editBtn = todoElement.children[1];
        const saveBtn = todoElement.children[2];
        saveBtn.style.display = 'none'
        editBtn.style.display = 'block'
        inputElement.disabled = true;

        editTodo(todo._id, inputElement.value);
    }

    const createTodoTask = async () => {
        if (task.trim() === '') {
            alert("Task field cannot be empty")
            return
        }
        await axios.post(`${BASE_URL}/createTodoTask/${todo._id}`, {
            task: task,
            appwriteId
        })
        setTask('')
        getTodoTasks();
    }

    const getTodoTasks = async () => {
        const res = await axios.get(`${BASE_URL}/getTodoTasks/${appwriteId}&${todo._id}`)
        setTasks(res.data.tasks)
    }

    const deleteTodoTask = async (index) => {
        await axios.put(`${BASE_URL}/deleteTodoTask/${todo._id}`, {
            taskIndex: index,
            appwriteId
        })
        getTodoTasks();
    }

    const editTodoTask = async (index, editedTask) => {
        await axios.put(`${BASE_URL}/editTodoTask/${todo._id}`, {
            taskIndex: index,
            editedTask,
            appwriteId
        })
        getTodoTasks();
    }

    const inputHandler = (e) => {
        if (e.key === "Enter") {
            createTodoTask();
        }
    }

    return (
        <>
            <div className='w-[100%] flex justify-around bg-[#e1e1e1] mt-[10px] py-[5px] rounded'>
                <input value={title} onChange={(e) => setTitle(e.target.value)} disabled className='bg-transparent font-semibold text-[20px] focus:bg-[#fff] focus:outline-none rounded px-[5px]' />
                <button onClick={editTitle} className='text-blue-500 hover:text-blue-700'>Edit</button>
                <button onClick={saveTitle} className='text-blue-500 hover:text-blue-700 hidden'>Save</button>
                <button onClick={() => deleteTodo(todo._id)} className='text-red-500 hover:text-red-800'>Delete</button>
                <span onClick={() => {
                    setMenu(!menu)
                    getTodoTasks();
                }} className='cursor-pointer hover:bg-[#c4c4c4] rounded-[50%] w-[30px] text-center flex items-center justify-center'>
                    {
                        (menu === true) ? (
                            <img className='w-[16px] h-[16px]' src={up} alt='up-img' />
                        ) : (
                            <img className='w-[16px] h-[16px]' src={down} alt='down-img' />
                        )
                    }
                </span>
            </div >
            {
                (menu === true) ? (
                    <div className='border rounded'>
                        {
                            tasks && tasks.map((task, index) => {
                                return <Task key={task} task={task} index={index} deleteTodoTask={deleteTodoTask} editTodoTask={editTodoTask} />
                            })
                        }
                        <div className='flex justify-center gap-[15px] item-center my-[10px]'>
                            <input value={task} onKeyDown={(e) => inputHandler(e)} onChange={(e) => setTask(e.target.value)} type='text' className='border px-[20px] focus:outline-none' placeholder='Create a task' />
                            <button onClick={createTodoTask} className='bg-[#000] text-[#fff] h-[30px] w-[30px] rounded-[50%] border border-transparent hover:border-[#000] hover:text-[#000] hover:bg-[#fff]'>+</button>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default Todo
