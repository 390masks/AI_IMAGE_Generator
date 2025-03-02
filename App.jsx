import axios from 'axios';
import React, { useState } from 'react'

const App = () => {
  const [prompt,setPrompt]=useState("");
  const[image,setImage]=useState(null);
  const[loading,setLoading]=useState(false);

  const generateImage = async()=>{
    if(!prompt)return alert("Please enter a prompt!...")
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: prompt,  // User input for image generation
          n: 1,            // Number of images to generate (1 in this case)
          size: "512x512", // Image resolution
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );
      setImage(response.data.data[0].url); // Store generated image URL
  } catch (error) {
    console.error("Error generating image:", error);
  }

  setLoading(false);
  };
  return (
    <div>
      <h1>AI Image Generator</h1>
      <input type="text" 
      placeholder='Enter your Prompt...'
      value={prompt}
      onChange={(e)=>setPrompt(e.target.value)}/>
      <button onClick={generateImage}>
        Generate</button>
        {loading && <p>Generating image...</p>}

        {image &&(
          <div>
          <img src={image} alt="Generated"  />
          <br />
          <a href={image} download="generated-image.jpg">
            Download Image
          </a>
          </div>
        )}
    </div>
  )
}

export default App
