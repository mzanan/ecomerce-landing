import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ 
  text, 
  disabled = false, 
  speed = 2, 
  className = '' 
}) => {
  return (
    <span
      className={`inline-block bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent bg-[length:200%_100%] ${
        !disabled ? 'animate-shine' : ''
      } ${className}`}
      style={{
        animationDuration: `${speed}s`,
        backgroundImage: 'linear-gradient(90deg, #9ca3af 0%, #ffffff 50%, #9ca3af 100%)',
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText; 