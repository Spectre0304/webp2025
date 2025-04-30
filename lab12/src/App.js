import React from 'react';
import './App.css';
import Button from '@mui/material/Button';  // 注意這裡的變更

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
  
  // 多按鈕產生函數
  const MultiButton = (num) => {
    var output = [];
    for(let i=1; i<num+1; ++i) {
      output.push(
        <Button 
          variant="contained"
          color="primary"
          onClick={changeText}
          key={i}
        >
          第{i}個按鍵
        </Button>
      );
    }
    return output;
  }
  
  return (
    <div className="App">
      <h1 style={styleArgument}>
        hello CGU!!
      </h1>
      <div className="button-container">
        {MultiButton(10)}
      </div>
    </div>
  );
}

export default App;