import { useEffect } from 'react';
import { useRef } from 'react';

const useUnload = func => {
  const callback = useRef(func);

  useEffect(() => {
    const unloadHandler = callback.current;
    window.addEventListener('beforeunload', unloadHandler);

    return () => {
      window.removeEventListener('beforeunload', unloadHandler);
    };
  }, [callback]);
};

export default useUnload;
//use case useUnload(function to be executed when page unloads)
