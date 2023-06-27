import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Appwrite } from '../appwrite/appwrite_config';

function Login() {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    // const BASE_URL = "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.email.trim() === "" || userData.password.trim() === "") {
            alert("All fields are required")
            return;
        }

        // Appwrite Login
        try {
            await Appwrite.account.createEmailSession(userData.email, userData.password)

            await Appwrite.account.get()
                .then((res) => {
                    navigate('/dashboard');
                })
        } catch (error) {
            alert(error)
            navigate('/');
        }

        // Reset values
        setUserData({
            email: "",
            password: ""
        })
    }

    const handleInput = (e) => {
        setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const toRegister = () => {
        navigate('/register')
    }

    return (
        <div className='mx-auto w-[440px] flex align-center flex-col my-[20px] px-[10px]'>
            <h1 className='text-[40px] text-center mb-[20px]'>Login</h1>
            <form className='flex flex-col gap-[20px] max-w-[400px]' onSubmit={handleSubmit}>
                <input name='email' value={userData.email} onChange={handleInput} className='focus:outline-none p-[6px] border border-[#000] rounded' type='email' placeholder='Enter your email' />
                <input name='password' value={userData.password} onChange={handleInput} className='focus:outline-none p-[6px] border border-[#000] rounded' type='password' placeholder='Enter your password' />
                <button type='submit' className="text-white text-[20px] bg-[#000000] border border-transparent py-1 px-6 focus:outline-none hover:bg-transparent hover:text-black hover:border-black rounded">Login</button>
                <button onClick={toRegister} className="text-[#000] text-[20px] bg-transparent border border-[#000] py-1 px-6 focus:outline-none hover:bg-[#000] hover:text-[#fff] hover:border-transparent rounded">Don't have an account</button>
            </form>
        </div>
    )
}
export default Login
