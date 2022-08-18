import _ from 'lodash'
import { useEffect } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Layout from '../../layout/layout'
import { Box } from '@mui/material';
import {useAppContext} from '../../context/AppContext';
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

    const [users, setUsers] = useAppContext()
    const router = useRouter()
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
    console.log('/users', users);
    const tmp = rows.find(ele => {
        return ele.isSignIn === true
    }).then(e => {return e.isSignIn})
    console.log('tmp', tmp);
    
    if (rows.find(ele => {
        ele.isSignIn !== true
    })) {
        router.push('/pages/user/sign-in')
    }
    const cols: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 10 },
        { field: 'firstName', headerName: 'First name', flex: 1 },
        { field: 'lastName', headerName: 'Last name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },

    ]
    return (
        <>
            {/* <button onClick={fetchUsers}>Load users</button> */}
            <Box sx={{
                height: 371, width: '100%'
            }}>
                <DataGrid
                    rows={rows}
                    columns={cols}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection

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