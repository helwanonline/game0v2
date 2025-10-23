
import React from 'react';

export const Spinner = ({ size = 'w-12 h-12' }: { size?: string }) => (
    <div className={`${size} border-4 border-accent border-solid border-t-transparent rounded-full animate-spin`}></div>
);
