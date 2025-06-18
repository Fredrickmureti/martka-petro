
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FuturisticInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'password';
  className?: string;
}

const FuturisticInput = ({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  type = 'text',
  className 
}: FuturisticInputProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(!!value);

  React.useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div className={cn("relative group", className)}>
      <div className="relative">
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=" "
          required={required}
          className={cn(
            "peer h-12 w-full bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-0 rounded-xl",
            "backdrop-blur-sm shadow-lg transition-all duration-300",
            "text-white placeholder-transparent",
            "focus:from-blue-900/60 focus:to-purple-900/60 focus:shadow-xl focus:shadow-blue-500/20",
            "focus:ring-2 focus:ring-blue-400/50 focus:outline-none",
            isFocused && "scale-[1.02] translateZ-10"
          )}
        />
        
        {/* Animated Border */}
        <div className={cn(
          "absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20",
          "opacity-0 transition-opacity duration-300 pointer-events-none",
          (isFocused || hasValue) && "opacity-100"
        )} />
        
        {/* Floating Label */}
        <Label
          htmlFor={id}
          className={cn(
            "absolute left-4 transition-all duration-300 pointer-events-none",
            "text-slate-400 font-medium",
            (isFocused || hasValue) 
              ? "top-2 text-xs text-blue-400 font-bold transform scale-90" 
              : "top-3 text-sm"
          )}
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </Label>
        
        {/* Glow Effect */}
        <div className={cn(
          "absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10",
          "opacity-0 transition-opacity duration-300 pointer-events-none blur-sm",
          isFocused && "opacity-100"
        )} />
      </div>
      
      {/* Neural Network Dots */}
      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-1 h-1 rounded-full bg-blue-400/30 transition-all duration-300",
              isFocused && "bg-blue-400 shadow-md shadow-blue-400/50 animate-pulse",
              `delay-${i * 100}`
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default FuturisticInput;
