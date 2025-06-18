
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FuturisticTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

const FuturisticTextarea = ({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  rows = 6,
  className 
}: FuturisticTextareaProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(!!value);

  React.useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div className={cn("relative group", className)}>
      <div className="relative">
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=" "
          required={required}
          rows={rows}
          className={cn(
            "peer w-full bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-0 rounded-xl",
            "backdrop-blur-sm shadow-lg transition-all duration-300",
            "text-white placeholder-transparent font-mono text-sm",
            "focus:from-blue-900/60 focus:to-purple-900/60 focus:shadow-xl focus:shadow-blue-500/20",
            "focus:ring-2 focus:ring-blue-400/50 focus:outline-none resize-none",
            isFocused && "scale-[1.01] translateZ-10"
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
              : "top-4 text-sm"
          )}
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </Label>
        
        {/* Code Syntax Highlighter Effect */}
        <div className="absolute top-2 right-3 text-xs text-slate-500 font-mono">
          JSON
        </div>
      </div>
      
      {/* Connection Lines */}
      <div className="absolute -right-3 top-4 flex flex-col gap-2">
        {[...Array(Math.min(rows, 6))].map((_, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className={cn(
              "w-2 h-px bg-gradient-to-r from-transparent to-blue-400/30 transition-all duration-300",
              isFocused && "to-blue-400/70"
            )} />
            <div className={cn(
              "w-1 h-1 rounded-full bg-blue-400/20 transition-all duration-300",
              isFocused && "bg-blue-400/60 shadow-sm shadow-blue-400/50"
            )} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FuturisticTextarea;
