
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
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.fftSize = 256;

        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        const checkVolume = () => {
          analyserRef.current.getByteFrequencyData(dataArrayRef.current);
          const volume =
            dataArrayRef.current.reduce((sum, val) => sum + val, 0) / bufferLength / 255;

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
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [onSoundDetected, threshold]);
};

export default useVoiceDetection;
