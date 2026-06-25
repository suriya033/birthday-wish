import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import ParticleTrail from './components/ParticleTrail';
import Stage1 from './components/Stage1';
import Stage2 from './components/Stage2';
import Stage3 from './components/Stage3';
import './App.css';

function App() {
  const [stage, setStage] = useState(1);

  return (
    <>
      <CustomCursor />
      <ParticleTrail />
      
      <AnimatePresence mode="wait">
        {stage === 1 && (
          <Stage1 key="stage1" onSuccess={() => setStage(2)} />
        )}
        {stage === 2 && (
          <Stage2 key="stage2" onOpen={() => setStage(3)} />
        )}
        {stage === 3 && (
          <Stage3 key="stage3" />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
