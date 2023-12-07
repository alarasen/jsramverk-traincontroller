import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [currentTime]);

  return (
    <>
      <p className="currentTime"><Link to="/" className="link">{currentTime.toLocaleTimeString('sv-SE')}</Link></p>
    </>
  );
}

export default Clock;
