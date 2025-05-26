import React, { useRef, useEffect, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

import * as tf from '@tensorflow/tfjs';


import { detectPhoneOrMultiplePeople } from '../detection/detectObjects';
import useVoiceDetection from '../hooks/useVoiceDetection';

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: 'user',
};

const WebLiveCapture = ({ onTerminate }) => {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [terminated, setTerminated] = useState(false);
  const [terminationReason, setTerminationReason] = useState('');

  // Load COCO-SSD model
  useEffect(() => {
    cocoSsd.load().then((loadedModel) => {
      setModel(loadedModel);
      console.log('COCO-SSD model loaded');
    });
  }, []);

  // Terminate session
  const terminateSession = useCallback((reason) => {
    setTerminated(true);
    setTerminationReason(reason);
    if (onTerminate) onTerminate();

    // Stop webcam
    const stream = webcamRef.current?.video?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    console.warn('Session terminated:', reason);
  }, [onTerminate]);

  // Check for violations (phone, multiple people)
  const checkForViolations = useCallback(async () => {
    const video = webcamRef.current?.video;
    if (!video || !model || video.readyState !== 4 || terminated) return;

    const { phoneDetected, multiplePeople } = await detectPhoneOrMultiplePeople(video, model);

    if (phoneDetected) {
      terminateSession('Phone detected in webcam feed.');
    } else if (multiplePeople) {
      terminateSession('Multiple people detected in webcam feed.');
    }
  }, [model, terminated, terminateSession]);

  // Repeated object detection
  useEffect(() => {
    if (!model || terminated) return;

    const interval = setInterval(() => {
      checkForViolations();
    }, 3000);

    return () => clearInterval(interval);
  }, [model, checkForViolations, terminated]);

  // Detect tab switch
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !terminated) {
        terminateSession('Tab switch detected.');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [terminated, terminateSession]);

  // Voice detection
  useVoiceDetection(() => {
    if (!terminated) {
      terminateSession('Voice detected during the test.');
    }
  });

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {!terminated ? (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          width={320}
          height={180}
        />
      ) : (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'black',
            color: 'white',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '2rem',
            textAlign: 'center',
            padding: '2rem'
          }}
        >
          <h1>⚠️ Test Terminated</h1>
          <p>{terminationReason}</p>
        </div>
      )}
    </div>
  );
};

export default WebLiveCapture;

