import React, { useEffect, useRef } from "react";
import "./Loading.css";

const Loading = ({ load }) => {
  const overlayRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (overlayRef.current && loaderRef.current) {
      overlayRef.current.style.position = load ? "fixed" : "static";
      loaderRef.current.style.display = load ? "block" : "none";
    }
  }, [load]);

  return (
    <div id="loading-overlay" ref={overlayRef}>
      <div className="loader" ref={loaderRef}></div>
    </div>
  );
};

export default Loading;
