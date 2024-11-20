import React , {useState} from 'react';
import axios from 'axios';

export default function SunireGPT() {

    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const HTTP= "http://localhost:8020/chat";
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${HTTP}`, {prompt})
            .then((res) => {
                setResponse(res.data);
                console.log(prompt);
                console.log("Response:", res.data);
            })
            .catch((error) => {
                console.log(error);
            });

        setPrompt("");
    };
    const handlePrompt = (e) => setPrompt(e.target.value);
    /*return ( 
    <div className = "container container-sm p-1">
        <h1 className="title text-center text-darkGreen">LLM</h1>
        <from className="form" onSubmit={handleSubmit}>
            <div className='form' onSubmit={handleSubmit}>
                <label htmlFor="">Ask questions</label>
                <input type="text" 
                className="shadow-sm" 
                placeholder="Enter text" 
                value={prompt}
                onChange={handlePrompt}
                />
            </div>
        </from>
        <div className="bg-darkGreen mt-2 p-1 border-5">
            <p className="text-light">
                {response ? response : "Skin Cancer related awns..."}
            </p>
        </div>
    </div>);*/

    return (
        <div className="container container-sm p-1">
          {" "}
          <h1 className="title text-center text-darkGreen">ChatGPT API</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <a href="">Link</a>
              <label htmlFor="">Ask questions</label>
              <input
                className="shadow-sm"
                type="text"
                placeholder="Enter text"
                value={prompt}
                onChange={handlePrompt}
              />
            </div>{" "}
            {/* <button className="btn btn-accept w-100" type="submit">
              Go
            </button> */}
          </form>
          <div className="bg-darkGreen  mt-2 p-1 border-5">
            <p className="text-light">
              {response ? response : "Skin cancer related awns go here..."}
            </p>
          </div>
        </div>
      );
    
}
