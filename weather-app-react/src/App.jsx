import React, { createElement, useState } from 'react'
import './index.css'
import Weather from './components/Weather';


const myComponent = () => {
  
  return (
    <div className='app'>
      <Weather />
    </div>

  );
}


export default myComponent;
