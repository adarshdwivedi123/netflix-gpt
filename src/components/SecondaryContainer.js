import { useSelector } from "react-redux";
import  MovieList  from "./MovieList";

const SecondaryContainer=()=>{
    const movies=useSelector((store)=>store.movies);
    if(!movies)return;
    console.log(movies);
    return (
        <div className="bg-black" >
            <div className="-mt-52 pl-12 relative z-20">
            <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
            <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />
            <MovieList title={"Popular"} movies={movies.popularMovies} />
            <MovieList title={"Horror"} movies={movies.nowPlayingMovies} />
            </div>
            
        </div>
    );
}
export  default SecondaryContainer;