import React from 'react';

import './spinner.css';

export default function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner" style={{width:"100%",height:"100%"}}>
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
      </div>
      <p>Loading...</p>
    </div>
  );
}
