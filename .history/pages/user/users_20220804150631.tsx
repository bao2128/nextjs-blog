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
        Stack, 
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
import { createTheme } from '@mui/system'
import Typography from '@mui/material/Typography'


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
})

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
    console.log('props', props)

    const regex = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const nameRegex = /^[a-zA-Z]+([',. -]*[a-zA-Z0-9])*$/
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
            // )

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
            // )

            return (
                nameRegex.test(String(props.otherFieldsProps.firstName.value)) &&
                nameRegex.test(String(props.otherFieldsProps.lastName.value)) &&
                regex.test(String(props.props.value).toLowerCase())
            )
        default:
            break
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
    // setUsers(_.cloneDeep(tmpUsers))

    const [openDialog, setOpenDialog] = useState(false)
    const [selectedId, setSelectedId] = useState([])

    let isInValid = false

    const myTheme  = useTheme()
    
    const handleRowEditStart = (params: GridRowParams, event: MuiEvent<React.SyntheticEvent>) => {
        event.defaultMuiPrevented = true
        // isInValid = true
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
        // const tmpState = _.cloneDeep(users)
        console.log('rowId', id, '\nparams', params, '\nrowModel', rowModesModel)

        // isInValid = params.row.map(e => {
        //     return e === ''
        // })
        // tmpState[0].isNew = false
        // setUsers(_.cloneDeep(tmpState))
        isInValid ? setIsDisableBtn(true) : setIsDisableBtn(false)
        setUsers(prevState => prevState.map(e => e.id === id ? { ...e, isNew: false } : e))
    }

    const handleDeleteClick = (id: GridRowId) => () => {
        setOpenDialog(true)
        // setUsers(users.filter((row) => row.id !== id))
        setSelectedId(prevState => [...prevState, id])
    }

    const handleConfirmDelete = () => {
        setUsers(users.filter((row) => row.id !== selectedId[0]))
        handleCloseDialog()
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
        // console.log('openDialog', openDialog)
        setSelectedId([])
    }

    const handleCancelClick = (id: GridRowId) => () => {
        // console.log('users', users)

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
        // console.log('updateRow', updatedRow)
        setUsers(users.map((row) => (row.id === newRow.id ? updatedRow : row)))

        return updatedRow
    }

    const getCellTheme = (params) => {
        console.log('>>>theme', params.row.cellTheme)
        
        return params.row.celTheme
    }

    // const handleDeleteClickTest = (e) => {
    //     console.log('e', e)
    // }

    const cols: GridColumns = [
        { field: 'id', headerName: 'User ID', flex: 1, },
        {
            field: 'firstName', headerName: 'First name', flex: 1, editable: true,
            preProcessEditCellProps(params: GridPreProcessEditCellProps) {
                isInValid = !validateTextInput('firstName', params)
                // console.log('isInValid', isInValid)        
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
                // console.log('isInValid', isInValid)                
                const id = params.id
                isInValid ? setUsers(prevState => prevState.map(e => e.id === id ? { ...e, isEdited: true } : e))
                    : setUsers(prevState => prevState.map(e => e.id === id ? { ...e, isEdited: false } : e))
                return { ...params.props, error: isInValid }
            }
        },
        {
            field: 'email', headerName: 'Email', flex: 1, editable: true,
            preProcessEditCellProps(params: GridPreProcessEditCellProps) {
                // const isValid = params.props.value.length > 0
                isInValid = !validateTextInput('email', params)
                // console.log('isInValid', isInValid)                    
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
            },
        },
    ]

    return (
        <>
            <Box sx={{
                height: 405, width: '100%'
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
                                <Button startIcon={<AddIcon />} onClick={handleAddRow}>
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
                            backgroundColor: '#1976d2',
                            borderRadius: myTheme.shape.borderRadius,
                        },
                        borderRadius: myTheme.shape.borderRadius,
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
                        style={{margin: '0 auto', display: "flex"}}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleCloseDialog}
                        style={{margin: '0 auto', display: "flex"}}
                    >
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
