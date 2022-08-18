import {useState} from 'react'

export default function userPage() {
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        const response = await fetch('/api/users')
        const data = await response.json()
        setUsers(data)
        console.log("data", data);
        
    }
    return (
        <>
            <button onClick={fetchUsers}>Load user</button>
            {
                users.map(user => {
                    return (
                        <div key={user.id}>
                            {user.id} {user.firstName} {user.lastName} {user.age}
                        </div>
                    )
                })
            }
        </>
    )
}