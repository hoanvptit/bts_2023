import { useState, useEffect } from 'react';
// wait to done input then search
function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(handler);
  }, [value]);
  return debounceValue;
}

export default useDebounce;
