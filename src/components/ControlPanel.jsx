import React from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  background: ${props => props.theme.gradients.primary};
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${props => props.disabled ? 0.6 : 1};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Slider = styled.input`
  width: 200px;
  margin: 0 1rem;
`;

const ControlPanel = ({ 
  onGenerate, 
  onSort, 
  onSpeedChange, 
  onSizeChange,
  sorting,
  speed,
  size 
}) => {
  return (
    <Panel>
      <Button onClick={onGenerate} disabled={sorting}>
        Generate New Array
      </Button>
      <Button onClick={onSort} disabled={sorting}>
        Start Sorting
      </Button>
      <div>
        <label style={{ color: 'white', marginRight: '10px' }}>Speed:</label>
        <Slider 
          type="range" 
          min="1" 
          max="100" 
          value={speed} 
          onChange={onSpeedChange}
          disabled={sorting}
        />
      </div>
      <div>
        <label style={{ color: 'white', marginRight: '10px' }}>Size:</label>
        <Slider 
          type="range" 
          min="5" 
          max="100" 
          value={size} 
          onChange={onSizeChange}
          disabled={sorting}
        />
      </div>
    </Panel>
  );
};

export default ControlPanel;