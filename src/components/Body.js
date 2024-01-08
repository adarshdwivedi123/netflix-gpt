import Login from "./Login";
import Browse from './Browse'
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";



const Body=()=>{
    const dispatch=useDispatch();
    const appRouter=createBrowserRouter([
        {
            path:'/',
            element:<Login/>
        },
        {
            path:'/browse',
            element:<Browse/>
        },

    ]);
    //here we disptach the action 
    // we use useEffect we want to call only one time

  

    return(
        <div>
            <RouterProvider router={appRouter}/>
    
        </div>
    );
};
export default Body;