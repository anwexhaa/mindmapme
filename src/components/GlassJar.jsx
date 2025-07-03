import React from "react";

const GlassJar = ({ level = 50, color = "bg-purple-300", label = "Mood" }) => {
  // Ensure level stays between 0-100
  const safeLevel = Math.min(100, Math.max(0, level));
  
  return (
    <div className="flex flex-col items-center">
      {/* Jar Label */}
      <span className="text-sm font-medium text-gray-600 mb-1">{label}</span>
      
      {/* Jar Container */}
      <div className="relative w-20 h-32">
        {/* Jar Outline */}
        <div className="absolute inset-0 rounded-lg border-4 border-gray-200 border-opacity-60 flex flex-col-reverse overflow-hidden">
          {/* Liquid Fill */}
          <div 
            className={`${color} transition-all duration-500 ease-in-out`}
            style={{ height: `${safeLevel}%` }}
          ></div>
          
          {/* Liquid Surface (creates the curved top effect) */}
          <div className={`absolute top-0 left-0 right-0 h-2 ${color} opacity-80`} 
               style={{ top: `calc(${100 - safeLevel}% - 2px)` }}>
            <div className="absolute -top-1 left-0 right-0 h-4 rounded-full bg-white bg-opacity-30"></div>
          </div>
        </div>
        
        {/* Jar Details */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Glass reflection effect */}
          <div className="absolute top-2 right-2 w-6 h-8 bg-white bg-opacity-20 rounded-full blur-sm"></div>
          {/* Rim thickness illusion */}
          <div className="absolute -top-1 left-0 right-0 h-2 rounded-t-lg bg-gray-100 bg-opacity-50"></div>
        </div>
      </div>
      
      {/* Level Indicator */}
      <span className="text-xs font-medium text-gray-500 mt-1">{safeLevel}%</span>
    </div>
  );
};

export default GlassJar;