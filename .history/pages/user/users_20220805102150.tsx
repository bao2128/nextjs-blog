import _ from 'lodash'
import { useState } from 'react'
import {DataGrid,
        GridActionsCellItem,
        GridColumns,
        GridEventListener, 
        GridPreProcessEditCellProps, 
        GridRowId,  
        GridRowModes, 
        GridRowModesModel, 
        GridRowParams,  
        GridToolbarContainer, 
        MuiEvent } from '@mui/x-data-grid'
import {Box, 
        Dialog, 
        DialogActions, 
        DialogContent, 
        DialogContentText, 
        DialogTitle, 
        Tooltip, 
        useTheme} from '@mui/material'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import { useAppContext } from '../../context/AppContext'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'

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
//   })

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
    const regex = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const nameRegex = /^[a-zA-Z]+([',. -]*[a-zA-Z0-9])*$/
    switch (name) {
        case 'firstName':
            return (
                nameRegex.test(String(props.props.value)) &&
                nameRegex.test(String(props.otherFieldsProps.lastName.value)) &&
                regex.test(String(props.otherFieldsProps.email.value))
            )

        case 'lastName':
            return (
                nameRegex.test(String(props.otherFieldsProps.firstName.value)) &&
                nameRegex.test(String(props.props.value)) &&
                regex.test(String(props.otherFieldsProps.email.value))
            )
        case 'email':
            return (
                nameRegex.test(String(props.otherFieldsProps.firstName.value)) &&
                nameRegex.test(String(props.otherFieldsProps.lastName.value)) &&
                regex.test(String(props.props.value))
            )
        default:
            break
    }
}

export default function userPage() {
    const [users, setUsers, status] = useAppContext()
    const router = useRouter()

    if (status === 'false') {
        console.log(status,'not sign in')
        // router.push('/user/sign-in')
    }

    const [openDialog, setOpenDialog] = useState(false)
    const [selectedId, setSelectedId] = useState([])

    let isInValid = false

    const myTheme  = useTheme()
    
    const handleRowEditStart = (params: GridRowParams, event: MuiEvent<React.SyntheticEvent>) => {
        event.defaultMuiPrevented = true
    }

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        event.defaultMuiPrevented = true
    }

    const [editRowsModel, setEditRowsModel] = useState({})

    // const handleEditRowsModelChange = useCallback((model: GridEditRowsModel) => {
    //     const updatedModel = { ...model }
    //     Object.keys(updatedModel).forEach((id) => {
    //         if (updatedModel[id].email) {
    //             const isValid = validateEmail(updatedModel[id].email.value)

    //             console.log('>>>isValid', isValid)

    //             updatedModel[id].email = { ...updatedModel[id].email, error: !isValid }
    //         }
    //     })
    //     setEditRowsModel(model)
    // }, [])

    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
    const [isDisableBtn, setIsDisableBtn] = useState(true)

    const handleAddRow = () => {
        const newId = Date.now()
        initUser.id = _.cloneDeep(newId)
        setUsers((prevUsersClone) => [_.cloneDeep(initUser), ...prevUsersClone])
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'firstName' },
        }))
    }

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
        setUsers(prevState => prevState.map(e => e.id === id ? { ...e, isEdited: true } : e))
    }

    const handleSaveClick = (params: GridRowParams) => () => {
        const id = params.id
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
        isInValid ? setIsDisableBtn(true) : setIsDisableBtn(false)
        setUsers(prevState => prevState.map(e => e.id === id ? { ...e, isNew: false } : e))
    }

    const handleDeleteClick = (id: GridRowId) => () => {
        setOpenDialog(true)
        setSelectedId(prevState => [...prevState, id])
    }

    const handleConfirmDelete = () => {
        setUsers(users.filter((row) => row.id !== selectedId[0]))
        handleCloseDialog()
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
        setSelectedId([])
    }

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        })

        const editedRow = users.find((row) => row.id === id)
        setIsDisableBtn(true)
        if (editedRow?.isNew) {
            setUsers(users.filter((row) => row.id !== id))
        }
        else {
            setUsers(prevState => prevState.map(e => e.id === id ? { ...e, isEdited: false } : e))
        }
    }

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow }
        setUsers(users.map((row) => (row.id === newRow.id ? updatedRow : row)))

        return updatedRow
    }

    const cols: GridColumns = [
        { field: 'id', headerName: 'User ID', flex: 1, },
        {
            field: 'firstName', headerName: 'First name', flex: 1, editable: true,
            preProcessEditCellProps(params: GridPreProcessEditCellProps) {
                isInValid = !validateTextInput('firstName', params)
                const id = params.id
                isInValid ? setUsers(prevState => prevState.map(e => e.id === id ? { ...e, isEdited: true } : e))
                    : setUsers(prevState => prevState.map(e => e.id === id ? { ...e, isEdited: false } : e))
                return { ...params.props, error: isInValid }
            },
        },
        {
            field: 'lastName', headerName: 'Last name', flex: 1, editable: true,
            preProcessEditCellProps(params: GridPreProcessEditCellProps) {
                isInValid = !validateTextInput('lastName', params)
                const id = params.id
                isInValid ? setUsers(prevState => prevState.map(e => e.id === id ? { ...e, isEdited: true } : e))
                    : setUsers(prevState => prevState.map(e => e.id === id ? { ...e, isEdited: false } : e))
                return { ...params.props, error: isInValid }
            }
        },
        {
            field: 'email', headerName: 'Email', flex: 1, editable: true,
            preProcessEditCellProps(params: GridPreProcessEditCellProps) {
                isInValid = !validateTextInput('email', params)
                const id = params.id
                isInValid ? setUsers(prevState => prevState.map(e => e.id === id ? { ...e, isEdited: true } : e))
                    : setUsers(prevState => prevState.map(e => e.id === id ? { ...e, isEdited: false } : e))
                return { ...params.props, error: isInValid }
            }
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: (params) => {
                const id = params.id
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit
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
                else if (!params.row?.isSignIn) {
                    return [
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
                }
                return []
            },
        },
    ]

    return (
        <>{
            status? (
                <Typography>
                    Loading...
                </Typography>
            ) : (
                <>
                    <Box sx={{
                        height: 'auto', width: '100%'
                    }}>
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
                                        <Button 
                                            startIcon={<PersonAddOutlinedIcon />} 
                                            onClick={handleAddRow} 
                                            sx={{textTransform: 'uppercase'}}
                                        >
                                            New User
                                        </Button>
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
                                    backgroundColor: myTheme.palette.info.main,
                                    borderRadius: myTheme.shape.borderRadius,
                                },
                                borderRadius: myTheme.shape.borderRadius,
                                color: 'info.main',
                            }}
                        />
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
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )
        }</>
    )
}
