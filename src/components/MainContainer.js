import { useSelector } from "react-redux";
import { VideoBackground } from "./VideoBackground";
import VideoTitle from  './VideoTitle'

const MainContainer=()=>{
    //we get the data from selector
    //all the data we come from  reduxstore in 
    const movies=useSelector((store)=>store.movies?.nowPlayingMovies);
    
    //if movie is null
    if(!movies) return;

    const mainMovies=movies[0];
   
    const{original_title,overview,id}=mainMovies;
    
    return (
        <div>
            <VideoTitle title={original_title}  overview={overview} />
            <VideoBackground movieId={id}/>
            
        </div>
   );

}
export default MainContainer