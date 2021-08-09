import React, { useState } from 'react'


import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import visaLogo from '../images/visa.png'
import masterLogo from '../images/mastercard.png'
import discoverLogo from '../images/discover.png'
import aeLogo from '../images/ae.png'
import koreaFlag from '../images/southkorea.png'
import japanFlag from '../images/japan.png'
import usFlag from '../images/us.png'

export default function Payment(props) {

    const [show, setShow] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(0)
    const [isPurchased, setIsPurchased] = useState(false)
    const [isPaymentSelected, setIsPaymentSelected] = useState(false)

    const handleClose = () => {
        setShow(false)
        setIsPaymentSelected(false)
    };
    const handleShow = () => setShow(true);

    const handleCardSelect = (e) => {
        setSelectedPayment(e)
        setIsPaymentSelected(true)
    }

    const handlePay=()=>{
        if(isPaymentSelected==true){
            setIsPurchased(true)
            setShow(false)
        }
        
    }

    var list = props.paymentList.map(element => {
        return (
            <div>
                <button type="button" onClick={() => handleCardSelect(element)} class="btn btn-outline-success col-12 mb-3">
                    <div class="row">
                        <div className="col-9 text-start">
                            <p className="fs-3 m-0">{element.number}</p>
                            <p class="m-0">{element.expdate}</p>
                            <p class="m-0">{element.address.firstname} {element.address.lastname}</p>
                            <p class="m-0">{element.address.address}</p>
                        </div>
                        <div className="col-3 d-block">

                            {element.number.charAt(0) == "2" ? <img src={masterLogo} class="img-fluid" /> : null}
                            {element.number.charAt(0) == "3" ? <img src={aeLogo} class="img-fluid" /> : null}
                            {element.number.charAt(0) == "4" ? <img src={visaLogo} class="img-fluid" /> : null}
                            {element.number.charAt(0) == "5" ? <img src={masterLogo} class="img-fluid" /> : null}
                            {element.number.charAt(0) == "6" ? <img src={discoverLogo} class="img-fluid" /> : null}
                            <div class="justify-content-end d-flex mt-4">
                                {element.address.country == "Korea, Republic of" ? <img src={koreaFlag} class="img-fluid w-50" /> : null}
                                {element.address.country == "Japan" ? <img src={japanFlag} class="img-fluid w-50" /> : null}
                                {element.address.country == "United States" ? <img src={usFlag} class="img-fluid w-50" /> : null}
                            </div>

                        </div>
                    </div>

                </button>
            </div>


        )
    })

    return (
        <div class="col">
            {!(isPurchased == true) ? 
            <div className="row justify-content-center">

            <Button variant="primary" onClick={handleShow}>
                Complete Purchase
            </Button>
            </div> :
            <div class="row">
                <div className="col d-flex justify-content-center">
                    <p class="fs-2">Puchase successful!</p>
                </div>
             
             </div>
             }
             

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Choose Payment Method</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-block">
                        {list}
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handlePay} variant="primary">Pay</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
