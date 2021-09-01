import React, {useState} from 'react'
import {Alert} from 'react-bootstrap'
import ConstantMessage from './ConstantMessage'

const FlashMessage = (props) => {
    const [show, setShow] = useState(true);
    
    if (props.display) {
        return (
          <Alert variant={props.status === 500 ? "danger" : "success"} onClose={() => { setShow(false); props.closeFunc()}} dismissible>
            <Alert.Heading>{props.status === 500 ? "Error" : "Success"}</Alert.Heading>
            <p>
              <ConstantMessage message={props.message}/>
            </p>
          </Alert>
        );
    }

    return <div></div>
}

export default FlashMessage