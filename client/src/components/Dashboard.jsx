import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Appwrite } from '../appwrite/appwrite_config';
import TodoManager from './TodoManager';

export const userId = createContext();

function Dashboard() {
    const [appwriteId, setAppwriteId] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchdata() {
            try {
                await Appwrite.account.get()
                    .then((resp) => {
                        setAppwriteId(resp.$id)
                    })
            } catch (error) {
                console.log(error);
                alert(error)
                navigate('/')
            }
        }
        fetchdata();
    })

    return (
        <>
            {
                appwriteId ? (
                    <userId.Provider value={appwriteId}>
                        <TodoManager />
                    </userId.Provider>

                ) : (
                    <h1>Please wait......</h1>
                )
            }
        </>
    );
}

export default Dashboard;
