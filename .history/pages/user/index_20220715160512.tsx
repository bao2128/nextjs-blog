import {useState} from 'react'

export default function userPage() {
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        const response = await fetch('/api/users')
        const data = await response.json()
    }
    return (
        <>
            <button onClick={fetchUsers}>Load user</button>
        </>
    )
}