import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  overflow-x: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(76, 175, 80, 0.1) 0%, transparent 40%);
    pointer-events: none;
  }
`;

const Title = styled(motion.h1)`
  color: white;
  margin-bottom: 20px;
  font-size: 3.5rem;
  text-shadow: 0 0 10px rgba(255,107,107,0.5);
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #ff6b6b, transparent);
  }
`;

const ArrayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
  margin: 20px 0;
  width: 100%;
  max-width: 1200px;
`;

const ArrayRow = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 20px;
  position: relative;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);

  &::before {
    content: "${props => props.label}";
    position: absolute;
    left: -150px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 16px;
    width: 130px;
    text-align: right;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const SubArray = styled(motion.div)`
  display: flex;
  gap: 4px;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &::after {
    content: "";
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 2px solid rgba(255,107,107,0.5);
    border-top: 2px solid rgba(255,107,107,0.5);
    width: 20px;
    height: 20px;
    display: ${props => props.showConnector ? 'block' : 'none'};
  }
`;

const ArrayBar = styled(motion.div)`
  width: 35px;
  background: ${props => `linear-gradient(to top, ${props.color}, ${props.color}CC)`};
  margin: 0 2px;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transform-origin: bottom;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    filter: brightness(1.2);
    transform: scaleY(1.05);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 0 0 5px 5px;
  }
`;

const BarValue = styled(motion.span)`
  position: absolute;
  top: -25px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(0,0,0,0.5);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin: 20px 0;
`;

const Button = styled(motion.button)`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  color: white;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255,107,107,0.4);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255,107,107,0.6);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StepIndicator = styled(motion.div)`
  color: white;
  font-size: 18px;
  margin: 15px 0;
  padding: 20px 40px;
  background: rgba(255,255,255,0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: translateX(-100%);
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`;

// Add these animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const rowVariants = {
  hidden: { 
    opacity: 0, 
    x: -100 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const barVariants = {
  hidden: { scaleY: 0 },
  visible: { 
    scaleY: 1,
    transition: { 
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
};

// Add these new animation variants
const titleVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

const buttonVariants = {
  hover: { 
    scale: 1.05,
    boxShadow: "0px 8px 25px rgba(255,107,107,0.6)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { 
    scale: 0.95,
    boxShadow: "0px 4px 15px rgba(255,107,107,0.4)"
  }
};

// Update the component to include initial and final arrays
const MergeSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const generateArray = () => {
    const newArray = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 200) + 10
    );
    setArray(newArray);
    setSteps([{
      type: 'initial',
      arrays: [[{ array: newArray, color: '#ff6b6b' }]],
      description: 'Initial Array'
    }]);
    setCurrentStep(0);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const mergeSortWithVisualization = async (arr, depth = 0) => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // Show division step
    setSteps(prev => [...prev, {
      type: 'divide',
      arrays: [
        [{ array: left, color: '#ffd700' }, { array: right, color: '#4caf50' }]
      ],
      description: `Dividing array into [${left.join(',')}] and [${right.join(',')}]`
    }]);
    setCurrentStep(prev => prev + 1);
    await sleep(1000);

    const sortedLeft = await mergeSortWithVisualization(left, depth + 1);
    const sortedRight = await mergeSortWithVisualization(right, depth + 1);
    const merged = await merge(sortedLeft, sortedRight);

    // Show merge step
    setSteps(prev => [...prev, {
      type: 'merge',
      arrays: [[{ array: merged, color: '#ff6b6b' }]],
      description: `Merging [${sortedLeft.join(',')}] and [${sortedRight.join(',')}] into [${merged.join(',')}]`
    }]);
    setCurrentStep(prev => prev + 1);
    await sleep(1000);

    return merged;
  };

  const merge = async (left, right) => {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      await sleep(500);
      if (left[i] <= right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }

      // Show comparison step
      setSteps(prev => [...prev, {
        type: 'compare',
        arrays: [[{ array: [...result, ...left.slice(i), ...right.slice(j)], color: '#9c27b0' }]],
        description: `Comparing and merging elements`
      }]);
      setCurrentStep(prev => prev + 1);
    }

    return [...result, ...left.slice(i), ...right.slice(j)];
  };

  const startSorting = async () => {
    setSorting(true);
    setSteps([{
      type: 'initial',
      arrays: [[{ array: [...array], color: '#ff6b6b' }]],
      description: 'Starting merge sort'
    }]);
    setCurrentStep(0);
    await mergeSortWithVisualization([...array]);
    setSorting(false);
  };

  return (
    <Container>
      <Title
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        Merge Sort Visualizer
      </Title>
      
      <ButtonContainer>
        <Button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={generateArray}
          disabled={sorting}
        >
          Generate New Array
        </Button>
        <Button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={startSorting}
          disabled={sorting}
        >
          Start Sorting
        </Button>
      </ButtonContainer>

      <AnimatePresence mode="wait">
        {steps[currentStep] && (
          <StepIndicator
            key={currentStep}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            {steps[currentStep].description}
          </StepIndicator>
        )}
      </AnimatePresence>

      <ArrayContainer>
        {/* Initial Array - Always visible */}
        <ArrayRow
          label="Initial Array"
          variants={rowVariants}
          initial="hidden"
          animate="visible"
        >
          <SubArray>
            {array.map((value, idx) => (
              <ArrayBar
                key={idx}
                color="#ff6b6b"
                style={{ height: `${value}px` }}
                variants={barVariants}
                initial="hidden"
                animate="visible"
              >
                <BarValue>{value}</BarValue>
              </ArrayBar>
            ))}
          </SubArray>
        </ArrayRow>

        {/* Current Operation Arrays */}
        {steps[currentStep]?.arrays.map((level, levelIndex) => (
          <ArrayRow
            key={levelIndex}
            label={steps[currentStep].type}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
          >
            {level.map((subArray, subArrayIndex) => (
              <SubArray
                key={subArrayIndex}
                showConnector={levelIndex > 0}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {subArray.array.map((value, idx) => (
                  <ArrayBar
                    key={idx}
                    color={subArray.color}
                    style={{ height: `${value}px` }}
                    variants={barVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <BarValue>{value}</BarValue>
                  </ArrayBar>
                ))}
              </SubArray>
            ))}
          </ArrayRow>
        ))}

        {/* Final Sorted Array - Show when sorting is complete */}
        {!sorting && steps.length > 1 && (
          <ArrayRow
            label="Final Array"
            variants={rowVariants}
            initial="hidden"
            animate="visible"
          >
            <SubArray>
              {array.sort((a, b) => a - b).map((value, idx) => (
                <ArrayBar
                  key={idx}
                  color="#4caf50"
                  style={{ height: `${value}px` }}
                  variants={barVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <BarValue>{value}</BarValue>
                </ArrayBar>
              ))}
            </SubArray>
          </ArrayRow>
        )}
      </ArrayContainer>
    </Container>
  );
};

export default MergeSortVisualizer;