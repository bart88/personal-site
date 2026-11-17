import type { ReactNode } from "react";

interface CalculatorSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export default function CalculatorSection({
  title,
  description,
  children,
  className = ""
}: CalculatorSectionProps) {
  return (
    <div className={`border-t border-black py-12 ${className}`}>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-3">
          <h2 className="text-xl font-medium text-black mb-3 tracking-wide uppercase">{title}</h2>
          {description && (
            <p className="text-black text-sm leading-relaxed">{description}</p>
          )}
        </div>
        <div className="col-span-12 lg:col-span-9">
          {children}
        </div>
      </div>
    </div>
  );
} 