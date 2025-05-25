import {React, useState, useEffect} from "react";
import API from "../../../../../api/api";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormState } from "react-dom";
const DonationApplication=()=>{
    const accessToken = useSelector((state) => state.auth.accessToken);
    //const user = useSelector((state) => state.auth.user);

    const [ saveBTNActive, setsaveBTNActive] = useState(false);
  
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [fullName, setfullName] = useState('');
    const [nameWithInitials, setnameWithInitials] = useState('');
    const [nic, setnic] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [gender, setgender] = useState('') 

    const [AdditionalInformation, setAdditionalInformation] = useState('');

    const [q1, setq1]  = useState(undefined);
    const [q2, setq2]  = useState(undefined);
    const [q3, setq3]  = useState(undefined);
    const [q4, setq4]  = useState(undefined);
    const [q5, setq5]  = useState(undefined);
    const [q6, setq6]  = useState(undefined);
    const [q7, setq7]  = useState(undefined);
    const [q8, setq8]  = useState(undefined);
    const [q9, setq9]  = useState(undefined);
    const [q10, setq10]  = useState(undefined);
    const [q11, setq11]  = useState(undefined);
    const [q12, setq12]  = useState(undefined);
    const [q13, setq13]  = useState(undefined);

    const [Birthday, setBirthday] = useState(undefined);
    const [BodyWeight, setBodyWeight] = useState(0);
    const [BodyHight, setBodyHight] = useState(0);

    const [bsaq1, setbsaq1] = useState(undefined);
    const [bsaq2, setbsaq2] = useState(undefined)
    const [APPI, setAPPI] = useState(undefined);

    const [AlreadyCreated, setAlreadyCreated] = useState(false);
    const [ApplicationFormVisible, setApplicationFormVisible] = useState(false);
    const [ApplicationHistoryVisible, setApplicationHistoryVisible] = useState(false);
    const [ApplicationHistory, setApplicationHistory] = useState([]);
    const [ApplicationReviewState, setApplicationReviewState] = useState(undefined);
    const [ApplicationNotState, setApplicationNotState] = useState(false);

    const formValidation = ()=>{
      
      if(
        q1==undefined||q2==undefined||q3==undefined||q4==undefined||q5==undefined||
        q6==undefined||q7==undefined||q8==undefined||q9==undefined||q10==undefined||
        q11==undefined||q12==undefined||q13==undefined || bsaq1 == undefined || bsaq2 == undefined
      ){
        toast.info('You must answer all the questions.')
        return false
      }

      const calculateAge = (birthDate)=> {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDifference = today.getMonth() - birth.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
          age--;
        }

        return age;
      }

      if(!Birthday){
        toast.info("Please enter your birthday")
        return false
      }else{
        if(calculateAge(Birthday) < 18){
          toast.info("Children's can't apply for Blood Donation")
          return false
        }
      }

      if(bsaq1 == false){
        toast.info("Only those who do not expect any benefit may apply.")
        return false
      }

      if(bsaq2 == false){
        toast.info("Ensure that all information is correct.")
        return false
      }
      return true      
    }
    
    const submitApplication = ()=>{

      if(!formValidation()){return}

      API.post('/application/create/',{
            additionalInfo:AdditionalInformation,
            q1:q1,
            q3:q2,
            q2:q3,
            q4:q4,
            q5:q5,
            q6:q6,
            q7:q7,
            q8:q8,
            q9:q9,
            q10:q10,
            q11:q11,
            q12:q12,
            q13:q13,
            birthday:Birthday,
            bodyHight:BodyHight,
            bodyWeight:BodyWeight
      },{
         headers:{
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
      }).then((response)=>{
        const responseData = response.data;
        const {message} = responseData;
        toast.success(message)
        loadSate();


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
      })

    }
    const loadSate = ()=>{

      API.get('/application/getSpecific/',
        {
          headers:{
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        }
        )

      .then((responseData)=>{
        const response = responseData.data.data;
        const {history} = response;
        if(history.length >0){
          const lastIndex = history.length -1
        
          if(history[lastIndex].status == 'created'){
            setApplicationReviewState(true)
            setApplicationNotState(true)
          }else if(history[lastIndex].status == 'rejected'){
            setApplicationNotState(false)
          }
          setApplicationHistory(history);
          setApplicationHistoryVisible(true);
        }else{
          setApplicationHistoryVisible(false);
        }
        //setApplicationNotState(true)
        // if(history){
        //   setApplicationHistoryVisible(true);
        // }else{
        //   setApplicationHistoryVisible(false);
        // }


      })
      .catch((error)=>{
        const response = error.response;
        const {status} = response 
        
        if(status ==404){
          setApplicationFormVisible(true);
        }

      })
      
    }

    const loadData = async()=>{
         API.get('/user/profile/',{
          headers:{
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        }).then((profileData)=>{

          console.log(profileData)
          const {first_name, last_name, full_name, name_with_initials, nic, phone_number, gender} = profileData.data.data;
          
          setfirstName(first_name);
          setlastName(last_name);
          setfullName(full_name);
          setnameWithInitials(name_with_initials);
          setnic(nic)
          setphoneNumber(phone_number),
          setgender(gender)
          

          setsaveBTNActive(true);
        }).catch((error)=>{
          // Handles API error and backend-down (network) errors
          setsaveBTNActive(false)
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
        loadSate()
        loadData()
    },[])

    return(
    <>
   
{ApplicationHistoryVisible && (
<>
 {/* Table Section */}
<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  {/* Card */}
  <div className="flex flex-col">
    <div className="-m-1.5 overflow-x-auto">
      <div className="p-1.5 min-w-full inline-block align-middle">
        <div className="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
            
            <div className="sm:col-span-2 md:grow">
              <div className="flex justify-end gap-x-2">
          

          
              </div>
            </div>
          </div>
          {/* End Header */}

          {/* Table */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>

                <th scope="col" className="px-6 py-3 text-start">
                  <div className="flex items-center gap-x-2">
                    <span className="text-xs font-semibold uppercase text-gray-800">
                      Date
                    </span>
                  </div>
                </th>

                <th scope="col" className="px-6 py-3 text-start">
                  <div className="flex items-center gap-x-2">
                    <span className="text-xs font-semibold uppercase text-gray-800">
                      Application Status
                    </span>
                  </div>
                </th>

               
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {ApplicationHistory.map((item)=>(
                <>
                  <tr>
        
    
                <td className="size-px whitespace-nowrap">
                  <div className="px-6 py-2">
                    <span className="text-sm text-gray-600">{item.created}</span>
                  </div>
                </td>

                <td className="size-px whitespace-nowrap">
                  <div className="px-6 py-2">
                    <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full">
                      <svg className="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                      </svg>
                      {item.status}
                    </span>
                  </div>
                </td>

               
              </tr>
                </>
              ))}
            
    
            </tbody>
          </table>
          {/* End Table */}

          {/* Footer */}
          
        </div>
      </div>
    </div>
  </div>
  {/* End Card */}
</div>
{/* End Table Section */}

</>
)}
{ApplicationReviewState && (
  <>
        <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800">
        The application is being reviewed.
      </h2>
      <p className="text-sm text-blue-600 mt-3 text-justify">
       Please wait for the doctors to review your application. You will be notified via email once it has been reviewed. If your application is rejected, you can reapply.
      </p>
    </div>
  </>
)}

{!ApplicationNotState && (
  <>
         <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800">
        Donation Application
      </h2>
      <p className="text-sm text-red-600 mt-3 text-justify">
        Filling out this questionnaire is essential to become a blood donor. You are eligible to donate blood only if the safety of both you and the recipient is ensured. It is your responsibility to provide accurate and truthful information. It is an offense to provide false information fraudulently and you may face legal issues.
      </p>
    </div>
        <form>
      {/* Section */}
      <div className="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
        <div className="sm:col-span-12">
          <h2 className="text-lg font-semibold text-gray-800">
            Personal Details
          </h2>
          <p className="text-sm text-red-600">
      The information you provide must be true and accurate, and providing false information is a crime.
      </p>
        </div>
        {/* End Col */}
        <div className="sm:col-span-3">
          <label htmlFor="af-account-full-name" className="inline-block text-sm text-gray-800 mt-2.5">
            First Name
          </label>
          <div className="hs-tooltip inline-block">
            <svg className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs" role="tooltip">
              Displayed on public forums, such as Preline
            </span>
          </div>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <div className="sm:flex">
            <input id="af-account-full-name" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg sm:text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
            disabled={true}
            value={firstName}
             />
            
          </div>
        </div>
        {/* End Col */}

                <div className="sm:col-span-3">
          <label htmlFor="af-account-full-name" className="inline-block text-sm text-gray-800 mt-2.5">
            Last name
          </label>
          <div className="hs-tooltip inline-block">
            <svg className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs" role="tooltip">
              Displayed on public forums, such as Preline
            </span>
          </div>
        </div>
        {/* End Col */}

        

        <div className="sm:col-span-9">
          <div className="sm:flex">
            <input id="af-account-full-name" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg sm:text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
            disabled={true}
            value={lastName}
             />
            
          </div>
        </div>
        {/* End Col */}

         <div className="sm:col-span-3">
          <label htmlFor="af-account-full-name" className="inline-block text-sm text-gray-800 mt-2.5">
            Full name
          </label>
          <div className="hs-tooltip inline-block">
            <svg className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs" role="tooltip">
              Displayed on public forums, such as Preline
            </span>
          </div>
        </div>
        {/* End Col */}

        

        <div className="sm:col-span-9">
          <div className="sm:flex">
            <input id="af-account-full-name" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg sm:text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
            disabled={true}
            value={fullName}
             />
            
          </div>
        </div>
        {/* End Col */}

                 <div className="sm:col-span-3">
          <label htmlFor="af-account-full-name" className="inline-block text-sm text-gray-800 mt-2.5">
            Name with initials
          </label>
          <div className="hs-tooltip inline-block">
            <svg className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs" role="tooltip">
              Displayed on public forums, such as Preline
            </span>
          </div>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <div className="sm:flex">
            <input id="af-account-full-name" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg sm:text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none"  
            disabled={true}
            value={nameWithInitials}
           />
           
          </div>
        </div>
        {/* End Col */}

                <div className="sm:col-span-3">
          <label htmlFor="af-account-full-name" className="inline-block text-sm text-gray-800 mt-2.5">
            NIC
          </label>
          <div className="hs-tooltip inline-block">
            <svg className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs" role="tooltip">
              Displayed on public forums, such as Preline
            </span>
          </div>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <div className="sm:flex">
            <input id="af-account-full-name" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg sm:text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            disabled={true}
            value={nic}
             />
            
          </div>
        </div>
        {/* End Col */}


        <div className="sm:col-span-3">
          <div className="inline-block">
            <label htmlFor="af-account-phone" className="inline-block text-sm text-gray-800 mt-2.5">
              Phone
            </label>
            <span className="text-sm text-gray-400">
              (Optional)
            </span>
          </div>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <div className="sm:flex">
            <input id="af-account-phone" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg sm:text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="+x(xxx)xxx-xx-xx" 
            disabled={true}
            value={phoneNumber}
            />
           
          </div>

 
        </div>
        {/* End Col */}

        <div className="sm:col-span-3">
          <label htmlFor="af-account-gender-checkbox" className="inline-block text-sm text-gray-800 mt-2.5">
            Gender
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <div className="sm:flex">
            <input id="af-account-phone" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg sm:text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="+x(xxx)xxx-xx-xx" 
            disabled={true}
            value={gender}
            />
           
          </div>

         
        </div>
        {/* End Col */}

      </div>
      {/* End Grid */}

        <div className="sm:col-span-9">
          <input id="af-submit-application-current-company" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
        </div>
        {/* End Col */}
    
      {/* End Section */}

      {/* Section */}
      <div className="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
        <div className="sm:col-span-12">
          <h2 className="text-lg font-semibold text-gray-800">
            Documents (Birth Certificate / National Identity Card)
          </h2>

          <p className="text-sm text-red-600">
       We need to verify your identity to provide quality and accurate service.
      </p>
        </div>
        {/* End Col */}

        <div className="sm:col-span-3">
          <label htmlFor="af-submit-application-resume-cv" className="inline-block text-sm font-medium text-gray-500 mt-2.5">
            Birth Certificate Copy
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <label htmlFor="af-submit-application-resume-cv" className="sr-only">Choose file</label>
          <input type="file" name="af-submit-application-resume-cv" id="af-submit-application-resume-cv" className="block w-full border border-gray-200 shadow-sm rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
            file:bg-gray-50 file:border-0
            file:bg-gray-100 file:me-4
            file:py-2 file:px-4
           " />
        </div>
        {/* End Col */}


        <div className="sm:col-span-3">
          <label htmlFor="af-submit-application-resume-cv" className="inline-block text-sm font-medium text-gray-500 mt-2.5">
            National identity card(front side)
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <label htmlFor="af-submit-application-resume-cv" className="sr-only">Choose file</label>
          <input type="file" name="af-submit-application-resume-cv" id="af-submit-application-resume-cv" className="block w-full border border-gray-200 shadow-sm rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
            file:bg-gray-50 file:border-0
            file:bg-gray-100 file:me-4
            file:py-2 file:px-4
           " />
        </div>
        {/* End Col */}


        <div className="sm:col-span-3">
          <label htmlFor="af-submit-application-resume-cv" className="inline-block text-sm font-medium text-gray-500 mt-2.5">
            National identity card(back side)
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <label htmlFor="af-submit-application-resume-cv" className="sr-only">Choose file</label>
          <input type="file" name="af-submit-application-resume-cv" id="af-submit-application-resume-cv" className="block w-full border border-gray-200 shadow-sm rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
            file:bg-gray-50 file:border-0
            file:bg-gray-100 file:me-4
            file:py-2 file:px-4
           " />
        </div>
        {/* End Col */}

        <div className="sm:col-span-3">
          <div className="inline-block">
            <label htmlFor="af-submit-application-bio" className="inline-block text-sm font-medium text-gray-500 mt-2.5">
              Additional Information(Optional)
            </label>
          </div>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <textarea id="af-submit-application-bio" className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" rows="6" placeholder="Other details regarding National Identity Cards and Birth Certificates."
          value={AdditionalInformation}
          onChange={(e)=>{
            setAdditionalInformation(e.target.value)
          }}></textarea>
        </div>
        {/* End Col */}
      </div>
      {/* End Section */}

       <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800">
        Please provide true and accurate information.
      </h2>
      <p className="text-sm text-red-600">
        Please note that this questionnaire is for the safety of both you, the blood donor, and those who receive the blood.
      </p>
      <p>
        Answer all questions.(yes/no)
      </p>
    </div>

      {/* Section */}
      <div className="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
        <div className="sm:col-span-12">
          
        </div>
        {/* End Col */}

        <div className="sm:col-span-8">
          <label htmlFor="af-submit-application-linkedin-url" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
            1. Have you ever been refused as a blood donor or told not to donate?
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-4">
          <ul className="flex flex-col sm:flex-row">
  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q1 === true}
        onClick={()=>{
          setq1(true)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
        Yes
      </label>
    </div>
  </li>

  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q1 === false}
        onClick={()=>{
          setq1(false)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
        No
      </label>
    </div>
  </li>


</ul>
        </div>
        {/* End Col */}

        <div className="sm:col-span-8">
          <label htmlFor="af-submit-application-twitter-url" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
            2. Have you ever had hepatitis B or C, HIV/AIDS, or syphilis?
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-4">
            <ul className="flex flex-col sm:flex-row">
  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q2===true}
        onClick={()=>{
          setq2(true)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
        Yes
      </label>
    </div>
  </li>

  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q2===false}
        onClick={()=>{
          setq2(false)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
        No
      </label>
    </div>
  </li>


</ul>
        </div>
        {/* End Col */}

        <div className="sm:col-span-8">
          <label htmlFor="af-submit-application-github-url" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
            3. Have you ever tested positive for any sexually transmitted infections (STIs)?
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-4">
          <ul className="flex flex-col sm:flex-row">
  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q3===true}
        onClick={()=>{
          setq3(true)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
        Yes
      </label>
    </div>
  </li>

  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q3===false}
        onClick={()=>{
          setq3(false)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
        No
      </label>
    </div>
  </li>


</ul>
        </div>
        {/* End Col */}

        <div className="sm:col-span-8">
          <label htmlFor="af-submit-application-portfolio-url" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
            4. Do you have or have you had any type of cancer?
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-4">
          <ul className="flex flex-col sm:flex-row">
  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q4===true}
        onClick={()=>{
          setq4(true)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
        Yes
      </label>
    </div>
  </li>

  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q4 === false}
        onClick={()=>{
          setq4(false)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
        No
      </label>
    </div>
  </li>


</ul>
        </div>
        {/* End Col */}

        <div className="sm:col-span-8">
          <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
            5. Have you ever had heart disease, heart attack, or high blood pressure?
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-4">
          <ul className="flex flex-col sm:flex-row">
  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q5===true}
        onClick={()=>{
          setq5(true)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
        Yes
      </label>
    </div>
  </li>

  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q5===false}
        onClick={()=>{
          setq5(false)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
        No
      </label>
    </div>
  </li>


</ul>
        </div>
        {/* End Col */}

        <div className="sm:col-span-8">
          <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
           6. Have you ever had a stroke or blood clotting disorder?
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-4">
          <ul className="flex flex-col sm:flex-row">
  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q6===true}
        onClick={()=>{
          setq6(true)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
        Yes
      </label>
    </div>
  </li>

  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q6===false}
        onChange={()=>{
          setq6(false)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
        No
      </label>
    </div>
  </li>


</ul>
        </div>
        {/* End Col */}

         <div className="sm:col-span-8">
          <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
           7. Do you have diabetes (Type 1 or 2)?
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-4">
              <ul className="flex flex-col sm:flex-row">
  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q7===true}
        onClick={()=>{
          setq7(true)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
        Yes
      </label>
    </div>
  </li>

  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={ q7===false}
        onClick={()=>{
          setq7(false)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
        No
      </label>
    </div>
  </li>


</ul>
        </div>
        {/* End Col */}


         <div className="sm:col-span-8">
          <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
           8. Do you have asthma or any respiratory conditions?
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-4">
         <ul className="flex flex-col sm:flex-row">
  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q8 === true}
        onClick={()=>{
          setq8(true)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
        Yes
      </label>
    </div>
  </li>

  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q8===false}
        onClick={()=>{
          setq8(false)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
        No
      </label>
    </div>
  </li>


</ul>
        </div>
        {/* End Col */}

        <div className="sm:col-span-8">
          <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
           9. Do you suffer from bleeding disorders (e.g., hemophilia)?
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-4">
          <ul className="flex flex-col sm:flex-row">
  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q9===true}
        onChange={()=>{
          setq9(true)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
        Yes
      </label>
    </div>
  </li>

  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q9===false}
        onChange={()=>{
          setq9(false)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
        No
      </label>
    </div>
  </li>


</ul>
        </div>
        {/* End Col */}

          <div className="sm:col-span-8">
          <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
           10. Have you ever used recreational or intravenous (IV) drugs?
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-4">
         <ul className="flex flex-col sm:flex-row">
  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q10===true}
        onChange={()=>{
          setq10(true)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
        Yes
      </label>
    </div>
  </li>

  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q10===false}
        onChange={()=>{
          setq10(false)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
        No
      </label>
    </div>
  </li>


</ul>
        </div>
        {/* End Col */}

           <div className="sm:col-span-8">
          <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
           11. Have you ever engaged in high-risk sexual behavior (e.g., multiple partners, unprotected sex)?
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-4">
         <ul className="flex flex-col sm:flex-row">
  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q11===true}
        onChange={()=>{
          setq11(true)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
        Yes
      </label>
    </div>
  </li>

  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q11===false}
        onChange={()=>{
          setq11(false)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
        No
      </label>
    </div>
  </li>


</ul>
        </div>
        {/* End Col */}


           <div className="sm:col-span-8">
          <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
          12. Do you have any allergies to latex, antiseptics, or medications?
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-4">
          <ul className="flex flex-col sm:flex-row">
  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q12===true}
        onChange={()=>{
          setq12(true)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
        Yes
      </label>
    </div>
  </li>

  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q12===false}
        onChange={()=>{
          setq12(false)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
        No
      </label>
    </div>
  </li>


</ul>
        </div>
        {/* End Col */}


           <div className="sm:col-span-8">
          <label htmlFor="af-submit-application-other-website" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
          13. Do you have any chronic illness not listed above?
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-4">
          <ul className="flex flex-col sm:flex-row">
  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q13===true}
        onChange={()=>{
          setq13(true)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
        Yes
      </label>
    </div>
  </li>

  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={q13===false}
        onChange={()=>{
          setq13(false)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
        No
      </label>
    </div>
  </li>


</ul>
        </div>
        {/* End Col */}

 
      </div>
      {/* End Section */}

      {/* Section */}
      <div className="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
        <div className="sm:col-span-12">
          <h2 className="text-lg font-semibold text-gray-800">
            Before sending your application, please let us know...
          </h2>
        </div>
        {/* End Col */}

        <div className="sm:col-span-3">
          <label htmlFor="af-submit-application-desired-salary" className="inline-block text-sm font-medium text-gray-500 mt-2.5">
            Birthday
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <input id="af-submit-application-desired-salary" type="date" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
          value={Birthday}
          onChange={(e)=>{
            setBirthday(e.target.value)
          }}/>
        </div>
        {/* End Col */}

        <div className="sm:col-span-3">
          <label htmlFor="af-submit-application-desired-salary" className="inline-block text-sm font-medium text-gray-500 mt-2.5">
            Body Hight(cm)
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <input id="af-submit-application-desired-salary" type="number" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
          value={BodyHight}
          onChange={(e)=>{
            setBodyHight(e.target.value)
          }}/>
        </div>
        {/* End Col */}


        <div className="sm:col-span-3">
          <label htmlFor="af-submit-application-desired-salary" className="inline-block text-sm font-medium text-gray-500 mt-2.5">
            Body Weight(Kg)
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <input id="af-submit-application-desired-salary" type="number" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
          value={BodyWeight}
          onChange={(e)=>{
            setBodyWeight(e.target.value)
          }}/>
        </div>
        {/* End Col */}


        <div className="sm:col-span-9">
          <label htmlFor="af-submit-application-desired-salary" className="inline-block text-sm font-medium text-gray-500 mt-2.5">
            Would you be willing to donate your blood, without any expectation of reward?
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-3">

            <ul className="flex flex-col sm:flex-row">
  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={bsaq1 === true}
        onChange={()=>{
          setbsaq1(true)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
        Yes
      </label>
    </div>
  </li>

  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={bsaq1 === false}
        onChange={()=>{
          setbsaq1(false)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
        No
      </label>
    </div>
  </li>


</ul>
        </div>
        {/* End Col */}

        <div className="sm:col-span-9">
          <label htmlFor="af-submit-application-desired-salary" className="inline-block text-sm font-medium text-gray-500 mt-2.5">
            I hereby certify that the above information and questions are true and correct.
          </label>
        </div>
        {/* End Col */}

        <div className="sm:col-span-3">

            <ul className="flex flex-col sm:flex-row">
  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-1" name="hs-horizontal-list-group-item-checkbox-1" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={bsaq2===true}
        onChange={()=>{
          setbsaq2(true)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-1" className="ms-3.5 block w-full text-sm text-gray-600">
        Yes
      </label>
    </div>
  </li>

  <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg">
    <div className="relative flex items-start w-full">
      <div className="flex items-center h-5">
        <input id="hs-horizontal-list-group-item-checkbox-2" name="hs-horizontal-list-group-item-checkbox-2" type="checkbox" className="border-gray-200 rounded-sm disabled:opacity-50" 
        checked={bsaq2===false}
        onChange={()=>{
          setbsaq2(false)
        }}/>
      </div>
      <label htmlFor="hs-horizontal-list-group-item-checkbox-2" className="ms-3.5 block w-full text-sm text-gray-600">
        No
      </label>
    </div>
  </li>


</ul>
        </div>
        {/* End Col */}

      </div>
      {/* End Section */}

      {/* Section */}
      <div className="py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          Submit application
        </h2>
        <p className="mt-3 text-sm text-gray-600">
          Please wait for your completed application to be reviewed by our doctors. If your application is approved, you will be notified via email. If it is rejected, you can reapply.
        </p>
       

        <div className="mt-5 flex">
          <input type="checkbox" className="shrink-0 mt-0.5 border-gray-300 rounded-sm text-blue-600 checked:border-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" id="af-submit-application-privacy-check" 
          checked={APPI===true}
          onChange={()=>{
            if(APPI=== false || APPI === undefined){
              setAPPI(true)
            }else{
              setAPPI(false)
            }
          }}/>
          <label htmlFor="af-submit-application-privacy-check" className="text-sm text-gray-500 ms-2">Allow us to process your personal information.</label>
        </div>
      </div>
      {/* End Section */}

      <button type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
      onClick={(e)=>{
        submitApplication()
      }}>
        Submit application
      </button>
    </form>
  </>
)}
 
    
    </>
    )
}

export default DonationApplication;