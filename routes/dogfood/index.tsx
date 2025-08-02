import DogFoodCalculator from "../../islands/DogFoodCalculator.tsx";

export default function DogFoodCalculatorPage() {
  return (
    <div class="min-h-screen bg-white font-system">
      {/* Swiss Header - Mathematical Grid */}
      <div class="border-b border-black">
        <div class="max-w-5xl mx-auto px-8 py-24">
          {/* Typography Hierarchy - Swiss Style */}
          <div class="grid grid-cols-12 gap-8">
            <div class="col-span-12 lg:col-span-8">
              <h1 class="text-5xl lg:text-6xl font-light text-black leading-none tracking-tight mb-8">
                Dog Food Unit<br/>Economics Calculator
              </h1>
              <div class="w-12 h-1 bg-black mb-8"></div>
              <p class="text-lg text-black leading-relaxed max-w-2xl">
                Calculate the true cost of producing homemade dog food and determine 
                optimal pricing for your business with precision and clarity.
              </p>
            </div>
            
            <div class="col-span-12 lg:col-span-4">
              <div class="border-l border-black pl-8">
                <h2 class="text-xl font-medium text-black mb-6 tracking-wide">METHODOLOGY</h2>
                <div class="space-y-4 text-sm text-black leading-relaxed">
                  <p><span class="font-medium">01</span> — Input raw material costs</p>
                  <p><span class="font-medium">02</span> — Define production batch size</p>
                  <p><span class="font-medium">03</span> — Calculate operational costs</p>
                  <p><span class="font-medium">04</span> — Set profit margins</p>
                  <p><span class="font-medium">05</span> — Analyze volume projections</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Section - Swiss Grid */}
      <div class="max-w-5xl mx-auto px-8 py-16">
        <DogFoodCalculator />
      </div>
    </div>
  );
} 