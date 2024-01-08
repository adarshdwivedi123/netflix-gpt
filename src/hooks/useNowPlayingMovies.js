import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

//custom hooks just normal js fucntion
//basically we use here  and do api call put logic here
const  useNowPlayingMovies=()=>{
    
        const dispatch=useDispatch();
           const getNowPlayingMovies = async ()=>{
               const data=await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', 
               API_OPTIONS
               );
               const json=await data.json();
               console.log(json?.results);
               // add this result to movie slice
               dispatch(addNowPlayingMovies(json?.results));
               
       
           };
           useEffect(()=>{
               getNowPlayingMovies();
           },[]);

}
export default useNowPlayingMovies;