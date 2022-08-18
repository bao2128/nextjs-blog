import _ from 'lodash'
import { useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Layout from '../../layout/layout'
import { Box } from '@mui/material';

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
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'firstName', headerName: 'First name', flex: 1 },
        { field: 'lastName', headerName: 'Last name', flex: 1 },
        { field: 'age', headerName: 'Age', flex: 1 },

    ]
    return (
        <>
            <button onClick={fetchUsers}>Load users</button>
            <Box sx={{
                height: 370, width: '100%'
            }}>
                <DataGrid
                    rows={users}
                    columns={cols}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </Box>
        </>
    )
}

userPage.getLayout = function getLayout(page) {
    return (
        <Layout pageTitle={'User'}>
            {page}
        </Layout>
    )
}