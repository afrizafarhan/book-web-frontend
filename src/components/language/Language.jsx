import React, { Component } from 'react'
import FormLanguage from './FormLanguage'
import { Container } from 'react-bootstrap'
import axios from 'axios'

class Language extends Component {
    constructor() {
        super()
        this.state = {
            languages: [],
            language: {
                id: 0,
                name: ''
            },
            isUpdate: false,
            status: 0,
            message: '',
            display: false
        }
    }
    componentDidMount = () => {
        this.listLanguage()
    }
    listLanguage = () => {
        axios.get(process.env.REACT_APP_API_URL + '/languages')
            .then(res => this.setState({
                languages: res.data, language: {
                    id: 0,
                    name: ''
                },
                isUpdate: false
            }))
            .catch(err => console.log(err))
    }
    addLanguage = (data) => {
        axios.post(process.env.REACT_APP_API_URL + '/language', data)
            .then(res => this.listLanguage())
            .catch(e => console.log(e))
    }
    updateLanguage = (data) => {
        axios.put(process.env.REACT_APP_API_URL + '/language', data)
            .then(res => {
                console.log(res)
                this.listLanguage()
            })
            .catch(e => { 
                console.log(e)
                this.setState({ status: 500, message: e.error, display: true }) 
            })
    }
    deleteLanguage = (data) => {
        axios.delete(process.env.REACT_APP_API_URL + '/language', {
            data
        }).then(res => this.listLanguage())
            .catch(e => console.log(e))
    }
    updateLanguageState = (data, openModalUpdate) => {
        openModalUpdate()
        this.setState({
            language: data,
            isUpdate: true
        })
    }
    handleFormChange = (e) => {
        let languageTmp = { ...this.state.language }
        languageTmp[e.target.name] = e.target.value
        this.setState({ language: languageTmp })
    }
    handleSubmit = (closedModal) => {
        closedModal()
        if (this.state.isUpdate) this.updateLanguage(this.state.language)
        else this.addLanguage(this.state.language)
    }
    handleShowModal = (openModalAdd) => {
        this.setState({
            language: {
                id: 0,
                name: ''
            },
        })
        openModalAdd()
    }
    handleMessageClose = (closeFlashMessage) => {
        this.setState({
            status: 0,
            message: '',
            display: false,
        })
    }
    render = () => (
        <>
            <Container>
                <FormLanguage className="mb-2"
                    changeFunc={this.handleFormChange}
                    submitFunc={(fn) => this.handleSubmit(fn)}
                    modalShowFunc={(fn) => this.handleShowModal(fn)}
                    deleteFunc={(val) => this.deleteLanguage(val)}
                    updateFunc={(val, fn) => this.updateLanguageState(val, fn)}
                    data={this.state.languages}
                    dataForForm={this.state.language}
                    displayFlash={this.state.display}
                    statusFlash={this.state.status}
                    messageFlash={this.state.message}
                    closeFlashFunc={this.handleMessageClose}
                />
            </Container>
        </>
    )
}

export default Language