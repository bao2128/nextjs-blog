// import * as React from 'react';
import { userList, useEffect, useContext } from '../components/interface'
import { useState } from 'react';

const AppContext = React.createContext([]);

export function AppWrapper({ children }) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/User')
            const result: userList[] = await res.json()
            setUsers(result)
        }
        fetchData()
    }, [])
    
    let sharedState:userList[] = users
    console.log("data Effect", users);

    return (
        <AppContext.Provider value={sharedState}>           
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}