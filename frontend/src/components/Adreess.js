import React, { useState, useEffect } from 'react';
import APIService from './APIService';
import MapView from './MapView';

const Adreess = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [route, setRoute] =  useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
  }, [from, to]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    APIService.GetSafestRoute(from, to)
        .then(resp => {
            setRoute(resp.route);
            setShow(true);
        })
        .catch(error => {
            console.log(error);
            setShow(false);
        })
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <label>
            From:
            <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            />
        </label>
        <br /> <br />
        <label>
            To:
            <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            />
        </label>
        <br /> <br />
        <button type="submit" className="btn btn-success mt-3"> Get Route</button>
        </form>
        <br /> <br />
        {show && route && <MapView route={route} />}
    </div>
  );
};

export default Adreess;
