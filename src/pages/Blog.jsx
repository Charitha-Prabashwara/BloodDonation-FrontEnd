import React from "react";
const HtmlRenderer = () => {
    return (
      <iframe
        src="/blog/index.html"
        style={{ width: '100%', height: '100vh', border: 'none' }}
        title="HTML Renderer"
      />
    );
  };
function Blog(){
    return(
      <>
      <HtmlRenderer />
      </> 
    )
}

export default Blog;