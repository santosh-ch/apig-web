import React from 'react';
import './App.scss';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer'

function App() {
  return (
    <div className="App">
      <Header />
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
