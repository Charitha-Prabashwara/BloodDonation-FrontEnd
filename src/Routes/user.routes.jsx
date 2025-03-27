import { BrowserRouter as UserBrowserRouter, Route, Routes } from 'react-router-dom';
function UserRouter() {
    return (
      <UserBrowserRouter>
          <Routes>
            <Route path="/user">    
               {/* <Route path="/" element={}/>  */}  
            </Route>
          </Routes>
      </UserBrowserRouter>
    )
  }
  export default UserRouter;