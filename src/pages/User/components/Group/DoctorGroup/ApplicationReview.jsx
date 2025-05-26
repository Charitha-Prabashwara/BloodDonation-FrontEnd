import {React, useState, useEffect} from 'react'
import API from "../../../../../api/api";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const ApplicationReview = ()=>{

    const accessToken = useSelector((state) => state.auth.accessToken);
    //const user = useSelector((state) => state.auth.user);
    

    useEffect(()=>{

    },[])
    return(
    <>
    </>
    )
}

export default ApplicationReview