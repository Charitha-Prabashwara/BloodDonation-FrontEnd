import React from "react";
const HtmlRenderer = () => {
    return (
      <iframe
        src="/aboutus/index.html"
        style={{ width: '100%', height: '100vh', border: 'none' }}
        title="HTML Renderer"
      />
    );
  };
function AboutUs(){
    return(
      <>
      <HtmlRenderer />
      </> 
    )
}

export default AboutUs;