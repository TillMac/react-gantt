import { useState, useEffect } from 'react';

const useContextMenu = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [points, setPoints] = useState<Record<'x'| 'y', number>>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const clickHandler = () => {
      setIsClicked(false);
    };
    document.addEventListener('click', () => setIsClicked(false));
    return () => {
      document.removeEventListener('click', clickHandler);
    }
  }, []);
  
  return {
    isClicked,
    setIsClicked,
    points,
    setPoints,
  }
}

export default useContextMenu;
