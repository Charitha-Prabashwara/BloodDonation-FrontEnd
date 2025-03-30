import { useState, useEffect } from "react";
import './styles.css'
import loginImage from '../../assets/login.jpeg';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    useEffect(()=>{
        document.title='Login'
    },[])

    return (
        <section className="bg-red-500 min-h-screen flex items-center justify-center">
            <div className="bg-[#fdfefff5] flex rounded-2xl shadow-lg max-w-3xl p-4 ml-5 mr-5"> 
                <div className=" mt-8 sm:w-1/2 px-16">
                    <h2 className="mt-10 font-bold text-2xl text-[#4527a5] text-center">Login</h2>
                    <p className="text-sm mt-7 text-[#6c57b1] text-opacity-70 text-center">
                        If you already a member, easily log in
                    </p>

                    <form className="flex flex-col gap-4">
                        <input
                            className="p-2 mt-8 rounded-b-sm border border-gray-300"
                            type="text"
                            name="email"
                            placeholder="Your email"
                        />
                        <div className="relative">
                            <input
                                className="p-2 mt-0.5 rounded-b-sm border w-full  border-gray-300"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Your password"
                            />
                            <svg
                                onClick={() => setShowPassword(!showPassword)}
                                className="bi bi-eye-fill absolute top-1/4 right-4 translate-y-1/4 cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="red"
                                viewBox="0 0 16 16"
                            >
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                            </svg>
                        </div>
                        <button className="Login-button rounded-b-sm text-white py-2 bg-[#4527a5]">
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
                        <button className="py-2 px-8 bg-red-400 border rounded-xl border-0">Register</button>
                    </div>
                </div>

                <div className="sm:block hidden w-1/2">
                    <img className="sm:block hidden rounded-2xl" src={loginImage} alt="Login" />
                </div>
            </div>
        </section>
    );

}

export default Login