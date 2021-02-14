import { useState, useEffect } from 'react';

const getOrientation = () => {
  if (window && window.screen && window.screen.orientation) {
    return window?.screen?.orientation?.type;
  }
  const height = document.getElementById('root')?.clientHeight ?? 0;
  const width = document.getElementById('root')?.clientWidth ?? 0;
  return height > width ? 'portrait' : 'landscape';
};

const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState(getOrientation());

  const updateOrientation = (event) => {
    setOrientation(getOrientation());
  };

  useEffect(() => {
    window?.addEventListener('orientationchange', updateOrientation);
    return () => {
      window?.removeEventListener('orientationchange', updateOrientation);
    };
  }, []);

  return orientation;
};

export default useScreenOrientation;
