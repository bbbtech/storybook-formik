import React, { CSSProperties } from 'react';

const trafficLightStyle: CSSProperties = {
  display: 'inline-block',
  marginLeft: '4px',
  width: '10px',
  height: '10px',
  borderRadius: '50%',
};

const booleanStateStyle: { [key: string]: CSSProperties } = {
  wrapper: {
    padding: '4px 16px',
    border: '2px solid neon',
  },
  trafficLightTrue: {
    ...trafficLightStyle,
    backgroundColor: '#13bc86',
  },
  trafficLightFalse: {
    ...trafficLightStyle,
    backgroundColor: '#ff4d4d',
  },
};

export const BooleanState = ({
  name,
  value,
}: {
  name: string;
  value?: boolean;
}) => (
  <div style={booleanStateStyle.wrapper}>
    {name}
    <span
      style={
        value === undefined
          ? {}
          : value === true
          ? booleanStateStyle.trafficLightTrue
          : booleanStateStyle.trafficLightFalse
      }
    >
      {value === undefined && '?'}
    </span>
  </div>
);
