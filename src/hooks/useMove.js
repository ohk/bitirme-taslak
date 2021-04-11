import React, { useState } from "react";

const useMove = () => {
  const [state, setState] = useState({ x: 0, y: 0 });
  const [data, setData] = useState([{ x: 0, y: 0 }]);

  const handleMouseMove = (e, path) => {
    e.persist();
    setState((state) => ({ ...state, x: e.clientX, y: e.clientY }));
    setData([...data, { path: path, x: e.clientX, y: e.clientY }]);
  };
  console.log(data);
  return {
    x: state.x,
    y: state.y,
    data,
    setData,
    handleMouseMove,
  };
};
export default useMove;
