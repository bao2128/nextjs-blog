import * as React from 'react'

import _ from 'lodash'
import { useEffect, useState } from 'react'
import { GridRowModel } from '@mui/x-data-grid'
import { ThemeProvider, useTheme } from '@mui/material/styles'


const AppContext = React.createContext([])     //create shared state

export function AppWrapper({ children }) {
    const [users, setUsers] = React.useState<GridRowModel[]>(
        [
            {
                "id": 0,
                "firstName": "Fanny",
                "lastName": "Saunderson",
                "email": "Fanny.Saunderson@gmail.com",
                "password": "Abc@1234"
            },
            {
                "id": 1,
                "firstName": "Bobbi",
                "lastName": "Colp",
                "email": "Bobbi.Colp@gmail.com",
                "password": "Abc@1234"
            },
            {
                "id": 2,
                "firstName": "Nataline",
                "lastName": "Ajay",
                "email": "Nataline.Ajay@gmail.com",
                "password": "Abc@1234"
            },
            {
                "id": 3,
                "firstName": "Myrtice",
                "lastName": "Parsaye",
                "email": "Myrtice.Parsaye@gmail.com",
                "password": "Abc@1234"
            },
            {
                "id": 4,
                "firstName": "Siana",
                "lastName": "McCutcheon",
                "email": "Siana.McCutcheon@gmail.com",
                "password": "Abc@1234"
            },
            {
                "id": 5,
                "firstName": "Chickie",
                "lastName": "Solitta",
                "email": "Chickie.Solitta@gmail.com",
                "password": "Abc@1234"
            },
            {
                "id": 6,
                "firstName": "Peri",
                "lastName": "Maxi",
                "email": "Peri.Maxi@gmail.com",
                "password": "Abc@1234"
            },
            {
                "id": 7,
                "firstName": "ZsaZsa",
                "lastName": "Ax",
                "email": "ZsaZsa.Ax@gmail.com",
                "password": "Abc@1234"
            },
        ]
    )

    // console.log("sharedState", users)
    // const userClone = _.cloneDeep(users)
    const [status, setStatus] = useState('')

    useEffect(() => {
        // Perform localStorage action
        localStorage.setItem('status', 'false')
        setStatus(localStorage.getItem('status'))
    }, [])

    // console.log('status: ', status)
    // console.log('status: ', window.sessionStorage.getItem('status'))    //wrong: server side

    return (
        <AppContext.Provider value={[users, setUsers, status, setStatus]}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return React.useContext(AppContext)
}