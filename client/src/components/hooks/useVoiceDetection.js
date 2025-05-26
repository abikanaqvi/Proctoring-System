// hooks/useVoiceDetection.js
import { useEffect, useRef } from 'react';

const useVoiceDetection = (onSoundDetected, threshold = 0.1) => {
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const dataArrayRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    const startListening = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = audioContext;

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        sourceRef.current = source;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        dataArrayRef.current = dataArray;

        const checkVolume = () => {
          analyser.getByteFrequencyData(dataArray);
          const volume = dataArray.reduce((sum, val) => sum + val, 0) / bufferLength / 255;

          if (volume > threshold) {
            onSoundDetected();
          } else {
            rafIdRef.current = requestAnimationFrame(checkVolume);
          }
        };

        checkVolume();
      } catch (err) {
        console.error('Mic access error:', err);
      }
    };

    startListening();

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch((err) => {
          console.warn('AudioContext close error:', err);
        });
      }

      if (sourceRef.current?.mediaStream) {
        sourceRef.current.mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onSoundDetected, threshold]);
};

export default useVoiceDetection;

