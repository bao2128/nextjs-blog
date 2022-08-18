import _ from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DataGrid, GridCellEditCommitParams, GridColDef, GridEditRowsModel, GridRowModel, GridRowModes, GridRowModesModel, GridRowsProp, GridValueGetterParams } from '@mui/x-data-grid';
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
    // firstName: string,
    // lastName: string,
    // email: string,
    // password: string
// }


export default function userPage() {
    // useEffect(() => {
    //     document.title = 'User'
    //   },)

    const [users, setUsers, status] = useAppContext()
    const router = useRouter()

    // console.log('path', router.pathname)
    const [rowID, setRowID] = useState<GridRowModel[]>(users)
    const [isEdit, setIsEdit] = useState(false)
    const isInEditMode = isEdit
    console.log('isInEditMode', isInEditMode);
    const [usersClone, setUsersClone] = useState(_.clone(users))

    // const handleRowEditStart = (params, event) => {
    //     event.defaultMuiPrevented = true;
    // };

    // const handleRowEditStop = (params, event) => {
    //     event.defaultMuiPrevented = true;
    // };

    const [editRowsModel, setEditRowsModel] = useState({});
    const handleEditRowsModelChange = useCallback((model: GridEditRowsModel) => {
        setEditRowsModel(model);
      },
    [])

    const handleAddRow = () => {
        setUsersClone((prevUsersClone) => [{
            id: null,
            firstName: '',
            lastName: '',
            email: '',
            password: 'Abc@1234',
        }, ...prevUsersClone]);
    }
    
    const handleEditRowsStop = () => {
        setIsEdit(false);
    }

    const handleEditRowsStart = (params) => () => {
        // setIsEdit(true);
        setUsersClone(usersClone.map(e => {
            e.id === params.id? {...e, isEdit: true}: e
        }))
    }

    // const handleEditClick = (id) => () => {
    //     console.log('edit ID:', id);
    //     // params.isEditable = true
    //     // // setRowID(id)
    //     // // getValue
    //     const tmp = _.cloneDeep(users)
    //     tmp[id].mode = GridRowModes.Edit
    //     console.log('tmp', tmp);

    //     setUsers(_.cloneDeep(tmp));
    //     setRowID({ ...users, [id]: { mode: GridRowModes.Edit } });
    //     console.log(users);

    // };

    const handleSaveClick = (params) => () => {
        // setRowID({ ...users, [id]: { mode: GridRowModes.View } });
        console.log('params', params);
        
        setUsersClone(usersClone.map((row) => (row.id === params.row.id ? params : row)));
    };

    const handleDeleteClick = (id) => () => {
        setUsersClone(usersClone.filter((row) => row.id !== id));
    };

    const handleCancelClick = (params) => () => {
        // setIsEdit(false);
        // setUsersClone(users.map((row) => (row.id === id ? row)));
        // return users

        const rowId = params.id
        
        if (usersClone[rowId].id === null) {
            usersClone.splice(rowId, 1);
        } else {
            const oldRow = users.find(
                (e) => e.id === rowId
            );
            console.log("oldRow", oldRow);
            usersClone[rowId] = _.cloneDeep(oldRow);
            usersClone[rowId].isEdit = false;
        }
        
    }
    //     const editedRow = usersClone.find((row) => row.id === id);
    //     if (editedRow!.isNew) {
    //         setUsers(usersClone.filter((row) => row.id !== id));
    //     }
    // };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow };
        console.log('updateRow', updatedRow);
        setUsersClone(usersClone.map((row) => (row.id === newRow.id ? updatedRow : row)));
        
        return updatedRow;
    };

    const handleDoubleClick = (params) => () => {
        usersClone[params.id]
    }

    // const handleCommit = (e: GridCellEditCommitParams) => {
    //     console.log('here');
        
    //     const array = users.map(r => {
    //         if (r.id === e.id) {
    //             return {...r, [e.field]: e.value}
    //         } else {
    //             return {...r}
    //         }
    //     })
    //     setRowID(_.cloneDeep(array))
    //     console.log('array', array[e.id]);
        
    // }
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

    

    if (status === 'false') {
        // router.push('/user/sign-in')
        console.log('not sign in')
    }

    

    const cols: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, },
    { field: 'firstName', headerName: 'First name', flex: 1, editable: true},
    { field: 'lastName', headerName: 'Last name', flex: 1, editable: true},
    { field: 'email', headerName: 'Email', flex: 1, editable: true},
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        renderCell: (params) => {
            const id = params.id

            if (usersClone[id].isEdit) {
                return (
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton aria-label="save" size="small" onClick={handleSaveClick(params)}>
                            <SaveIcon fontSize="inherit"  />
                        </IconButton>
                        <IconButton aria-label="cancel" size="small" onClick={handleCancelClick(params)}>
                            <CancelIcon fontSize="inherit"  />
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
                    <IconButton aria-label="edit" size="small" onClick={handleEditRowsStart(params)}>
                        <EditIcon fontSize="inherit"  />
                    </IconButton>
                    <IconButton aria-label="delete" size="small" onClick={handleDeleteClick(id)}>
                        <DeleteIcon fontSize="inherit"  />
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
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Button color="primary" startIcon={<AddIcon />} onClick={handleAddRow}>
                        Add record
                    </Button>
                </Stack>
                <DataGrid
                    // onCellEditCommit={handleCommit}
                    autoHeight
                    rows={usersClone}
                    columns={cols}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    editMode="row"
                    editRowsModel={editRowsModel}
                    onEditRowsModelChange={handleEditRowsModelChange}
                    onRowEditStop={handleEditRowsStop}
                    onRowEditStart={handleEditRowsStart}
                    // rowModesModel={rowModesModel}
                    // rowModesModel={{ 3: { mode: GridRowModes.Edit } }}
                    // onRowEditStart={handleRowEditStart}
                    // onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    onRowDoubleClick={handleDoubleClick}
                    // components={{
                    //     Toolbar: EditToolbar,
                    // }}
                    // componentsProps={{
                    //     toolbar: { setUsers, setRowModesModel },
                    // }}
                    
                    experimentalFeatures={{ newEditingApi: true }}
                    disableSelectionOnClick
                />
                <div style={{width: '600px'}}>
                    editRowsModel: {JSON.stringify(editRowsModel)} <br></br>
                    usersClone: {usersClone.map(e => <div>{JSON.stringify(e)}</div>)} <br></br>
                    users: {JSON.stringify(users)}
                </div>
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