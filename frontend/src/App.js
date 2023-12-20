// import logo from './logo.svg';
import './App.css';
// import React, { useState } from 'react';

import Header from './components/Header';
import Adreess from './components/Adreess';

function App() {
  // const [getMessage, setGetMessage] = useState({})

  // useEffect(()=>{
  //   axios.get('http://127.0.0.1:5000/get-routes-risk-score').then(response => {
  //     console.log("SUCCESS", response)
  //     setGetMessage(response)
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // }, [])

  return (
    <div className="App">
      <Header/>
      <Adreess/>
    </div>
  );

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>React + Flask Tutorial</p>
  //       <div>{getMessage.status === 200 ? 
  //         <h3>{getMessage.data.message}</h3>
  //         :
  //         <h3>LOADING</h3>}</div>
  //     </header>
  //   </div>
  // );
}

export default App;