import React from 'react'

const ConstantMessage = (props) => {
    const message = {
        SUCCESS_ADD_LANGUAGE: 'Success to add new data language',
        INTERNAL_SERVER_ERROR: 'Sorry, there is a problem with the system.'
    }

    return message[props.message]
}
export default ConstantMessage;