import React from "react";
const HtmlRenderer = () => {
    return (
      <iframe
        src="/register/register.html"
        style={{ width: '100%', height: '100vh', border: 'none' }}
        title="HTML Renderer"
      />
    );
  };
function Register(){
    return(
      <>
      <HtmlRenderer />
      </> 
    )
}

export default Register;