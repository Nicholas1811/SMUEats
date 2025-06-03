import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import AccountMenu  from './components/navbar';

function randomPicker(){
    const imageArray = [
    'https://eatbook.sg/wp-content/uploads/2020/09/Onalu-feature-image.jpg',
    'https://eatbook.sg/wp-content/uploads/2023/08/kuro-kare-flatlay.jpg',
    'https://eatbook.sg/wp-content/uploads/2020/03/Canteen-Bistro-Three-dishes-intro-shot.jpg'
  ];
  let randomIndex = Math.floor(Math.random() * imageArray.length)
  return imageArray[randomIndex];
}

function App() {
  const randomImage = randomPicker();
  const styleimg = {
    height : '100px',
    width : '120px'
  };
  const style = {
    height: '100%',
    width: '100%'
  }
  return (
    <div className="App">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <AccountMenu></AccountMenu>
      <header style = {{backgroundColor : '#f2f3f4'}}>
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button variant = 'contained'>Hello!!</Button> */}
        
        <div style = {styleimg}>
          <img src = {randomImage} style = {style}/>
        </div>
      </header>
    </div>
  );
}

export default App;
