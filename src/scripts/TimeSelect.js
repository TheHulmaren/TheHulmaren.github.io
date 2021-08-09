import React, { useState, useContext, useEffect } from 'react'
import { MovieContext } from './MovieContext';

export default function TimeSelect() {
   
    const value = useContext(MovieContext)

    const handleChange=(e)=>{
        value.toggleCinemaSelected(e.target.value)
        value.toggleCheckoutData({
            "date":value.checkoutData.date,
            "time":e.target.getAttribute("time")
        })
    }

    const initialSel=(e)=>{
        value.toggleCinemaSelected(e.target.value)
    }

   

    useEffect(()=>{
        value.toggleCinemaSelected(value.movieSelected.showtime[0][1])
        value.toggleCheckoutData({
            "date":value.checkoutData.date,
            "time":value.movieSelected.showtime[0][0]
        })
    },[])

    return (
        <MovieContext.Consumer>
            {value => (
                <div className="row">
                    <div className="col">

                        <p>{value.movieSelected.title}</p>
                        <p>Duration: {value.movieSelected.duration}</p>
                    </div>
                    <div className="col">
                        <select class="form-select text-white bg-dark" aria-label="Default select example"
                            onChange={handleChange} onLoad={initialSel}>
                                {value.movieSelected.showtime.map(function(time){
                                    return(
                                        <option value={time[1]} time={time[0]}>{time[0]}{time[1]}</option>
                                    )
                                })}

                           
                        </select>
                    </div>
                </div>
            )}
        </MovieContext.Consumer>

    )
}
