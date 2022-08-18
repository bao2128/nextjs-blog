import _ from 'lodash'
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Layout from '../../layout/layout'
import { Box } from '@mui/material';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/router';

// interface userList {
//     is: number,
//     firstName: string,
//     lastName: string,
//     email: string,
//     password: string
// }

export default function userPage() {
    // useEffect(() => {
    //     document.title = 'User'
    //   },)

    const [users, setUsers, status] = useAppContext()
    const router = useRouter()
    const cols: GridColDef[] = []
    // console.log('path', router.pathname)


    // const fetchUsers = async () => {
    //     const response = await fetch('/api/User')
    //     const data = await response.json()
    //     setUsers(data)
    //     // console.clear();
    //     // console.log("data", data);

    // }

    // useEffect(() => {
    //     async function fetchData() {
    //       const res = await fetch('/api/User')
    //       const result: userList[] = await res.json()
    //     //   console.log("data", result);
    //       setUsers(result)
    //     }
    //     fetchData()
    //   }, [])

    const rows = _.cloneDeep(users)
    const [rowSelectedId, setRowSelectedId] = useState()
    // console.log('/users', users);
    // const tmp = rows.find(ele => {
    //     return ele.isSignIn === true
    // })
    // console.log('status', status);

    if (status === 'false') {
        // router.push('/user/sign-in')
        console.log('not sign in')
    }
    
        cols.push({ field: 'id', headerName: 'ID', flex: 1, editable: true },
        { field: 'firstName', headerName: 'First name', flex: 1, editable: true },
        { field: 'lastName', headerName: 'Last name', flex: 1, editable: true },
        { field: 'email', headerName: 'Email', flex: 1, editable: true },
        { field: 'actions', headerName: 'Actions', flex: 1 ,editable: true},)
    
    return (
        <>
            <Box sx={{
                height: 371, width: '100%'
            }}>
                <DataGrid
                    rows={rows}
                    columns={cols}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    editMode="row"
                />
            </Box>
        </>
    )
}

// userPage.getLayout = function getLayout(page) {
//     return (
//         <Layout pageTitle={'User'}>
//             {page}
//         </Layout>
//     )
// }