import React, { useState , useContext, useEffect} from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Carousel from 'react-bootstrap/Carousel'
import { MovieContext } from './MovieContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import movieData from './data.json'
import MovieCard from './MovieCard';
import { CarouselItem } from 'react-bootstrap';

function MovieSelection() {
    const [date, setDate] = useState("August 7, 2021")
    const [movieList, setMovieList] = useState(0)

    const value = useContext(MovieContext)

    const handleChange = (e) => {
        setDate(e.target.value)
        console.log(e.target.value)
        setMovieList(movieData.filter(function (day) {
            return day.date === date
        }))
        value.toggleCheckoutData({
            "date":e.target.value,
            "time":0,
        })
    }

    var items = movieData.filter(function (day) {

        return day.date === date
    })[0].movies.map(function (movie) {

        return (
            <Carousel.Item>

                
                    <MovieCard  movie={movie} />
                
            </Carousel.Item>
        )
    })

    useEffect(() => {
        value.toggleCheckoutData({
            "date":"August 7, 2021",
            "time":0,
        })
    },[])



    return (
        <div className="container">
            <div className="row">
                <select class="form-select text-white bg-dark" aria-label="Default select example"
                    onChange={handleChange}>


                    <option selected value="August 7, 2021">August 7, 2021</option>
                    <option value="August 8, 2021">August 8, 2021</option>
                    
                </select>
            </div>
            <div className="row text-white mt-5 d-flex justify-content-center">

                <Carousel className="w-75">
                    {items}
                </Carousel>
{console.log(value.movieSelected)}



            </div>
        </div>
    )
}

export default MovieSelection;