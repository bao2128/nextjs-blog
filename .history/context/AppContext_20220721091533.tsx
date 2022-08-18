import * as React from 'react';
import { userList } from '../components/interface'
import useState from 'react-usestateref'
import _ from 'lodash';

const AppContext = React.createContext([]);     //create shared state

export function AppWrapper({ children }) {
    const [users, setUsers, usersRef] = useState([])

    // async function fetchData() {
    //     // const res = await fetch('/api/User')
    //     // const result: userList[] = await res.json()
    //     // return result
    //     fetch('api/User').then(results => results.json()).then(data => {
    //         setUsers(data)
    //     })
    // }

    // const data = fetchData()
    // setUsers(data)
    React.useEffect(() => {    
        fetch('../api/User')
        .then(results => results.json())
        .then(data => {
            setUsers(data)
        })
        console.log('users', usersRef.current)
    }, [])
    
    // let sharedState:userList[] = users
    console.log("sharedState", usersRef.current);

    return (
        <AppContext.Provider value={[users, setUsers]}>       
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return React.useContext(AppContext);
}