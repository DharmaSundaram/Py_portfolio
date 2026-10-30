import React from 'react';
import { Star } from 'lucide-react';

export default function StarDisplay({
  count = 1,
  size = 'md',
  showEmpty = false,
  max = 5,
  interactive = false,
  onChange = null
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  const starCount = Math.max(0, parseInt(count, 10) || 0);

  // If interactive mode is enabled, allow picking
  if (interactive) {
    const currentCount = Math.max(1, Math.min(starCount, max));
    return (
      <div className="flex items-center gap-1.5" role="radiogroup" aria-label={`${starCount} stars`}>
        {Array.from({ length: max }).map((_, index) => {
          const starNumber = index + 1;
          const isFilled = starNumber <= currentCount;
          return (
            <button
              key={index}
              type="button"
              role="radio"
              aria-checked={isFilled}
              aria-label={`${starNumber} star${starNumber > 1 ? 's' : ''}`}
              onClick={() => onChange && onChange(starNumber)}
              className="p-1 rounded-md transition-transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <Star
                className={`${sizeClasses[size] || sizeClasses.md} transition-all duration-200 ${
                  isFilled
                    ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                    : 'text-slate-600 hover:text-slate-400'
                }`}
              />
            </button>
          );
        })}
      </div>
    );
  }

  // Explicitly requested to show empty placeholder stars (legacy rating behavior)
  if (showEmpty) {
    const currentCount = Math.max(0, Math.min(starCount, max));
    return (
      <div className="flex items-center gap-1.5" role="img" aria-label={`${starCount} of ${max} stars`}>
        {Array.from({ length: max }).map((_, index) => {
          const isFilled = index + 1 <= currentCount;
          return (
            <Star
              key={index}
              className={`${sizeClasses[size] || sizeClasses.md} transition-all duration-200 ${
                isFilled
                  ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]'
                  : 'text-slate-700/60'
              }`}
            />
          );
        })}
      </div>
    );
  }

  if (starCount === 0) return null;

  // Default: Only display earned notebook stars without empty stars (no rating look)
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${starCount} ${starCount === 1 ? 'star' : 'stars'}`}>
      {Array.from({ length: starCount }).map((_, index) => (
        <Star
          key={index}
          className={`${sizeClasses[size] || sizeClasses.md} text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.5)] transition-all duration-200`}
        />
      ))}
    </div>
  );
}
