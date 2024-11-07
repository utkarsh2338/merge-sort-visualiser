import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Bar = styled(motion.div)`
  margin: 0 1px;
  border-radius: 3px 3px 0 0;
  transition: background-color 0.3s ease;
`;

const BarValue = styled(motion.div)`
  font-size: 10px;
  color: white;
  text-align: center;
  padding-top: 5px;
`;

const ArrayBar = ({ value, height, color, isComparing, isSorted }) => {
  const getBarColor = () => {
    if (isComparing) return '#ffd700';
    if (isSorted) return '#4caf50';
    return color || '#ff6b6b';
  };

  return (
    <Bar
      initial={{ height: 0 }}
      animate={{ 
        height: `${height}px`,
        backgroundColor: getBarColor()
      }}
      transition={{ duration: 0.5 }}
      style={{
        width: '20px',
      }}
    >
      <BarValue
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {value}
      </BarValue>
    </Bar>
  );
};

export default ArrayBar;