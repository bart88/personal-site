export const metadata = { title: "Dog Food Unit Economics Calculator" };

import DogFoodCalculator from "@/components/DogFoodCalculator";

export default function DogFoodCalculatorPage() {
  return (
    <div className="min-h-screen bg-white font-system">
      {/* Swiss Header - Mathematical Grid */}
      <div className="border-b border-black">
        <div className="max-w-5xl mx-auto px-8 py-24">
          {/* Typography Hierarchy - Swiss Style */}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8">
              <h1 className="text-5xl lg:text-6xl font-light text-black leading-none tracking-tight mb-8">
                Dog Food Unit<br />Economics Calculator
              </h1>
              <div className="w-12 h-1 bg-black mb-8"></div>
              <p className="text-lg text-black leading-relaxed max-w-2xl">
                Calculate the true cost of producing homemade dog food and determine 
                optimal pricing for your business with precision and clarity.
              </p>
            </div>
            
            <div className="col-span-12 lg:col-span-4">
              <div className="border-l border-black pl-8">
                <h2 className="text-xl font-medium text-black mb-6 tracking-wide">METHODOLOGY</h2>
                <div className="space-y-4 text-sm text-black leading-relaxed">
                  <p><span className="font-medium">01</span> — Input raw material costs</p>
                  <p><span className="font-medium">02</span> — Define production batch size</p>
                  <p><span className="font-medium">03</span> — Calculate operational costs</p>
                  <p><span className="font-medium">04</span> — Set profit margins</p>
                  <p><span className="font-medium">05</span> — Analyze volume projections</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Section - Swiss Grid */}
      <div className="max-w-5xl mx-auto px-8 py-16">
        <DogFoodCalculator />
      </div>
    </div>
  );
} 