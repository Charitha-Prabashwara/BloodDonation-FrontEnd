import { BrowserRouter as AssistantRouterBrowserRouter, Route, Routes } from 'react-router-dom';
function AssistantRouter() {
    return (
      <AssistantRouterBrowserRouter>
          <Routes>
            <Route path="/assistant">    
               {/* <Route path="/" element={}/>  */}  
            </Route>
          </Routes>
      </AssistantRouterBrowserRouter>
    )
  }
  export default AssistantRouter;