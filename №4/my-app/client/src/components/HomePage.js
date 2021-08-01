import React from 'react'
import {Table} from 'react-bootstrap'
import {users} from '../mock-data.js/mockData'

const TableRow = ({us}) => {
    return (
        <tr key={us.id}>
                    <td>{us.id}</td>
                    <td>{us.name}</td>
                    <td>{us.email}</td>
                    <td>{us.reistration}</td>
                    <td>{us.login}</td>
                    <td>{us.status}</td>
                </tr> 
    )
}

export function HomePage() {
    const user = users()
    console.log('user', user)
    
        const tableBody = () => {
            return user.map((us, idx) => { 
                return <TableRow us={us} />
            })
        }
    
    
    
    return (
        <div className="container">
            <Table>
                <thead>
                    <tr>
                    <th>№</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date registraion</th>
                    <th>Login Date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                    {tableBody()}
                </tbody>
            </Table>
        </div>
    )
}