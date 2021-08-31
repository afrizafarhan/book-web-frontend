import React, { Component } from 'react';
import axios from 'axios'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import TableComponent from '../datatable/TableComponent'

class Author extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authors: [],
            author: {
                id: 0,
                name: '',
                email: '',
                status: 0
            },
            isUpdate: false
        }
    }
    getAuthors() {
        axios
            .get(process.env.REACT_APP_API_URL + '/authors')
            .then(res => this.setState({
                authors: res.data,
                author: {
                    id: 0,
                    name: '',
                    email: '',
                    status: 0
                },
                isUpdate: false
            }))
    }
    addAuthor(val) {
        axios
            .post(process.env.REACT_APP_API_URL + '/author', val)
            .then(res => this.getAuthors())
            .catch(e => {
                console.log(e)
            })
    }
    updateAuthor(val) {
        axios
            .put(process.env.REACT_APP_API_URL + '/authorupdate', val)
            .then(res => this.getAuthors())
    }
    deleteAuthor(val) {
        axios
            .delete(process.env.REACT_APP_API_URL + '/author', {
                data: val
            })
            .then(res => this.getAuthors())
    }
    updateDataState = (val) => {
        this.setState({ author: val, isUpdate: true })
    }
    handleFormChange = (event) => {
        let authorTmp = { ...this.state.author }
        authorTmp[event.target.name] = event.target.value
        this.setState({
            author: authorTmp
        })
    }
    handleSubmit = () => {
        if (this.state.isUpdate) {
            this.updateAuthor(this.state.author)
        } else {
            this.addAuthor(this.state.author)
        }
    }
    handleReset = () => {
        this.setState({
            author: {
                id: 0,
                name: '',
                email: '',
                status: 0
            }
        })
    }
    componentDidMount() {
        this.getAuthors();
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <Form >
                            <input type="hidden" name="id" value={this.state.author.id} />
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Author Name</Form.Label>
                                <Form.Control type="text" name="name" placeholder="Enter Author Name" onChange={this.handleFormChange} value={this.state.author.name} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Author Email</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter Author Email" onChange={this.handleFormChange} value={this.state.author.email} />
                            </Form.Group>
                            <Button variant="primary" name="btn_add_author" onClick={this.handleSubmit} type="button">
                                Save
                            </Button>
                            &nbsp;
                            <Button variant="warning" name="btn_reset_author" type="button" onClick={this.handleReset}>
                                Reset
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <div style={{height: 20}}></div>
                <TableComponent data={this.state.authors} removeFunc={(val) => this.deleteAuthor(val)} update={(val) => this.updateDataState(val)} />
            </Container>
        )
    }
}

export default Author