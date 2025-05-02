import { useState, useEffect } from "react";
import API from '../../api/api'
import './styles.css'
import loginImage from '../../assets/Auth/41490560_8935175 (1).png';



const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
  
    
    useEffect(()=>{
        document.title='Login'

    }, [])

    return (
        <>
        <div className="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
               <li></li>
               <li></li><li></li><li></li>
               <li></li><li></li>
               <li></li>
            </ul>
    </div >
        <div className="context">
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
                            
                        />
                        <div className="relative">
                            <input
                                className="p-2 mt-0.5 rounded-sm border w-full  border-gray-300"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Your password"
                                id="password"
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

                            const email = document.getElementById('email').value;
                            const password = document.getElementById('password').value;
                
                            API.post('/user/login', {email: email, password:password},{
                                
                                withCredentials:true
                            }).then(()=>{
                               console.log("login success");
                               window.location.href = "/";
                            }).catch((error)=>{
                               alert((error.response.data.message)?error.response.data.message : error.message );
                            })
                            
                        }}>
                            Login
                        </button>
                    </form>

                    <div className="mt-10 grid grid-cols-3 items-center text-gray-400">
                        
                    </div>

                  

                    <p className="mt-5 text-xs border-b border-gray-400 py-4">
                        <a href="#">Forgot Your password?</a>
                    </p>

                    <div className="mt-3 text-xs flex justify-between items-center">
                        <p>
                            <a href="#">If you don't have an account?</a>
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
        </div>
        </>
    );

}

export default Login