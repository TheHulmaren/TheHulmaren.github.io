import React,{createContext} from 'react'

export const MovieContext = React.createContext({
    movieSelected: {},
    cinemaSelected:{},
    checkoutData:{},
    toggleMovieSelected: (a)=>{},
    toggleCinemaSelected:(a)=>{},
    toggleCheckoutData:(a)=>{},
})
