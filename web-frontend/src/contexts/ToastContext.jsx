import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
  }, []);

  const value = { showToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
        {toasts.map((t) => (
          <div key={t.id} style={{ background: '#fff', borderRadius: 8, padding: '10px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 8 }}>
            <div style={{ fontWeight: 600 }}>{t.type.toUpperCase()}</div>
            <div style={{ fontSize: 13 }}>{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
