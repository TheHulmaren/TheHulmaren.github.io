import React, { useContext, useEffect, useRef, useState } from 'react'
import Payment from './Payment'

import { MovieContext } from './MovieContext'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function Checkout() {

    const value = useContext(MovieContext)

    var adultSeating = []
    var childSeating = []
    const [adultFee, setAdultFee] = useState(0)
    const [childFee, setChildFee] = useState(0)
    const [cardInfo, setCardInfo] = useState([])

    const [showCredit, setShowCredit] = useState(false);
    const [showGift, setShowGift] = useState(false);

    const handleCloseCredit = () => setShowCredit(false);
    const handleShowCredit = () => setShowCredit(true);
    const handleCloseGift = () => setShowGift(false);
    const handleShowGift = () => setShowGift(true);

    const cardNumber = useRef(null)
    const expDate = useRef(null)
    const cardCode = useRef(null)
    const firstName = useRef(null)
    const lastName = useRef(null)
    const country = useRef(null)
    const address = useRef(null)
    const phoneNumber = useRef(null)

    const submitCredit = () => {
        var temp = [...cardInfo]
        temp.push({
            "number": cardNumber.current.value,
            "expdate": expDate.current.value,
            "cardcode": cardCode.current.value,
            "address": {
                "firstname": firstName.current.value,
                "lastname": lastName.current.value,
                "country": country.current.value,
                "address": address.current.value,
                "phonenumber": phoneNumber.current.value,
            }
        })

        setCardInfo(temp)
        
    }

    value.checkoutData.seating[0].adultSeats.map(element => {
        adultSeating.push(<div className="col-3">{element}</div>)
    })
    value.checkoutData.seating[1].childSeats.map(element => {

        childSeating.push(<div className="col-3">{element}</div>)
    })

    useEffect(() => {
        setAdultFee((11.2 * adultSeating.length).toFixed(2))
        setChildFee((8.7 * childSeating.length).toFixed(2))
    }, [])



    return (

        <div className="container text-white">
            <div className="row text-center bg-warning text-dark border border-4">
                <p className="fs-2 m-1">Check out</p>
            </div>

            <div className="row justify-content-center">
                <div className="col-6 bg-secondary p-3 m-2" style={{ width: "60vh" }}>
                    <div className="row">
                        <div className="col-7">
                            <img src={value.movieSelected.poster} className="img-fluid" />
                        </div>

                        <div className="col-5">
                            <p className="fs-3">{value.movieSelected.title}</p>
                            <p>Duration: {value.movieSelected.duration}</p>
                            <p>{value.checkoutData.date}</p>
                            <p>{value.checkoutData.time}</p>
                            <hr></hr>
                            <p>Adult Seats</p>
                            <div className="row">
                                {adultSeating.length == 0 ? <p>None</p> : adultSeating}
                            </div>
                            <p>Child Seats</p>
                            <div className="row">
                                {childSeating.length == 0 ? <p>None</p> : childSeating}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6 border p-3 m-2" style={{ width: "60vh" }}>
                    {adultSeating.length == 0 ? null :
                        <div className="row m-3 justify-content-between">
                            <p className="col-6" >Adult x{adultSeating.length}</p>
                            <p className="col-6 text-end">${adultFee}</p>
                            <hr></hr>

                        </div>
                    }
                    {childSeating.length == 0 ? null :
                        <div className="row m-3 justify-content-between">
                            <p className="col-6">Child x{childSeating.length}</p>
                            <p className="col-6 text-end">${childFee}</p>
                            <hr></hr>
                        </div>
                    }

                    <div className="row m-3 justify-content-between">
                        <p className="col-6">Subtotal:</p>
                        <p className="col-6 text-end">${+adultFee + +childFee}</p>
                    </div>
                    <div className="row m-3 justify-content-between">
                        <p className="col-6">Convenience Fee(Non-Refundable):</p>
                        <p className="col-6 text-end">$1.50</p>
                        <hr></hr>
                    </div>
                    <div className="row m-3 justify-content-between">
                        <p className="col-6">Your Total:</p>
                        <p className="col-6 text-end">${+adultFee + +childFee + 1.50}</p>

                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-4 p-2">
                    <Button variant="primary" onClick={handleShowCredit}>
                        +CREDIT OR DEBIT CARD
                    </Button>
                </div>
                <div className="col-3 p-2">
                    <Button variant="primary" onClick={handleShowGift}>
                        +GIFT CARD
                    </Button>
                </div>
                


                <Modal
                    show={showCredit}
                    onHide={handleCloseCredit}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Credit or Debit Card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <input type="text" id="inputPassword5" class="form-control mt-4" placeholder="Card Number" ref={cardNumber} />
                        <input type="text" id="inputPassword5" class="form-control mt-4" placeholder="Exp. Date" ref={expDate} />
                        <input type="text" id="inputPassword5" class="form-control mt-4" placeholder="Card Code" ref={cardCode} />
                        <input type="text" id="inputPassword5" class="form-control mt-4" placeholder="First Name" ref={firstName} />
                        <input type="text" id="inputPassword5" class="form-control mt-4" placeholder="Last Name" ref={lastName} />
                        <select class="form-select mt-4" aria-label="Default select example" ref={country}>
                            <option selected>Country</option>
                            <option value="Korea, Republic of">Korea, Republic of</option>
                            <option value="United States">United States</option>
                            <option value="Japan">Japan</option>
                        </select>
                        <input type="text" id="inputPassword5" class="form-control mt-4" placeholder="Address" ref={address} />
                        <input type="text" id="inputPassword5" class="form-control mt-4" placeholder="Phone Number" ref={phoneNumber} />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCredit}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={submitCredit}>Save Card</Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={showGift}
                    onHide={handleCloseGift}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        I will not close if you click outside me. Don't even try to press
                        escape key.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseGift}>
                            Close
                        </Button>
                        <Button variant="primary">Understood</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="row">
                <Payment paymentList={cardInfo}/>
            </div>


        </div>
    )
}
