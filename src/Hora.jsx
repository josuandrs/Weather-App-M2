import { useState, useEffect } from 'react';
import "./Hora.css"

export default function Hora() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
        <div className='headSection4'>{currentDateTime.toLocaleTimeString()}</div>
        <div className='headSection5'>Today , {currentDateTime.toLocaleDateString()}</div>
    </div>
  )
}



