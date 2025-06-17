
import React from 'react';
import { cn } from '@/lib/utils';

interface AppLoaderProps {
  className?: string;
}

const AppLoader: React.FC<AppLoaderProps> = ({ className }) => {
  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800",
      className
    )}>
      <div className="text-center space-y-6 animate-fade-in">
        {/* Company Logo/Icon */}
        <div className="relative">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            {/* Animated fuel pump icon */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl animate-pulse-3d">
              <div className="flex items-center justify-center h-full">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-10 h-10 text-white animate-float"
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M3 12h18m-9-9v18"/>
                  <path d="M8 8l4-4 4 4"/>
                  <path d="M16 16l-4 4-4-4"/>
                </svg>
              </div>
            </div>
            
            {/* Rotating ring */}
            <div className="absolute -inset-2 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin opacity-60"></div>
          </div>
        </div>

        {/* Company Name */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Martka
            </span>
            {' '}
            <span className="text-gray-700 dark:text-gray-300">
              Petroleum
            </span>
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium tracking-wide">
            Premium Petroleum Equipment Solutions
          </p>
        </div>

        {/* Loading Animation */}
        <div className="space-y-3">
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          
          {/* Progress bar */}
          <div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-full animate-pulse origin-left transform scale-x-0 animate-[scale-x_2s_ease-in-out_infinite]"></div>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-500 animate-pulse">
            Loading your petroleum solutions...
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppLoader;
