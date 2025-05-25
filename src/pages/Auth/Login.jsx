import { useState, useEffect } from "react";
import API from '../../api/api'
import './styles.css'
import loginImage from '../../assets/Auth/41490560_8935175 (1).png';

import { toast } from 'react-toastify';
//import { useNavigate } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { setCredentials } from '../../Redux/authSlice';


const Login = () => {
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [submitClick, setSubmitClick] = useState(false);

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");


const makeResponse = ()=>{
    // form validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        toast.warning("Please enter a valid email address");
        return;
    }

    if (password.length < 6) {
        toast.warning("Password must be at least 6 characters");
        return;
    }


    setSubmitClick(true);
    API.post('/user/login', {email: email, password:password},{
        withCredentials:true
    }).then((response)=>{
        const {accessToken, user} = response.data.data;
        const {message} =  response.data
       
        dispatch(setCredentials({ accessToken, user }));
        setSubmitClick(false)
        toast.success(message);

        console.log("Access Token:", accessToken);
        console.log("User Info:", user);
        console.log(message)

        if(user.role === 'user'){
            window.location.href = "/user/";
        }
        
    }).catch((error)=>{
      // Handles API error and backend-down (network) errors
        if (error.response) {
            // Server responded with a status code outside 2xx
            toast.error(error.response.data.message || "An error occurred");
        } else if (error.request) {
            // Request was made but no response (e.g., backend is down)
            toast.error("Cannot connect to server. Please try again later.");
        } else {
            // Something else went wrong
            toast.error(error.message);
           
        }
    }).finally(()=>{
        setSubmitClick(false)
       
    })
    
}

    useEffect(()=>{
        document.title='Login'

    }, [])

    return (
        <>
      
        
        <section className="bg-blue-200 min-h-screen flex items-center justify-center">
            <div className="bg-[#fdfefff5] flex rounded-2xl shadow-lg max-w-3xl p-4 ml-5 mr-5"> 
                <div className=" mt-8 sm:w-1/2 px-16">
                    <h2 className="mt-10 font-bold text-2xl text-[#4527a5] text-center">Login</h2>
                    <p className="text-xl mt-2 text-[#ef0b0b] text-opacity-70 text-center">
                    Give The Gift Of Life
                    </p>

                    <form className="flex flex-col gap-4">
                        <input
                            className="p-2 mt-8 rounded-sm border border-gray-300"
                            type="email"
                            name="email"
                            placeholder="Your email"
                            id="email"
                            value={email}
                            onChange={(e)=>(setemail(e.target.value))}
                            
                        />
                        <div className="relative">
                            <input
                                className="p-2 mt-0.5 rounded-sm border w-full  border-gray-300"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Your password"
                                id="password"
                                value={password}
                                onChange={(e)=>(setpassword(e.target.value))}
                            />
                            <svg
                                onClick={() => setShowPassword(!showPassword)}
                                className="bi bi-eye-fill absolute top-1/4 right-4 translate-y-1/4 cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill={showPassword ? "black": "red"}
                                viewBox="0 0 18 18"
                            >
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                            </svg>
                        </div>
                        <button type="submit" className="rounded-sm text-white py-2 bg-[#4527a5] Submit-button" onClick={(event)=>{
                            event.preventDefault();
                            {makeResponse()}
                          
                        }} disabled={submitClick}>
                            {submitClick && (
                                <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                            )}
                            
                            Login

                        </button>
                    </form>

                    <div className="mt-10 grid grid-cols-3 items-center text-gray-400">
                        
                    </div>

                  

                    <p className="mt-5 text-xs border-b border-gray-400 py-4">
                        <a href="/forgot-password">Forgot Your password?</a>
                    </p>

                    <div className="mt-3 text-xs flex justify-between items-center">
                        <p>
                            <label>If you don't have an account?</label>
                        </p>
                        <button className="py-2 px-8 bg-red-400 border rounded-xl border-0 Button" onClick={()=>{
                            window.location.href = "/register";
                        }}>Register</button>
                    </div>
                </div>

                <div className="sm:block hidden w-1/2">
                    <img className="sm:block hidden rounded-2xl" src={loginImage} alt="Login" />
                </div>
            </div>
        </section>
       
        </>
    );

}

export default Login