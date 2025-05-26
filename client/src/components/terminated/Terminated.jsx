import React, { useState } from 'react';
import WebLiveCapture from '../weblivecapture/WebLiveCapture';
import Terminated from './Terminated';

const ProctoringMain = () => {
  const [showTerminated, setShowTerminated] = useState(false);
  const [warningCnt, setWarningCnt] = useState(0);

  const handlePhoneDetected = () => {
    setWarningCnt((prev) => prev + 1);
    setShowTerminated(true);
  };

  const handleTabSwitch = () => {
    setWarningCnt((prev) => prev + 1);
    setShowTerminated(true);
  };

  const handleTerminate = () => {
    alert('Exam session terminated.');
    // Redirect or disable exam logic here
  };

  const handleContinue = () => {
    setShowTerminated(false);
    // Resume exam logic here
  };

  return (
    <div>
      {!showTerminated ? (
        <WebLiveCapture
          onPhoneDetected={handlePhoneDetected}
          onTabSwitch={handleTabSwitch}
        />
      ) : (
        <Terminated
          studentID="1902112"
          warningCnt={warningCnt}
          message="Phone Detected"
          onTerminate={handleTerminate}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
};

export default ProctoringMain;

