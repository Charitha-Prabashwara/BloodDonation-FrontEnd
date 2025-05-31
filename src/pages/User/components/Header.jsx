import {React, useState,useEffect} from "react";
import { useSelector } from 'react-redux';
import API from "../../../api/api";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { clearCredentials } from '../../../Redux/authSlice';

const Header = ()=>{
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [UserName, setUserName] = useState('');
  const [UserEmail, setUserEmail] = useState('')

  const logout = ()=>{
    API.post('/user/logout',{},{
      withCredentials:true,
      headers:{
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
    }).then(()=>{

      dispatch(clearCredentials());

    }).catch((error)=>{
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
    })
  }
  useEffect(()=>{

    setUserName(user.first_name + " " + user.last_name);
    setUserEmail(user.email)
  },[])
    return(
        <>
        {/* ========== HEADER ========== */}
<header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-white border-b border-gray-200 text-sm py-2.5 lg:ps-65 dark:bg-neutral-800 dark:border-neutral-700">
  <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
    <div className="me-5 lg:me-0 lg:hidden">
      {/* Logo */}
      <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="#" aria-label="Preline">
        Blood Link
      </a>
      {/* End Logo */}

      <div className="lg:hidden ms-1">

      </div>
    </div>

    <div className="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3">
      
      <div className="hidden md:block">
 
        {/* End Search Input */}
      </div>

      

      <div className="flex flex-row items-center justify-end gap-1">
      
      
      
        {/* Dropdown */}
        <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
          <button id="hs-dropdown-account" type="button" className="size-9.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none dark:text-white" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
            <img className="shrink-0 size-9.5 rounded-full" src="https://preline.co/assets/img/160x160/img1.jpg" alt="Avatar" />
          </button>

          <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-account">
            <div className="py-3 px-5 bg-gray-100 rounded-t-lg dark:bg-neutral-700">
              <p className="text-sm text-gray-500 dark:text-neutral-500">{UserName}</p>
              <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">{UserEmail}</p>
            </div>
            <div className="">

          
              <a className="flex items-center gap-x-3.5 py-3 px-4 font-bold rounded-b-md text-1xl bg-green-400 text-gray-200 hover:bg-green-500 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" onClick={()=>{
                logout()
              }}>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                Log out
              </a>
            </div>
          </div>
        </div>
        {/* End Dropdown */}
      </div>
    </div>
  </nav>
</header>
{/* ========== END HEADER ========== */}
        </>
    )
}

export default Header;