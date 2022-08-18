import _ from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DataGrid, GridActionsCellItem, GridCellEditCommitParams, GridCellParams, GridColDef, GridColumns, GridEditRowsModel, GridEventListener, GridPreProcessEditCellProps, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowParams, GridRowsProp, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridValueGetterParams, MuiEvent } from '@mui/x-data-grid';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, ThemeProvider, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';
import { createTheme } from '@mui/system';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { truncate } from 'fs/promises';


// const useStyles = makeStyles({
//     headerCell: {
//       backgroundColor: '#def2ff',
//       color: 'white',
//       fontWeight: 'bold',
//     },
//     row: {
//       '&:nth-of-type(odd)': {
//         backgroundColor: '#def2ff',
//       },
//       '&:last-child td, &:last-child th': {
//         border: 0,
//       },
//     },
//   });


const theme = createTheme({
    palette: {
        background: {
            paper: '#fff',
        },
        text: {
            primary: '#173A5E',
            secondary: '#46505A',
        },
        action: {
            active: '#001E3C',
        },
        success: {
            dark: '#009688',
        },
        header: {
            primary: 'red',
        },
    },
});

const initUser = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: 'Abc@1234',
    isNew: true,
    isEdited: true,
}

function validateTextInput(name: String, props: GridPreProcessEditCellProps) {
    console.log('props', props);

    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    // console.log(nameRegex.test(String(props.otherFieldsProps.firstName)),
    //             nameRegex.test(String(props.otherFieldsProps.lastName)),            
    //             regex.test(String(props.email).toLowerCase())
    // )
    switch (name) {
        case 'firstName':
            // console.log('firstName',
            //     nameRegex.test(String(props.props.value)),
            //     nameRegex.test(String(props.otherFieldsProps.lastName.value)),
            //     regex.test(String(props.otherFieldsProps.email.value).toLowerCase())
            // )
            return (
                nameRegex.test(String(props.props.value)) &&
                nameRegex.test(String(props.otherFieldsProps.lastName.value)) &&
                regex.test(String(props.otherFieldsProps.email.value).toLowerCase())
            )

        case 'lastName':
            // console.log('lastName',
            //     nameRegex.test(String(props.otherFieldsProps.firstName.value)),
            //     nameRegex.test(String(props.props.value)),
            //     regex.test(String(props.otherFieldsProps.email.value).toLowerCase())
            // );

            return (
                nameRegex.test(String(props.otherFieldsProps.firstName.value)) &&
                nameRegex.test(String(props.props.value)) &&
                regex.test(String(props.otherFieldsProps.email.value).toLowerCase())
            )
        case 'email':
            // console.log('email',
            //     nameRegex.test(String(props.otherFieldsProps.firstName.value)),
            //     nameRegex.test(String(props.otherFieldsProps.lastName.value)),
            //     regex.test(String(props.props.value).toLowerCase())
            // );

            return (
                nameRegex.test(String(props.otherFieldsProps.firstName.value)) &&
                nameRegex.test(String(props.otherFieldsProps.lastName.value)) &&
                regex.test(String(props.props.value).toLowerCase())
            )
        default:
            break;
    }
}

export default function userPage() {
    // useEffect(() => {
    //     document.title = 'User'
    //   },)

    const [users, setUsers, status] = useAppContext()
    const router = useRouter()

    if (status === 'false') {
        // setTimeout(() => router.push('/user/sign-in'), 200)
        // router.push('/user/sign-in')
        console.log('not sign in')
    }

    // const tmpUsers = users.filter((row) => row?.isNew !== true)
    const tmpUsers = _.cloneDeep(users)

    const [openDialog, setOpenDialog] = useState(false)
    const [selectedId, setSelectedId] = useState([])

    let isInValid = false
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
    //     setSelectedId(_.pull(prevState,))
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
        // isInValid = true
    };

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const [editRowsModel, setEditRowsModel] = useState({});

    // const handleEditRowsModelChange = useCallback((model: GridEditRowsModel) => {
    //     const updatedModel = { ...model };
    //     Object.keys(updatedModel).forEach((id) => {
    //         if (updatedModel[id].email) {
    //             const isValid = validateEmail(updatedModel[id].email.value);

    //             console.log('>>>isValid', isValid);

    //             updatedModel[id].email = { ...updatedModel[id].email, error: !isValid };
    //         }
    //     });
    //     setEditRowsModel(model);
    // }, [])

    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [isDisableBtn, setIsDisableBtn] = useState(true)

    const handleAddRow = () => {
        const newId = Date.now()
        initUser.id = _.cloneDeep(newId)
        // setUsers((prevUsersClone) => [_.cloneDeep(initUser), ...prevUsersClone]);
        console.log('new', initUser, 'tmpUsers', tmpUsers);
        
        tmpUsers.push(_.cloneDeep(initUser))
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'firstName' },
        }));
    }

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
        // setUsers(prevState => prevState.map(e => e.id === id ? { ...e, isEdited: true } : e))
        tmpUsers.map(e => e.id === id ? { ...e, isEdited: true } : e)
    };

    const handleSaveClick = (params: GridRowParams) => () => {
        const id = params.id
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        // const tmpState = _.cloneDeep(users)
        console.log('rowId', id, '\nparams', params, '\nrowModel', rowModesModel);

        // isInValid = params.row.map(e => {
        //     return e === ''
        // })
        // tmpState[0].isNew = false
        // setUsers(_.cloneDeep(tmpState))
        isInValid ? setIsDisableBtn(true) : setIsDisableBtn(false)
        tmpUsers.map(e => e.id === id ? { ...e, isNew: false } : e)
        setUsers(tmpUsers)
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setOpenDialog(true);
        // setUsers(users.filter((row) => row.id !== id));
        setSelectedId(prevState => [...prevState, id])
    };

    const handleConfirmDelete = () => {
        tmpUsers.filter((row) => row.id !== selectedId[0])
        setUsers(tmpUsers);
        handleCloseDialog()
    };

    const handleCloseDialog = () => {
        setOpenDialog(false)
        // console.log('openDialog', openDialog);
        setSelectedId([])
    }

    const handleCancelClick = (id: GridRowId) => () => {
        // console.log('users', users);

        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = tmpUsers.find((row) => row.id === id);
        setIsDisableBtn(true)
        if (editedRow?.isNew) {
            tmpUsers.filter((row) => row.id !== id)
            setUsers(tmpUsers);
        }
        else {
            tmpUsers.map(e => e.id === id ? { ...e, isEdited: false } : e)
            setUsers(tmpUsers)
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow };
        // console.log('updateRow', updatedRow);
        tmpUsers.map((row) => (row.id === newRow.id ? updatedRow : row))
        setUsers(tmpUsers);

        return updatedRow;
    };

    const getCellTheme = (params) => {
        console.log('>>>theme', params.row.cellTheme);
        
        return params.row.celTheme
    }

    // const handleDeleteClickTest = (e) => {
    //     console.log('e', e);
    // }

    const cols: GridColumns = [
        { field: 'id', headerName: 'User ID', flex: 1, },
        {
            field: 'firstName', headerName: 'First name', flex: 1, editable: true,
            preProcessEditCellProps(params: GridPreProcessEditCellProps) {
                isInValid = !validateTextInput('firstName', params);
                // console.log('isInValid', isInValid);        //<<<<<<<<<<<<<<<<<<<345
                const id = params.id
                isInValid ? setUsers(prevState => prevState.map(e => e.id === id ? { ...e, isEdited: true } : e))
                    : setUsers(prevState => prevState.map(e => e.id === id ? { ...e, isEdited: false } : e))
                return { ...params.props, error: isInValid };
            },
        },
        {
            field: 'lastName', headerName: 'Last name', flex: 1, editable: true,
            preProcessEditCellProps(params: GridPreProcessEditCellProps) {
                isInValid = !validateTextInput('lastName', params);
                // console.log('isInValid', isInValid);                //<<<<<<<<<<<<<<<<<<<353
                const id = params.id
                isInValid ? setUsers(prevState => prevState.map(e => e.id === id ? { ...e, isEdited: true } : e))
                    : setUsers(prevState => prevState.map(e => e.id === id ? { ...e, isEdited: false } : e))
                return { ...params.props, error: isInValid };
            }
        },
        {
            field: 'email', headerName: 'Email', flex: 1, editable: true,
            preProcessEditCellProps(params: GridPreProcessEditCellProps) {
                // const isValid = params.props.value.length > 0;
                isInValid = !validateTextInput('email', params);
                // console.log('isInValid', isInValid);                    //<<<<<<<<<<<<<<<<<<<362
                const id = params.id
                isInValid ? setUsers(prevState => prevState.map(e => e.id === id ? { ...e, isEdited: true } : e))
                    : setUsers(prevState => prevState.map(e => e.id === id ? { ...e, isEdited: false } : e))

                return { ...params.props, error: isInValid };
            }
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: (params) => {
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
                const id = params.id
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <Tooltip title="Save">
                            <Typography>
                                <GridActionsCellItem
                                    icon={<SaveIcon />}
                                    label="Save"
                                    onClick={handleSaveClick(params)}
                                    color="success"
                                    disabled={params.row.isEdited}
                                />
                            </Typography>
                        </Tooltip>,
                        <Tooltip title="Cancel">
                            <GridActionsCellItem
                                icon={<CancelIcon />}
                                label="Cancel"
                                className="textPrimary"
                                onClick={handleCancelClick(id)}
                                color="warning"
                            />
                        </Tooltip>,
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
                    <Tooltip title="Edit">
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            onClick={handleEditClick(id)}
                            color="primary"
                        />
                    </Tooltip>,
                    <Tooltip title="Delete">
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={handleDeleteClick(id)}
                            color="error"
                        />
                    </Tooltip>,
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
                    {/* <Button color="primary" startIcon={<AddIcon />} onClick={handleAddRow}>
                        New User
                    </Button> */}
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
                    rows={tmpUsers}
                    columns={cols}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    // checkboxSelection
                    editMode="row"
                    editRowsModel={editRowsModel}
                    // onEditRowsModelChange={handleEditRowsModelChange}
                    // onRowEditCommit={handleRowEditCommit}
                    rowModesModel={rowModesModel}
                    // rowModesModel={{ 3: { mode: GridRowModes.Edit } }}
                    onRowEditStart={handleRowEditStart}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}

                    components={{
                        Toolbar: () => {
                            return (<GridToolbarContainer sx={{ justifyContent: 'flex-end' }}>
                                {/* <GridToolbarColumnsButton /> */}
                                <Button startIcon={<AddIcon />} onClick={handleAddRow}>
                                    New User
                                </Button>
                                {/* <GridActionsCellItem
                                    icon={<AddIcon />}
                                    label="New User"
                                    onClick={handleAddRow}
                                    color="inherit"
                                    showInMenu={true}
                                /> */}
                                {/* <GridToolbarExport /> */}
                            </GridToolbarContainer>)
                        }
                    }}
                    componentsProps={{
                        toolbar: { setUsers, setRowModesModel },
                    }}

                    experimentalFeatures={{ newEditingApi: true }}
                    disableSelectionOnClick
                    sx={{
                        '.MuiDataGrid-columnHeaderTitle': {
                            // fontWeight: 'bold',
                            // backgroundColor: '#1976d2',
                            color: 'white',
                        },
                        '.MuiDataGrid-columnSeparator': {
                            display: 'none',
                        },
                        '.MuiDataGrid-columnHeaders': {
                            backgroundColor: '#1976d2',
                            borderRadius: 0,
                        },
                        borderRadius: 0,
                        color: 'info.main',
                        // '& .super-app-theme--cell': {
                        //     backgroundColor: 'rgba(224, 183, 60, 0.55)',
                        //     color: '#1a3e72',
                        //     fontWeight: '100',
                        // },
                        // '& .validInputs': {
                        //     backgroundColor: '#1976d2',
                        //     color: '#1a3e72',
                        //     fontWeight: '600',
                        // },
                        // '& .inValidInputs': {
                        //     backgroundColor: '#d47483',
                        //     color: '#fc0303',
                        //     fontWeight: '800',
                        // },
                    }}
                    // getCellClassName={params => {
                    //     return params.value !== ""? "validInputs" : "inValidInputs"
                    // }}
                />
                <div style={{ width: '600px' }}>
                    {/* usersClone: {usersClone.map(e => <div key={e.id}>{JSON.stringify(e)}</div>)} <br></br> */}
                    users: {JSON.stringify(users)}
                </div>
            </Box>
            <Dialog
                open={openDialog}
            // onClose={handleCloseDialog}
            >
                <DialogTitle>Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>This operation cannot be undone. Are you sure?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleConfirmDelete}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleCloseDialog}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
