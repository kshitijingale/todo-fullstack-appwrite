import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Todo from '../components/Todo';
import { useNavigate } from 'react-router-dom';
import { Appwrite } from '../appwrite/appwrite_config';
import { userId } from './Dashboard';

function App() {
    const [todoTitle, setTodoTitle] = useState('')
    const [todos, setTodos] = useState([])
    const [searchText, setSearchText] = useState('')
    const [search, setSearch] = useState(false)
    const navigate = useNavigate();

    const appwriteId = useContext(userId)

    const BASE_URL = "http://localhost:8081";
    axios.defaults.withCredentials = true

    // Fetch all Todos
    const getTodos = async () => {
        await axios.get(`${BASE_URL}/getTodos/${appwriteId}`, {
            withCredentials: true,
        })
            .then((res) => {
                const todosData = res.data.todos;
                // Sorting the todos based on created date
                todosData.sort((a, b) => {
                    const time1 = (a.modifiedDate) ? (new Date(a.modifiedDate)) : (new Date(a.createdDate))
                    const time2 = (b.modifiedDate) ? (new Date(b.modifiedDate)) : (new Date(b.createdDate))
                    return time2 - time1;
                })
                setTodos(todosData);
            })
            .catch((err) => {
                console.log(err);
                alert(err.response.data)
                navigate('/')
            })
    }

    // create Todo
    const handleSubmit = async () => {
        if (todoTitle.trim() === '') {
            alert("Title field cannot be empty")
            return;
        }
        await axios.post(`${BASE_URL}/createTodo`, {
            title: todoTitle,
            appwriteId: appwriteId
        })
        // reset value
        setTodoTitle('')
        getTodos();
    }

    // Delete Todo
    const deleteTodo = async (id) => {
        await axios.delete(`${BASE_URL}/deleteTodo/${id}`, {
            data: {
                appwriteId
            }
        })
        setSearch(false)
        getTodos();
    }

    // Edit Todo
    const editTodo = async (id, title) => {
        await axios.put(`${BASE_URL}/editTodo/${id}`, {
            title: title,
            appwriteId
        })
        setSearch(false)
        getTodos();
    }

    useEffect(() => {
        getTodos();
    }, [])

    const inputHandler = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    // Search Todo
    const handleSearch = async () => {
        if (searchText.trim() === "") {
            alert("Cannot be empty")
            return;
        }

        const res = await axios.post(`${BASE_URL}/api/searchTodos/${searchText}`, {
            appwriteId
        })
        setTodos(res.data.todos);
        setSearch(true);

        // reset value
        setSearchText('')
    }

    // Go back
    const goBack = () => {
        setSearch(!search);
        getTodos();
    }

    // Logout User
    const handleLogout = async () => {
        await Appwrite.account.deleteSession('current').then((res) => {
            alert('Logged out successfully')
            navigate('/')
        }).catch((err) => {
            console.log(err);
            alert(err)
        })
    }

    return (
        <div className='mx-auto w-[440px] flex align-center flex-col my-[20px] px-[10px]'>
            <div className='flex justify-between items-center mb-[20px]'>
                <h1 className='text-[40px] text-center '>🎯 Todo Webapp </h1>
                <button onClick={handleLogout} className='text-white p-[6px] bg-[#000000] border border-transparent focus:outline-none hover:bg-transparent hover:text-black hover:border-black rounded'>Logout</button>
            </div>
            {
                (search) ? (
                    <>
                        <h1 className='text-center text-[24px] font-bold mb-[20px]'>
                            <button onClick={goBack} className='hover:bg-[#f0f0f0] mr-[8px] rounded-[50%] h-[35px] w-[30px]'>←</button>
                            Search results:</h1>
                    </>
                ) : (
                    <>
                        <div className='flex items-center mb-[30px] w-[300px] mx-[auto] justify-between border border-[#000] rounded py-[5px] px-[10px]'>
                            <input className='w-[80%] focus:outline-none' placeholder='Search a todo....' value={searchText} onChange={(e) => setSearchText(e.target.value)} type='text' />
                            <button onClick={handleSearch}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="search"><path d="M11 22C4.935 22 0 17.065 0 11S4.935 0 11 0s11 4.935 11 11-4.935 11-11 11zm0-20c-4.962 0-9 4.037-9 9s4.038 9 9 9 9-4.037 9-9-4.038-9-9-9z"></path><path d="M23 24a.997.997 0 0 1-.707-.293l-4.795-4.795a1 1 0 0 1 1.415-1.414l4.794 4.795A.999.999 0 0 1 23 24z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className='flex justify-evenly mb-[40px]'>
                            <input value={todoTitle} onKeyDown={(e) => inputHandler(e)} onChange={(e) => setTodoTitle(e.target.value)} placeholder='Create a Todo list.....' className='text-[20px] border-[2px] focus:outline-none 
              pl-[8px] rounded' />
                            <button onClick={handleSubmit} className="text-white text-[20px] bg-[#000000] border border-transparent py-1 px-6 focus:outline-none hover:bg-transparent hover:text-black hover:border-black rounded">Create</button>
                        </div>
                    </>
                )
            }

            {
                (todos.length === 0) ? (
                    <h1 className='text-center text-[20px]'>No Todos found !!!</h1>
                ) : (
                    todos && todos.map((todo) => {
                        return <Todo key={todo._id} BASE_URL={BASE_URL} appwriteId={appwriteId} deleteTodo={deleteTodo} editTodo={editTodo} todo={todo} />
                    })
                )
            }
        </div>
    );
}

export default App;
