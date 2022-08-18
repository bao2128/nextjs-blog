import _ from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DataGrid, GridActionsCellItem, GridCellEditCommitParams, GridColDef, GridColumns, GridEditRowsModel, GridEventListener, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowParams, GridRowsProp, GridValueGetterParams, MuiEvent } from '@mui/x-data-grid';
import Layout from '../../layout/layout'
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack } from '@mui/material';
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
import { users } from '../../.history/context/AppContext_20220725084624';
import handler from '../../.history/pages/api/index_20220715154918';


// interface userList {
//     is: number,
// firstName: string,
// lastName: string,
// email: string,
// password: string
// }

function validateEmail(email) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

export default function userPage() {
    // useEffect(() => {
    //     document.title = 'User'
    //   },)

    const [users, setUsers, status] = useAppContext()
    const router = useRouter()

    if (status === 'false') {
        // router.push('/user/sign-in')
        console.log('not sign in')
    }
    
    // console.log('path', router.pathname)
    // const [rowID, setRowID] = useState<GridRowModel[]>(users)
    // const [isEdit, setIsEdit] = useState(false)
    // const isInEditMode = isEdit
    // console.log('isInEditMode', isInEditMode);
    // const [usersClone, setUsersClone] = useState(_.clone(users))

    // console.log('clone', users)

    // const [openDialog, setOpenDialog] = useState(false)

    // const handleEditRowsStop = (params) => () => {
    //     console.log('stop edit');

    //     usersClone[params.id].isEdit = false;
    // }
    // const [editRow, setEditRow] = useState([])
    // const handleEditRowsStart = (params) => () => {
    //     // setIsEdit(true);

    //     // setEditRow(prevState => [...prevState, params])
    //     console.log('start edit');

    //     params.row.isEdit = true
    //     // console.log('params', params);
    //     // setUsersClone()
    //     // usersClone[params.id].isEdit = true
    //     // usersClone.map(e => {
    //     //     e.id === params.id? params : e
    //     // })
    //     // usersClone[params.id] = _.cloneDeep(params);
    //     usersClone[params.id].isEdit = true;
    // }

    // // const handleEditClick = (id) => () => {
    // //     console.log('edit ID:', id);
    // //     // params.isEditable = true
    // //     // // setRowID(id)
    // //     // // getValue
    // //     const tmp = _.cloneDeep(users)
    // //     tmp[id].mode = GridRowModes.Edit
    // //     console.log('tmp', tmp);

    // //     setUsers(_.cloneDeep(tmp));
    // //     setRowID({ ...users, [id]: { mode: GridRowModes.Edit } });
    // //     console.log(users);

    // // };

    // const handleSaveClick = () => {
    //     // setRowID({ ...users, [id]: { mode: GridRowModes.View } });
    //     // console.log('params', params);
    //     // const tmp = _.cloneDeep(usersClone);
    //     // setUsers(usersClone.map((cloneRow) => users.map(row => {
    //     //     return cloneRow.id === row.id? _.cloneDeep(cloneRow) : [_.cloneDeep(cloneRow), ...users] })));
    //     const tmp = _.cloneDeep(usersClone)
    //     setUsers(_.cloneDeep(tmp))
    // };

    // const handleDeleteClick = (params) => () => {
    //     console.log('params', params);

    //     setUsersClone(usersClone.filter((row) => row.id !== params.id))
    //     // setUsers(users.filter((row) => row.id !== params.id))
    // };

    // const handleCancelClick = () => {

    //     setUsersClone(_.cloneDeep(users))

    //     // setIsEdit(false);
    //     // setUsersClone(users.map((row) => (row.id === id ? row)));
    //     // return users

    //     // const rowId = params.row.id
    //     // params.row.isEdit = false
    //     // console.log('params', params);

    //     // // const oldRow = users.find(
    //     // //     (e) => e.id === rowId
    //     // // );

    //     // usersClone[params.id].isEdit = false;
    //     // console.log("oldRow", usersClone[rowId]);
    //     // usersClone[rowId] = _.cloneDeep(oldRow);

    //     // console.log('<><><>', usersClone);

    // }
    // //     const editedRow = usersClone.find((row) => row.id === id);
    // //     if (editedRow!.isNew) {
    // //         setUsers(usersClone.filter((row) => row.id !== id));
    // //     }
    // // };

    // const handleOpenDialog = () => {
    //     setOpenDialog(true)
    // }

    // const handleCloseDialog = () => {
    //     setOpenDialog(false)
    //     console.log('openDialog', openDialog);
    // }
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

    const handleRowEditStart = (params: GridRowParams, event: MuiEvent<React.SyntheticEvent>) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const [editRowsModel, setEditRowsModel] = useState({});

    const handleEditRowsModelChange = useCallback((model: GridEditRowsModel) => {
        setEditRowsModel(model);
    }, [])

    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    const handleAddRow = () => {
        const newId = Date.now()
        setUsers((prevUsersClone) => [{
            id: newId,
            firstName: '',
            lastName: '',
            email: '',
            password: 'Abc@1234',
            isNew: true,
        }, ...prevUsersClone]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'firstName' },
          }));
    }

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setUsers(users.filter((row) => row.id !== id));
    };
    
    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = users.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setUsers(users.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        // console.log('updateRow', updatedRow);
        setUsers(users.map((row) => (row.id === newRow.id ? updatedRow : row)));

        return updatedRow;
    };

    const cols: GridColumns = [
        { field: 'id', headerName: 'User ID', flex: 1, },
        { field: 'firstName', headerName: 'First name', flex: 1, editable: true },
        { field: 'lastName', headerName: 'Last name', flex: 1, editable: true },
        { field: 'email', headerName: 'Email', flex: 1, editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                // <Stack direction="row" alignItems="center" spacing={1}>
                //     <IconButton aria-label="save" size="small" onClick={handleSaveClick(params)}>
                //         <SaveIcon fontSize="inherit"  />
                //     </IconButton> 
                // <IconButton aria-label="cancel" size="small" onClick={handleCancelClick}>
                //                 <CancelIcon fontSize="inherit" />
                //             </IconButton>
                //         </Stack>
                // const id = params.id
                // console.log('params', params.row.id, params.row.isEdit);
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ]
                }
                return [
                    // <Stack direction="row" alignItems="center" spacing={1}>
                    // <IconButton aria-label="edit" size="small" onClick={handleEditRowsStart(params)}>
                    //     <EditIcon fontSize="inherit"  />
                    // </IconButton>
                    //     <IconButton aria-label="delete" size="small" onClick={() => handleOpenDialog}>
                    //         <DeleteIcon fontSize="inherit" />
                    //     </IconButton>
                    // </Stack>
                    <GridActionsCellItem
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
                    />,

                ]
            },
        },
    ]

    return (
        <>
            <Box sx={{
                height: 405, width: '100%'
            }}>
                <Stack direction="row" alignItems="center" spacing={1} justifyContent="end">
                    <Button color="primary" startIcon={<AddIcon />} onClick={handleAddRow}>
                        New User
                    </Button>
                    {/* <Button color="primary" startIcon={<SaveIcon />} onClick={handleSaveClick}>
                        Save
                    </Button>
                    <Button color="primary" startIcon={<CancelIcon />} onClick={handleCancelClick}>
                        Cancel
                    </Button> */}
                </Stack>
                <DataGrid
                    // onCellEditCommit={handleCommit}
                    autoHeight
                    rows={users}
                    columns={cols}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    // checkboxSelection
                    editMode="row"
                    editRowsModel={editRowsModel}
                    onEditRowsModelChange={handleEditRowsModelChange}
                    // onRowEditCommit={handleRowEditCommit}
                    rowModesModel={rowModesModel}
                    // rowModesModel={{ 3: { mode: GridRowModes.Edit } }}
                    onRowEditStart={handleRowEditStart}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    // components={{
                    //     Toolbar: EditToolbar,
                    // }}
                    // componentsProps={{
                    //     toolbar: { setUsers, setRowModesModel },
                    // }}

                    experimentalFeatures={{ newEditingApi: true }}
                    disableSelectionOnClick
                />
                <div style={{ width: '600px' }}>
                    {/* usersClone: {usersClone.map(e => <div key={e.id}>{JSON.stringify(e)}</div>)} <br></br> */}
                    users: {JSON.stringify(users)}
                </div>
            </Box>
            {/* <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GridActionsCellItem
                        label="Save"
                        showInMenu={true}
                        onClick={handleDeleteClick}
                    />
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleCloseDialog}
                    >
                        No
                    </Button>
                </DialogActions>
            </Dialog> */}
        </>
    )
}
