import * as React from 'react';
import { userList } from '../components/interface'
import { useState } from 'react';
import _ from 'lodash';

const AppContext = React.createContext([]);     //create shared state

export function AppWrapper({ children }) {
    const [users, setUsers] = useState([])

    React.useEffect(() => {
        (async function fetchData() {
            const res = await fetch('/api/User')
            const result: userList[] = await res.json()
            setUsers(_.cloneDeep(result))
        })();
        // fetchData()
    }, [])
    
    // let sharedState:userList[] = users
    // console.log("sharedState", users);

    return (
        <AppContext.Provider value={[users, setUsers]}>       
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return React.useContext(AppContext);
}