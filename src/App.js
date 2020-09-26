import React, { useState } from "react";
import ReactDOM from "react-dom";
import api from "./key";

function App() {
  const output = document.getElementsByClassName("output__true");
  const x = document.getElementsByClassName("no__result");
  const output__audio = document.getElementsByClassName('output__audio');
  console.log(output__audio);

  const [word, setword] = useState("");
  const [op, setop] = useState("");
  const [err, seterror] = useState("");
  const [scode,setscode] = useState('');



  
  const handle = (e) => {
    console.log(e.target.value);
    setword(e.target.value);
  };
  const handlesearch = () => {
    console.log(word);
    setword(" ");

    let url = `https://www.dictionaryapi.com/api/v3/references/sd3/json/${word}?key=${api}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.length) {
          console.log("Not Found");
          setop("No result found");
          document.getElementById("suggestion").style.display = "none";
          // output__audio.style.display = "none";
          return;
        } else if (data.length) {
          if (typeof data[0] == "string") {
            console.log(typeof data[0]);
            setop("Did You mean ?");
            document.getElementById("suggestion").style.display = "block";

            for (let i = 0; i <= data.length - 1; i++) {
              var para = document.createElement("span");
              var t = document.createTextNode(data[i]);
              para.appendChild(t);
              document.getElementById("suggestion").appendChild(para);
              // output__audio.style.display = "none";

            }
          } else {
            // console.log(typeof(data[0]))
            document.getElementById("suggestion").style.display = "none";


            console.log("Definition",data[0].hwi.prs[0].sound.audio);

            setop(data[0].shortdef);
            let sn = data[0].hwi.prs[0].sound.audio;
            let sub = sn.charAt(0);
            let sc = `https://media.merriam-webster.com/soundc11/${sub}/${sn}.wav?key=${api}`;
            console.log(sc);
            setscode(sc);
          }
        }

      });
  };

  return (
    <div className="App">
      <div className="parent">
        <h2> ReactJS Dictionary App </h2>
        <div className="wrap">
          <input
            type="text"
            placeholder="Enter word"
            onChange={handle}
            value={word}
            required='true'
          />
          <button onClick={handlesearch} disabled={!word}> Search </button>
        </div>
        <div className="output">
          <span className="output__true"> {op} </span>
         
          <div className="no__result">{err} </div>
          <div id="suggestion"></div>
          <div className="output__audio">
            <audio src={scode} controls='true' className=""></audio>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
