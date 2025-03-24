import React from "react";
const HtmlRenderer = () => {
    return (
      <iframe
        src="/home/index.html"
        style={{ width: '100%', height: '100vh', border: 'none' }}
        title="HTML Renderer"
      />
    );
  };
function Home(){
    return(
      <>
      <HtmlRenderer />
      </> 
    )
}

export default Home;