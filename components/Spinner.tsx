import React from 'react';

export const Spinner = () => (
  <>
    <div className="w-12 h-12 border-4 border-accent border-solid border-t-transparent rounded-full animate-spin"></div>
    <style>{`
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      .animate-spin {
        animation: spin 1s linear infinite;
      }
    `}</style>
  </>
);
