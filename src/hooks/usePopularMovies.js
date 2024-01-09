import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

//custom hooks just normal js fucntion
//basically we use here  and do api call put logic here
const  usePopularMovies=()=>{
    
        const dispatch=useDispatch();
           const getPopularMovies = async ()=>{
               const data=await fetch(
                'https://api.themoviedb.org/3/movie/popular?page=1', 
               API_OPTIONS
               );
               const json=await data.json();
               console.log(json?.results);
               // add this result to movie slice
               dispatch(addPopularMovies(json?.results));
               
       
           };
           useEffect(()=>{
            getPopularMovies();
           },[]);

}
export default usePopularMovies;