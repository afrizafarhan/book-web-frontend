import React, { Component } from 'react';
import FormCategory from './FormCategory';
import { Container } from 'react-bootstrap'

import axios from 'axios';

class Category extends Component {
    constructor() {
        super()
        this.state = {
            categories: [],
            category: {
                id: 0,
                name: ''
            },
            isUpdate: false,
        }
    }
    listCategories = () => {
        axios.get(process.env.REACT_APP_API_URL + '/categories')
            .then(res => this.setState({
                categories: res.data, category: {
                    id: 0,
                    name: ''
                },
                isUpdate: false
            }
            )).catch(e => console.log(e))
    }
    addCategory = (data) => {
        axios.post(process.env.REACT_APP_API_URL + '/category', data)
            .then(res => this.listCategories())
            .catch(e => console.log(e))
    }
    updateCategory = (data) => {
        axios
            .put(process.env.REACT_APP_API_URL + '/category', data)
            .then(res => this.listCategories())
            .catch(e => console.log(e))
    }
    deleteCategory = (data) => {
        axios
            .delete(process.env.REACT_APP_API_URL + '/category', {
                data: data
            })
            .then(res => this.listCategories())
            .catch(e => console.log(e))
    }
    updateCategoryState = (data, openModalCategory) => {
        openModalCategory()
        this.setState({ category: data, isUpdate: true })
    }
    handleFormChange = (e) => {
        let addCategoryTmp = { ...this.state.category }
        addCategoryTmp[e.target.name] = e.target.value
        this.setState({ category: addCategoryTmp })
    }
    handleSubmit = (closedModal) => {
        closedModal()
        if (this.state.isUpdate) this.updateCategory(this.state.category)
        else this.addCategory(this.state.category)
    }
    handleShowModal = (openModal) => {
        this.setState({
            category: {
                id: 0,
                name: ''
            }
        })
        openModal()

    }
    componentDidMount = () => {
        this.listCategories()
    }
    render() {
        return (
            <Container>
                <FormCategory className="mb-2"
                    changeFunc={this.handleFormChange}
                    submitFunc={(fn) => this.handleSubmit(fn)}
                    modalShowFunc={(fn) => this.handleShowModal(fn)}
                    deleteFunc={(val) => this.deleteCategory(val)}
                    updateFunc={(val, fn) => this.updateCategoryState(val, fn)}
                    data={this.state.categories}
                    dataForForm={this.state.category}
                />
            </Container>
        )
    }
}

export default Category