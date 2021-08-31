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

    keyForGetData = () => {
        const keyData = [];
    
        for(var key in this.props.data[0]) {
            if (key === 'id') continue

            keyData.push(key);
        }
        return keyData
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
            <Table className="mt-2" striped bordered hover size="sm">
                <thead>
                    <tr>
                        {this.tableHeader().map(author => <th key={author}>{author}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.length > 0 ? this.props.data.map((data, i) => (
                        <tr key={data.id}>
                            <td>{i + 1}</td>
                                {this.keyForGetData().map((key,i) => <td key={key + i + '_td_table'}>{data[key]}</td>)}
                            <td>
                                <Button variant="outline-primary" onClick={() => this.handleUpdateData(data)} size="sm">Update</Button>&nbsp;
                                <Button variant="outline-danger" onClick={() => this.handleRemoveData(data.id)} size="sm">Danger</Button>
                            </td>
                        </tr>
                    )) : <tr><td className="text-center">Tidak ada data</td></tr>}
                </tbody>
            </Table>
        )
    }
}

export default TableComponent