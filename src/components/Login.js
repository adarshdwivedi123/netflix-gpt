import { useState } from 'react';
import Header from './Header';
const Login=()=>{
    const[isSignInForm,setIsSignInForm]=useState(true);
    const toggleSignInForm=()=>{
            setIsSignInForm(!isSignInForm);
    }
     return(
            <div>
                <Header/>
                <div className='absolute'>
                    <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
                    alt="logo"/>
                </div>
                 {/* Login Form */}
                <form className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
                    <h1 className='font-bold text-xl py-4'>
                        {isSignInForm?"Sign In":"Sign Up"}
                    </h1>
                    {!isSignInForm && 
                    (<input type="text" placeholder="Full Name" className='p-4 my-2 w-full bg-gray-700'/>
                    )}
                    <input type="text" placeholder="Email Address" className='p-4 my-2 w-full bg-gray-700'/>
                    <input type="password" placeholder="Password" className='p-4 my-2 w-full bg-gray-700'/>
                    <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignInForm?"Sign In":"Sign Up"}</button>
                    <p className='py-6 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm?"New to Netflix? Sign Up Now":"Already registered? Sign In Now"}</p>
                </form>
            </div>          
     );
}
export default Login;