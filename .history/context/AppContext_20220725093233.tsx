import * as React from 'react';
import { userList } from '../components/interface'
import useState from 'react-usestateref'
import _ from 'lodash';

const AppContext = React.createContext([]);     //create shared state

export const usersInit = [
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
		"firstName": "Zsa Zsa",
		"lastName": "Ax",
		"email": "Zsa Zsa.Ax@gmail.com",
		"password": "Abc@1234"
	},
]

export function AppWrapper({ children }) {
    const [users, setUsers] = useState(
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
                "firstName": "Zsa Zsa",
                "lastName": "Ax",
                "email": "Zsa Zsa.Ax@gmail.com",
                "password": "Abc@1234"
            },
        ]
    )
    
    // async function fetchData() {
    //     // const res = await fetch('/api/User')
    //     // const result: userList[] = await res.json()
    //     // return result
    //     fetch('api/User').then(results => results.json()).then(data => {
    //         setUsers(data)
    //     })
    // }

    // const data = fetchData()
    // setUsers(data)

    // React.useEffect(() => {    
    //     setUsers(...usersInit)
    // }, [])
    
    // let sharedState:userList[] = users
    // console.clear()
    console.log("sharedState", users);

    return (
        <AppContext.Provider value={[users, setUsers]}>       
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return React.useContext(AppContext);
}