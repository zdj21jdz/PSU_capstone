import React from 'react';
import ReactDOM from 'react-dom';

// Pages
import App from './App';

// CSS
import './bootstrap.min.css';

ReactDOM.render(
    <App />,
    document.getElementById('root'),
    () => console.log('component Mounted!!')
);