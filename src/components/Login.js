import { useState, useRef } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';



const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate =useNavigate();
    const dispatch =useDispatch()

    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
        //validate the Form data
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);

        if (message) return;
        //Sign Up Logic       
        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName:email.current.value , photoURL: "https://avatars.githubusercontent.com/u/51378545?v=4"
                      }).then(() => {
                        const {uid,email,displayName,photoURL} = auth.currentUser;
                        dispatch(addUser({id:uid,email:email,displayName:displayName,photoURL}));

                        navigate("/browse")
                        
                         }).catch((error) => {
                        setErrorMessage(error.message);
                     //check here   
                      });
                    navigate("/browse");
                    
                    

                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode+"-"+errorMessage);
                    
                });


        }
        else {
            //Sign In Logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                
                const user = userCredential.user;
                navigate("/browse");
                console.log(user);
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+"-"+errorMessage);
            });


        }

    }
    return (
        <div>
            <Header />
            <div className='absolute'>
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
                    alt="logo" />
            </div>
            {/* Login Form */}
            <form onSubmit={(e) => e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
                <h1 className='font-bold text-xl py-4'>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm &&
                    (<input type="text" placeholder="Full Name" className='p-4 my-2 w-full bg-gray-700' />
                    )}

                <input ref={email}
                    type="text" placeholder="Email Address" className='p-4 my-2 w-full bg-gray-700' />

                <input
                    ref={password}
                    type="password" placeholder="Password" className='p-4 my-2 w-full bg-gray-700' />

                <p className='text-red-500 font-bold text-lg p-2'>{errorMessage}</p>



                <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick} >{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className='py-6 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}</p>
            </form>
        </div>
    );
}
export default Login;