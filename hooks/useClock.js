import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to provide real-time clock values.
 * Uses requestAnimationFrame for ultra-smooth luxury animations.
 */
export function useClock() {
  const [time, setTime] = useState(new Date());
  const requestRef = useRef();

  const animate = (timestamp) => {
    setTime(new Date());
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  // Calculate degrees with sub-second precision for smoothness
  const secondDeg = (seconds + milliseconds / 1000) * 6;
  const minuteDeg = (minutes + seconds / 60) * 6;
  const hourDeg = ((hours % 12) + minutes / 60) * 30;

  return {
    time,
    hours,
    minutes,
    seconds,
    milliseconds,
    hourDeg,
    minuteDeg,
    secondDeg,
    // Add subdial movements (e.g. 24h, day of week, etc. if needed)
    sub24hDeg: (hours + minutes / 60) * 15, // 360 / 24
    subSecondDeg: (seconds + milliseconds / 1000) * 360, // Full rotation every second
  };
}
