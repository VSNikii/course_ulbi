import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

import { NavBar } from './components/UI/NavBar/NavBar';

import { AppRouter } from './components/AppRouter';

function App() {
  let [path, setPath] = useState('/posts');


  return (
    <>
      <BrowserRouter>
        <NavBar path={path} setPath={setPath} />
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
