import { useState } from 'react'

export default function userPage() {
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        const response = await fetch('/api/users')
        const data = await response.json()
        setUsers(data)
    }
    return (
        <>
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