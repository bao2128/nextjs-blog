import { users } from '../../data/users';

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(users)
    } else if (req.method === 'POST') {
        const user = req.body.user
        const newUser = {
            id: Date.now(),
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
        users.push(newUser)

    }
}