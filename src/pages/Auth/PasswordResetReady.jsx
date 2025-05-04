import { useEffect } from "react";
import API from '../../api/api'
import './styles.css'


const PasswordResetReady = () => {
    
    useEffect(()=>{
        document.title='Register'

    }, [])

    return (
        <section className="bg-blue-200 min-h-screen flex items-center justify-center">
        <div className="bg-[#fdfefff5] flex flex-col items-center rounded-2xl shadow-lg max-w-3xl p-8 ml-5 mr-5 text-center">
          
            <h2 className="text-2xl font-bold text-[#4527a5] mb-4">
                Password Reset Email Sent your  Email address
            </h2>
            <p className="text-lg text-gray-700">
                Your account has been created. Please check your email and verify your account to continue.
            </p>
            
        </div>
    </section>
    );

}

export default PasswordResetReady