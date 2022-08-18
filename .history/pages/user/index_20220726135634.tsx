import _ from 'lodash'
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowModes, GridRowModesModel, GridRowsProp, GridValueGetterParams } from '@mui/x-data-grid';
import Layout from '../../layout/layout'
import { Box, IconButton, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
// import {
//     GridRowsProp,
//     GridRowModesModel,
//     GridRowModes,
//     GridColumns,
//     GridRowParams,
//     MuiEvent,
//     GridToolbarContainer,
//     GridActionsCellItem,
//     GridEventListener,
//     GridRowId,
//     GridRowModel,
// } from '@mui/x-data-grid-pro';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/router';

// interface userList {
//     is: number,
//     firstName: string,
//     lastName: string,
//     email: string,
//     password: string
// }
interface EditToolbarProps {
    setRows: (newRows: (oldRows) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel) => GridRowModesModel,
    ) => void;
}

function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = Date.now();
        setRows((oldRows) => [...oldRows, { id, firstName: '', lastName: '', email: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </Stack>
    );
}

export default function userPage() {
    // useEffect(() => {
    //     document.title = 'User'
    //   },)

    const [users, setUsers, status] = useAppContext()
    const router = useRouter()
    
    // console.log('path', router.pathname)
    const [rowID, setRowID] = useState(-1)

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (params) => () => {
        console.log('edit ID:', params);
        console.log('>>>>>>>>',params.row)
        // setRowID(id)
        // getValue

        // setUsers({ ...users, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowID({ ...users, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setUsers(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowID({
            ...users,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setUsers(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setUsers(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };
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

    const cols: GridColDef[] = [{ field: 'id', headerName: 'ID', flex: 1, editable: true },
        { field: 'firstName', headerName: 'First name', flex: 1, editable: true },
        { field: 'lastName', headerName: 'Last name', flex: 1, editable: true },
        { field: 'email', headerName: 'Email', flex: 1, editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            renderCell: (params) => {
                const id = params.id
                console.log('params', params);
                
                console.log('rowId:', users[id]);
                
                const isInEditMode = false;
                console.log('isInEditMode', isInEditMode);
                
                if (isInEditMode) {
                    return (
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <IconButton aria-label="save" size="small">
                                <EditIcon fontSize="inherit" onClick={handleSaveClick(params)}/>
                            </IconButton>
                            <IconButton aria-label="cancel" size="small">
                                <DeleteIcon fontSize="inherit" onClick={handleCancelClick(params)}/>
                            </IconButton>
                        </Stack>
                        // <GridActionsCellItem
                        //     icon={<SaveIcon />}
                        //     label="Save"
                        //     onClick={handleSaveClick(id)}
                        // />,
                        // <GridActionsCellItem
                        //     icon={<CancelIcon />}
                        //     label="Cancel"
                        //     className="textPrimary"
                        //     onClick={handleCancelClick(id)}
                        //     color="inherit"
                        // />,
                    )
                }
                return (
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton aria-label="edit" size="small">
                            <EditIcon fontSize="inherit" onClick={handleEditClick(params)}/>
                        </IconButton>
                        <IconButton aria-label="delete" size="small">
                            <DeleteIcon fontSize="inherit" onClick={handleDeleteClick(params)}/>
                        </IconButton>

                        {/* <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            className="textPrimary"
                            onClick={handleEditClick(id)}
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={handleDeleteClick(id)}
                            color="inherit"
                        />, */}
                    </Stack>
                )
            },
        },
    ]

    return (
        <>
            <Box sx={{
                height: 405, width: '100%'
            }}>
                <DataGrid
                    rows={rows}
                    columns={cols}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    editMode="row"
                    // rowModesModel={rowModesModel}
                    // onRowEditStart={handleRowEditStart}
                    // onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    components={{
                        Toolbar: EditToolbar,
                    }}
                    // componentsProps={{
                    //     toolbar: { setUsers, setRowModesModel },
                    // }}
                    experimentalFeatures={{ newEditingApi: true }}
                    disableSelectionOnClick
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