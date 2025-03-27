import { BrowserRouter as DoctorBrowserRouter, Route, Routes } from 'react-router-dom';
function DoctorRouter() {
    return (
      <DoctorBrowserRouter>
          <Routes>
            <Route path="/doctor">    
               {/* <Route path="/" element={}/>  */}  
            </Route>
          </Routes>
      </DoctorBrowserRouter>
    )
  }
  export default DoctorRouter;