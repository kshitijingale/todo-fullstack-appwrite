import React, { useState } from 'react'
import trashIcon from '../assets/buttons/trash.png'
import editIcon from '../assets/buttons/edit.png'

function Task({ task, index, deleteTodoTask, editTodoTask }) {
    const [taskTitle, setTaskTitle] = useState(task)

    const editTaskTitle = () => {
        const taskElement = document.activeElement.parentElement;
        const inputElement = taskElement.children[1];
        inputElement.disabled = false;
        inputElement.focus();
        const editBtn = taskElement.children[2];
        const saveBtn = taskElement.children[3];
        editBtn.style.display = 'none'
        saveBtn.style.display = 'block'
    }

    const saveTask = () => {
        const taskElement = document.activeElement.parentElement;
        const inputElement = taskElement.children[1];
        if (inputElement.value.trim() === "") {
            alert("Task field cannot be empty")
            inputElement.focus();
            return;
        }
        const editBtn = taskElement.children[2];
        const saveBtn = taskElement.children[3];
        saveBtn.style.display = 'none'
        editBtn.style.display = 'block'
        inputElement.disabled = true;

        editTodoTask(index, inputElement.value);
    }

    const taskCompleted = () => {
        const taskElement = document.activeElement.parentElement;
        const inputElement = taskElement.children[1];
        inputElement.classList.add('line-through')
        setTimeout(() => {
            deleteTodoTask(index)
        }, 200)
    }

    return (
        <div className='border-b flex item-center p-[5px] justify-center'>
            <input className='w-[16px]' type='checkbox' onClick={() => taskCompleted()} />
            <input onChange={(e) => setTaskTitle(e.target.value)} className='w-[60%] mx-[20px] bg-transparent text-[20px] px-[5px]' type='text' value={taskTitle} disabled />
            <button onClick={editTaskTitle}>
                <img className='h-[32px] ml-[10px]' src={editIcon} alt='edit-img' />
            </button>
            <button onClick={saveTask} className='text-green-500 font-bold w-[32px] hidden ml-[10px]'>Save</button>
            <button onClick={() => deleteTodoTask(index)}>
                <img className='h-[32px] ml-[10px]' src={trashIcon} alt='del-img' />
            </button>
        </div>
    )
}

export default Task
