import React, { useState, useEffect, useContext } from 'react'

import cinema from './cinema.json'
import TimeSelect from './TimeSelect';
import { MovieContext } from './MovieContext';

import {BsSquare} from 'react-icons/bs'
import { BsXSquare } from 'react-icons/bs';
import { BsSquareFill } from 'react-icons/bs';
import { BsDot } from 'react-icons/bs';

import adultImg from '../images/seat/adult.png'
import availableImg from '../images/seat/available.png'
import childImg from '../images/seat/child.png'
import soldImg from '../images/seat/sold.png'

export default function Ticketing() {
    var rows = [];
    var cols = [];
    const value = useContext(MovieContext)

    var cinemaSelected = cinema.filter(function(c){
      
        
        return c.cinema == value.cinemaSelected
        
    })[0]

    const [adult, setAdult] = useState(0)
    const [child, setChild] = useState(0)
    const [seats, setSeats] = useState(cinemaSelected.seat)
    const [selected, setSelected] = useState(0)
    const [adultSeats, setAdultSeats] = useState([])
    const [childSeats, setChildSeats] = useState([])

    const decreaseAdult = () => {
        if (adult > 0) {
            setAdult(adult - 1)
        }
    }

    const increaseAdult = () => {
        setAdult(adult + 1)
        setSelected("Adult")
    }

    const decreaseChild = () => {
        if (child > 0) {
            setChild(child - 1)
        }
    }

    const increaseChild = () => {
        setChild(child + 1)
        setSelected("Child")
    }

    const selection = (sel) => {
        setSelected(sel)

    }

    const seatSelect = (e) => {
        var temp = cinemaSelected.seat
      
        if (temp[e.target.getAttribute('row')][e.target.getAttribute('col')] == 2) {
            if (selected == "Adult") {

                temp[e.target.getAttribute('row')][e.target.getAttribute('col')] = 'A'

                increaseAdult()

            }
            else {

                temp[e.target.getAttribute('row')][e.target.getAttribute('col')] = 'C'

                increaseChild()

            }
        }
        else if (temp[e.target.getAttribute('row')][e.target.getAttribute('col')] == 'A') {
            if (selected == "Adult") {
                temp[e.target.getAttribute('row')][e.target.getAttribute('col')] = 2
                decreaseAdult()
            }
            else {
                temp[e.target.getAttribute('row')][e.target.getAttribute('col')] = 'C'
                decreaseAdult()
                increaseChild()
            }

        }
        else if (temp[e.target.getAttribute('row')][e.target.getAttribute('col')] == 'C') {
            if (selected == "Child") {
                temp[e.target.getAttribute('row')][e.target.getAttribute('col')] = 2
                decreaseChild()
            }
            else {
                temp[e.target.getAttribute('row')][e.target.getAttribute('col')] = 'A'
                decreaseChild()
                increaseAdult()
            }
        }
        setSeats([...temp])
        
        checkSeats(cinemaSelected.seat)
        
    }

    const checkSeats=(s)=>{
        var temp = s
        var temp1 = [];
        var temp2 = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {

                if (temp[i][j] == "A") {
                    temp1.push([i, j])
                }
                else if (temp[i][j] == "C") {
                    temp2.push([i, j])
                }
            }
        }
        setAdultSeats(temp1)
        setChildSeats(temp2)
    }



    for (let i = 0; i < 10; i++) {
        
        for (let j = 0; j < 10; j++) {
            if (cinemaSelected.seat[i][j] == 2) {
                cols.push(<img src={availableImg} className="col" onClick={seatSelect} row={i} col={j}></img>)
                
            }
            else if (cinemaSelected.seat[i][j] == 1) {
                cols.push(<img src={soldImg} className="col" row={i} col={j}></img>)
            }
            else if (cinemaSelected.seat[i][j] == 0) {
                cols.push(<BsDot src={availableImg} className="col" row={i} col={j}></BsDot>)
            }
            else if (cinemaSelected.seat[i][j] == 'A') {
                cols.push(<img src={adultImg} className="col" onClick={seatSelect} row={i} col={j}></img>)
            }
            else if (cinemaSelected.seat[i][j] == 'C') {
                cols.push(<img src={childImg} className="col" onClick={seatSelect} row={i} col={j}></img>)
            }
        }
        rows.push(<div className="row my-3 flex mx-auto" >{cols}</div>)
        cols = []
        

    }
    
    const handleCheckout=()=>{
        value.toggleCheckoutData({
            "date":value.checkoutData.date,
            "time":value.checkoutData.time,
            "seating":[
                {adultSeats},
                {childSeats}
            ]
        })
    }

    return (
        
                <div onMouseMove={()=>checkSeats(cinemaSelected.seat)} className="container text-white">
                    <TimeSelect ></TimeSelect>
                    <div className="col border mx-auto p-2" style={{width:"500px"}}>
                        {
                        rows
                        
                    }
                    </div>
                    
                    <div className="row my-3">
                        <div className="col d-flex justify-content-end">

                            <p className="my-auto">{adultSeats.length}</p>

                        </div>
                        <div className="col d-flex">

                            <button type="button" className={selected == "Adult" ? "btn btn-warning w-100 m-auto" : "btn btn-secondary w-100 m-auto"} onClick={() => selection("Adult")}>Adult</button>
                        </div>
                        <div className="col  d-flex  justify-content-end">

                            <p className="my-auto">{childSeats.length}</p>

                        </div>
                        <div className="col  d-flex">
                            <button type="button" className={selected == "Child" ? "btn btn-warning w-100 m-auto" : "btn btn-secondary w-100 m-auto"} onClick={() => selection("Child")}>Child</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-end">
                            {adultSeats}
                        </div>
                        <div className="col">
                            
                        </div>
                               {childSeats}
                    </div>
                    <div className="row">
                        <a href="/checkout" className="col-3 mx-auto btn btn-primary" onClick={handleCheckout}>Check out</a>
                    </div>
                </div>
           

    )
}
