import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import {changeLanguage} from '../utils/configSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const showGptSearch=useSelector((store)=>store.gpt.showGptSearch);
    const handleSignOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
        });

    }

    useEffect(() => {
     const unsubscibe= onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch
                    (addUser(
                        { uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                navigate("/browse")

            } else {
                // User is signed out
                dispatch(removeUser());
                navigate("/");


            }
        });
//This will called componene unsubscribe
            return ()=>unsubscibe();
    }, []);
      
    const handleGptSearch=()=>{
        dispatch(toggleGptSearchView());
    }
    const handleLanguageChange=(e)=>{
        // console.log(e.target.value);
         dispatch(changeLanguage(e.target.value));


    }
    
    return (
        <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between">
            <img
                className="w-44"
                src={LOGO}
                alt="logo"
            />
         
            {/* display this div one some signIN */}
            {user && <div className="flex p-2">

                {showGptSearch  &&<select className="p-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
                    {SUPPORTED_LANGUAGES.map(lang => (
                    <option key={lang.identifier} value={lang.identifier}>
                        {lang.name}
                    </option>
                ))}
                    
                    {/* <option value='hindi1'>Hindi</option>
                    <option value="spanish">Spanish</option> */}
                </select>}

            <button className="py-2  px-4   mx-4 my-2 bg-purple-800 text-white rounded-lg "onClick={handleGptSearch}>{showGptSearch ? "Home Page":"GPT Search" }</button>
                <img
                    className="w-12 h-12 p-2"
                    alt="usericon"
                    src={user?.photoURL}
                />
                <button className="font-bold text-white" onClick={handleSignOut}>(Sign Out)</button>

            </div>}
        </div>
    );
};
export default Header;