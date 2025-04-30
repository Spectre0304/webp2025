import React from 'react';
import './App.css';

function App() {
  // 定義樣式
  const styleArgument = { 
    fontSize: '100px', 
    color: 'red' 
  };
  
  // 定義點擊事件處理函數
  const changeText = (event) => {
    console.log(event.target);
    event.target.innerText = event.target.innerText + "被點了";
  }
  
  return (
    <div className="App">
      <h1 style={styleArgument} onClick={changeText}>
        hello CGU!!
      </h1>
    </div>
  );
}

export default App;