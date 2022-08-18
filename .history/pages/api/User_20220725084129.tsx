import _ from 'lodash';
import { useAppContext } from '../../context/AppContext';
import { users } from '../../data/users';

export default function handler(req, res) {
    const [users, setUsers] = useAppContext()

    if (req.method === 'GET') {
        res.status(200).json(users)
    } else if (req.method === 'POST') {
        const user = req.body.user
        const newUser = {
            id: Date.now(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
        };
        // users.push(_.cloneDeep(newUser))        //wrong
        setUsers(prevState =>({
            ...prevState, users: {user}})
        )
        // res.status(201).json(_.cloneDeep(users))
    }
}