import { JSX } from "preact";

interface CalculatorSectionProps {
  title: string;
  description?: string;
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export default function CalculatorSection({
  title,
  description,
  children,
  className = ""
}: CalculatorSectionProps) {
  return (
    <div class={`border-t border-black py-12 ${className}`}>
      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-12 lg:col-span-3">
          <h2 class="text-xl font-medium text-black mb-3 tracking-wide uppercase">{title}</h2>
          {description && (
            <p class="text-black text-sm leading-relaxed">{description}</p>
          )}
        </div>
        <div class="col-span-12 lg:col-span-9">
          {children}
        </div>
      </div>
    </div>
  );
} 