// src/Labs/Lab3/FindIndex.tsx
import React from 'react';

const FindIndex: React.FC = () => {
  let numberArray1 = [1, 2, 4, 5, 6];
  let stringArray1 = ['string1', 'string3'];

  const fourIndex = numberArray1.findIndex(a => a === 4);
  const string3Index = stringArray1.findIndex(a => a === 'string3');

  return (
    <div>
      <h4>findIndex</h4>
      numberArray1: {numberArray1.toString()} <br />
      Index of 4: {fourIndex} <br />
      stringArray1: {stringArray1.toString()} <br />
      Index of 'string3': {string3Index} <br />
    </div>
  );
};

export default FindIndex;