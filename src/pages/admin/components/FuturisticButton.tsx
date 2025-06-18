
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface FuturisticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

const FuturisticButton = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className
}: FuturisticButtonProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25';
      case 'secondary':
        return 'bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white shadow-lg shadow-slate-500/25';
      case 'danger':
        return 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white shadow-lg shadow-red-500/25';
      case 'success':
        return 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg shadow-green-500/25';
      default:
        return 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm h-9';
      case 'md':
        return 'px-6 py-3 text-base h-11';
      case 'lg':
        return 'px-8 py-4 text-lg h-13';
      default:
        return 'px-6 py-3 text-base h-11';
    }
  };

  return (
    <div className="relative group">
      <Button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative overflow-hidden rounded-xl font-semibold transition-all duration-300",
          "border-0 backdrop-blur-sm",
          "hover:shadow-xl hover:scale-105 hover:translateZ-10",
          "active:scale-95 transform-gpu",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
          getVariantStyles(),
          getSizeStyles(),
          className
        )}
      >
        {/* Animated Background */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r from-white/20 to-transparent",
          "transform translate-x-[-100%] transition-transform duration-500",
          isHovered && "translate-x-[100%]"
        )} />
        
        {/* Content */}
        <div className="relative flex items-center justify-center gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {children}
        </div>
        
        {/* Glow Effect */}
        <div className={cn(
          "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
          "bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-md",
          isHovered && !disabled && "opacity-100"
        )} />
      </Button>
      
      {/* Floating Particles */}
      {isHovered && !disabled && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute w-1 h-1 bg-white/60 rounded-full animate-ping",
                i === 0 && "top-2 left-2 delay-100",
                i === 1 && "top-3 right-3 delay-200",
                i === 2 && "bottom-2 left-1/2 delay-300"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FuturisticButton;
