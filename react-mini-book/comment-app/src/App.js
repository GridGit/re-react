import React from 'react';
// import logo from './logo.svg';
import './App.css';
import CommentApp from './CommentApp'
import Card from './Card'


function App() {
  return (
    <div className="App">
        <Card>
            <h2>React.js 小书</h2>
            <div>开源、免费、专业、简单</div>
            订阅：<input />
        </Card>        
        <CommentApp></CommentApp>
    </div>
  );
}

export default App;
