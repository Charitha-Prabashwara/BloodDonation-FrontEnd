import { BrowserRouter as DonorBrowserRouter, Route, Routes } from 'react-router-dom';
function DonorRouter() {
    return (
      <DonorBrowserRouter>
          <Routes>
            <Route path="/donor">    
               {/* <Route path="/" element={}/>  */}  
            </Route>
          </Routes>
      </DonorBrowserRouter>
    )
  }
  export default DonorRouter;