import { useState, useRef } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_IMG} from '../utils/constants';
import { USER_AVATAR } from '../utils/constants';



const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    
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
                        displayName:email.current.value ,
                         photoURL: USER_AVATAR
                      }).then(() => {
                        const {uid,email,displayName,photoURL} = auth.currentUser;
                        dispatch(addUser({id:uid,email:email,displayName:displayName,photoURL:photoURL}));
                        
                         }).catch((error) => {
                        setErrorMessage(error.message);
                     //check here   
                      });
                    
                    
                    

                    
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
                    src={BG_IMG}
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