import _ from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DataGrid, GridCellEditCommitParams, GridColDef, GridEditRowsModel, GridRowModel, GridRowModes, GridRowModesModel, GridRowsProp, GridValueGetterParams } from '@mui/x-data-grid';
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

    console.log('clone', usersClone);

    let openDialog = false
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
            id: Date.now(),
            firstName: '',
            lastName: '',
            email: '',
            password: 'Abc@1234',
        }, ...prevUsersClone]);
    }

    const handleEditRowsStop = (params) => () => {
        console.log('stop edit');

        usersClone[params.id].isEdit = false;
    }
    const [editRow, setEditRow] = useState([])
    const handleEditRowsStart = (params) => () => {
        // setIsEdit(true);

        // setEditRow(prevState => [...prevState, params])
        console.log('start edit');

        params.row.isEdit = true
        // console.log('params', params);
        // setUsersClone()
        // usersClone[params.id].isEdit = true
        // usersClone.map(e => {
        //     e.id === params.id? params : e
        // })
        // usersClone[params.id] = _.cloneDeep(params);
        usersClone[params.id].isEdit = true;
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

    const handleSaveClick = () => {
        // setRowID({ ...users, [id]: { mode: GridRowModes.View } });
        // console.log('params', params);
        // const tmp = _.cloneDeep(usersClone);
        // setUsers(usersClone.map((cloneRow) => users.map(row => {
        //     return cloneRow.id === row.id? _.cloneDeep(cloneRow) : [_.cloneDeep(cloneRow), ...users] })));
        const tmp = _.cloneDeep(usersClone)
        setUsers(_.cloneDeep(tmp))
    };

    const handleDeleteClick = (params) => () => {
        setUsersClone(usersClone.filter((row) => row.id !== params.id))
        // setUsers(users.filter((row) => row.id !== params.id))
    };

    const handleCancelClick = () => {

        setUsersClone(_.cloneDeep(users))

        // setIsEdit(false);
        // setUsersClone(users.map((row) => (row.id === id ? row)));
        // return users

        // const rowId = params.row.id
        // params.row.isEdit = false
        // console.log('params', params);

        // // const oldRow = users.find(
        // //     (e) => e.id === rowId
        // // );

        // usersClone[params.id].isEdit = false;
        // console.log("oldRow", usersClone[rowId]);
        // usersClone[rowId] = _.cloneDeep(oldRow);

        // console.log('<><><>', usersClone);

    }
    //     const editedRow = usersClone.find((row) => row.id === id);
    //     if (editedRow!.isNew) {
    //         setUsers(usersClone.filter((row) => row.id !== id));
    //     }
    // };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow };
        // console.log('updateRow', updatedRow);
        setUsersClone(usersClone.map((row) => (row.id === newRow.id ? updatedRow : row)));

        return updatedRow;
    };

    const handleDoubleClick = (params) => () => {
        console.log('params', params);

    }

    const handleOpenDialog = () => {
        openDialog = true
        console.log('openDialog', openDialog);
        
    }

    const handleCloseDialog = () => {
        openDialog = false
        console.log('openDialog', openDialog);
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
                // console.log('params', params.row.id, params.row.isEdit);

                if (params.row.isEdit) {
                    return (
                        <Stack direction="row" alignItems="center" spacing={1}>
                            {/* //     <IconButton aria-label="save" size="small" onClick={handleSaveClick(params)}>
                    //         <SaveIcon fontSize="inherit"  />
                    //     </IconButton> */}
                            <IconButton aria-label="cancel" size="small" onClick={handleCancelClick}>
                                <CancelIcon fontSize="inherit" />
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
                        {/* <IconButton aria-label="edit" size="small" onClick={handleEditRowsStart(params)}>
                        <EditIcon fontSize="inherit"  />
                    </IconButton> */}
                        <IconButton aria-label="delete" size="small" onClick={handleOpenDialog}>
                            <DeleteIcon fontSize="inherit" />
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
                    <Button color="primary" startIcon={<SaveIcon />} onClick={handleSaveClick}>
                        Save
                    </Button>
                    <Button color="primary" startIcon={<CancelIcon />} onClick={handleCancelClick}>
                        Cancel
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
                    // onRowEditCommit={handleRowEditCommit}
                    onRowEditStop={() => { console.log('stop edit') }}
                    onRowEditStart={() => { console.log('start edit') }}
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
                <div style={{ width: '600px' }}>
                    editRowsModel: {JSON.stringify(editRowsModel)} <br></br>
                    usersClone: {usersClone.map(e => <div key={e.id}>{JSON.stringify(e)}</div>)} <br></br>
                    users: {JSON.stringify(users)}
                </div>
            </Box>
            <Dialog
                open={openDialog}
                // onClose={handleCloseDialog}
            >
                <DialogTitle>Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handleDeleteClick}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleCloseDialog}
                    >
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
