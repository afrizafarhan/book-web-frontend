import React from 'react';
import { Table, Button } from 'react-bootstrap'

class TableComponent extends React.Component {
    
    tableHeader = () => {
        const tableHeader = [];
    
        for(var key in this.props.data[0]) {
            if (key === 'id')
                tableHeader.push('No')
            else
                tableHeader.push(key);
        }
        return tableHeader
    }

    handleRemoveData = (id) => {
        if (window.confirm('Are you sure you want to remove this ?')) {
            this.props.removeFunc({ id: id })
        }
    }

    handleUpdateData = (val) => {
        this.props.update(val)
    }

    render(){
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        {this.tableHeader().map(author => <th key={author}>{author}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.map((data, i) => (
                        <tr key={data.id}>
                            <td>{i + 1}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.status}</td>
                            <td>
                                <Button variant="outline-primary" onClick={() => this.handleUpdateData(data)} size="sm">Update</Button>&nbsp;
                                <Button variant="outline-danger" onClick={() => this.handleRemoveData(data.id)} size="sm">Danger</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }
}

export default TableComponent