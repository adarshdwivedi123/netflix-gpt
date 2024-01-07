import Login from "./Login";
import Browse from './Browse'
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import {onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body=()=>{
    const dispatch=useDispatch();
    // const navigate=useNavigate();
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

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {      
              const {uid,email,displayName,photoURL} = user.uid;
              dispatch(addUser({id:uid,email:email,displayName:displayName,photoURL}));
              
            } else {
              // User is signed out
              dispatch(removeUser());
              
              
            }
          });

    },[]);

    return(
        <div>
            <RouterProvider router={appRouter}/>
    
        </div>
    );
};
export default Body;