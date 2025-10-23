
import React from 'react';

export const GameCardSkeleton = () => (
  <div className="bg-secondary rounded-xl overflow-hidden shadow-lg flex flex-col">
    <div className="relative w-full aspect-square overflow-hidden bg-gray-700">
       <div className="shimmer-wrapper">
         <div className="shimmer"></div>
       </div>
    </div>
    <div className="p-3 flex flex-col flex-grow">
      <div className="h-5 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
      <div className="flex gap-1 mb-3">
        <div className="h-4 bg-gray-700 rounded-full w-12"></div>
        <div className="h-4 bg-gray-700 rounded-full w-14"></div>
      </div>
      <div className="mt-auto">
        <div className="h-10 bg-gray-700 rounded-lg w-full"></div>
      </div>
    </div>
    <style>{`
        .shimmer-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .shimmer {
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0);
            background: linear-gradient(to right, 
                rgba(255, 255, 255, 0) 0%, 
                rgba(255, 255, 255, 0.08) 50%, 
                rgba(255, 255, 255, 0) 100%);
            animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
            0% {
                transform: translateX(-100%);
            }
            100% {
                transform: translateX(100%);
            }
        }
    `}</style>
  </div>
);