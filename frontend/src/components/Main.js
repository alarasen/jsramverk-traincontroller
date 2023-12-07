import React, { useState } from 'react';
import DelayTable from './DelayTable.js';
import Ticket from './Ticket.js';
import Map from './Map.js';

const Main = () => {
  const [selectedTrain, setSelectedTrain] = useState(null);

  const handleTrainClick = (train) => {
    setSelectedTrain(train);
  };

  return (
    <>
      {selectedTrain ? (
        <Ticket selectedTrain={selectedTrain} onBackClick={() => setSelectedTrain(null)} />
      ) : (
        <DelayTable onTrainClick={handleTrainClick} />
      )}
      <Map />
    </>
  );
}

export default Main;
