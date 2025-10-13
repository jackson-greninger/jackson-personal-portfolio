import React, { useState } from "react";

export const Modal = ({ children, onClose }) => {
  const [opaque, setOpaque] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpaque(!opaque); // toggle transparency on click
        }}
        style={{
          background: opaque ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.75)",
          padding: "2rem",
          borderRadius: "1rem",
          maxWidth: "900px",
          width: "90%",
          color: "white",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
          overflowY: "auto",
          maxHeight: "90vh",
          position: "relative",
          transition: "background 0.3s ease",
        }}
      >
        <button onClick={onClose} style={{ /* button styles */ }}>×</button>
        {children}
      </div>
    </div>
  );
};
