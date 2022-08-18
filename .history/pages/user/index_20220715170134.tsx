import _ from 'lodash'
import {useState} from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

export default function userPage() {
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        const response = await fetch('/api/users')
        const data = await response.json()
        setUsers(data)
        console.clear();
        console.log("data", data);
        
    }
    const rows = _.cloneDeep(users) 
    const cols: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'firstName', headerName: 'First name', width: 150},
        {field: 'lastName', headerName: 'Last name', width: 150},
        {field: 'age', headerName: 'Age', width: 150},

    ]
    return (
        <>
            <button onClick={fetchUsers}>Load users</button>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={users}
                    columns={cols}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    />
            </div>
        </>
    )
}