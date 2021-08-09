import React, { useContext } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import MovieSelection from './MovieSelection';
import { MovieContext } from './MovieContext';

export default function MovieCard(props) {


    return (
        <MovieContext.Consumer>
            {value=>(
                <div className="card bg-dark w-50 m-auto" >
            <img src={props.movie.poster} className="card-img-top" alt="..."/>
                <div className="card-body">{
                    
                }
                    <h5 className="card-title">{props.movie.title}</h5>
                    <p className="card-text">Duration: {props.movie.duration}</p>
                    <a href="/ticketing" className="btn btn-primary" onClick={()=>value.toggleMovieSelected(props.movie)}>Get Tickets</a>
                </div>
            </div>
            )}
            
        </MovieContext.Consumer>
            
        

    )
}
