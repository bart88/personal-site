import { JSX } from "preact";

interface ProfitChartProps {
  profitPerUnit: number;
  fixedUnitsPerWeek: number;
  timeframeDays: number;
}

export default function ProfitChart({ 
  profitPerUnit, 
  fixedUnitsPerWeek, 
  timeframeDays 
}: ProfitChartProps) {
  // Generate data points for different unit volumes
  const generateChartData = () => {
    const dataPoints = [];
    const maxUnits = Math.max(fixedUnitsPerWeek * 3, 300); // Show up to 3x current volume, minimum 300
    const stepSize = Math.max(1, Math.floor(maxUnits / 20)); // 20 data points max
    
    // Always include 0 and the current volume
    const uniqueUnits = new Set([0, fixedUnitsPerWeek]);
    
    // Add other data points
    for (let units = 0; units <= maxUnits; units += stepSize) {
      uniqueUnits.add(units);
    }
    
    // Convert to sorted array and generate data
    const sortedUnits = Array.from(uniqueUnits).sort((a, b) => a - b);
    
    for (const units of sortedUnits) {
      const weeklyProfit = profitPerUnit * units;
      const timeframeProfit = weeklyProfit * (timeframeDays / 7);
      dataPoints.push({ units, weeklyProfit, timeframeProfit });
    }
    
    return dataPoints;
  };

  const data = generateChartData();
  const maxProfit = Math.max(...data.map(d => d.timeframeProfit));
  const currentWeeklyProfit = profitPerUnit * fixedUnitsPerWeek;
  const currentTimeframeProfit = currentWeeklyProfit * (timeframeDays / 7);

  const formatCurrency = (amount: number) => `$${amount.toFixed(0)}`;

  return (
    <div class="border-t-2 border-black pt-16 mt-16">
      <div class="grid grid-cols-12 gap-8 mb-12">
        <div class="col-span-12 lg:col-span-3">
          <h3 class="text-lg font-medium text-black mb-3 tracking-wide uppercase">
            Profit Projection
          </h3>
          <p class="text-black text-sm leading-relaxed">
            Profit over {timeframeDays} days based on different weekly sales volumes
          </p>
        </div>
        <div class="col-span-12 lg:col-span-9"></div>
      </div>

      {/* Swiss Chart Container */}
      <div class="relative">
        {/* Y-axis labels */}
        <div class="absolute left-0 top-0 bottom-0 w-20 flex flex-col justify-between text-right text-xs text-black pr-4 font-light">
          <span>{formatCurrency(maxProfit)}</span>
          <span>{formatCurrency(maxProfit * 0.75)}</span>
          <span>{formatCurrency(maxProfit * 0.5)}</span>
          <span>{formatCurrency(maxProfit * 0.25)}</span>
          <span>$0</span>
        </div>

        {/* Chart area */}
        <div class="ml-20 border-l border-b border-black relative h-80">
          {/* Grid lines - Swiss minimal */}
          <div class="absolute inset-0">
            {[0.25, 0.5, 0.75].map((ratio) => (
              <div 
                key={ratio}
                class="absolute w-full border-t border-gray-300"
                style={{ bottom: `${ratio * 100}%`, borderWidth: '0.5px' }}
              />
            ))}
          </div>

          {/* Data bars */}
          <div class="absolute inset-0 flex items-end justify-between px-1">
            {data.map((point, index) => {
              const height = maxProfit > 0 ? (point.timeframeProfit / maxProfit) * 100 : 0;
              const isCurrentPoint = point.units === fixedUnitsPerWeek;
              
              return (
                <div 
                  key={index}
                  class="flex flex-col justify-end items-center relative group"
                  style={{ width: `${100 / data.length}%`, height: '100%' }}
                >
                  {/* Swiss Bar with tooltip */}
                  <div class="relative">
                    <div 
                      class={`w-3/4 max-w-6 transition-all duration-300 mx-auto ${
                        isCurrentPoint 
                          ? 'bg-black' 
                          : 'bg-gray-400 hover:bg-gray-600'
                      }`}
                      style={{ height: `${height}%`, minHeight: height > 0 ? '1px' : '0' }}
                    />
                    
                    {/* Swiss Tooltip */}
                    <div class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-black text-white text-xs px-3 py-2 whitespace-nowrap z-20">
                      <div class="font-light">{point.units} units/week</div>
                      <div class="font-medium">{formatCurrency(point.timeframeProfit)}</div>
                    </div>
                  </div>
                  
                  {/* Current indicator */}
                  {isCurrentPoint && (
                    <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20">
                      Current: {formatCurrency(point.timeframeProfit)}
                      <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-blue-600"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* X-axis labels */}
        <div class="ml-20 mt-4 flex justify-between text-xs text-black font-light">
          <span>0</span>
          <span class="tracking-wide uppercase">Units Sold Per Week</span>
          <span>{data[data.length - 1]?.units || 0}</span>
        </div>
      </div>

      {/* Swiss Chart insights */}
      <div class="mt-12 grid grid-cols-12 gap-8 pt-8 border-t border-black">
        <div class="col-span-4 text-center">
          <div class="text-3xl font-light text-black mb-2">
            {fixedUnitsPerWeek}
          </div>
          <div class="text-xs text-black tracking-wide uppercase">Current Volume</div>
        </div>
        <div class="col-span-4 text-center">
          <div class="text-3xl font-light text-black mb-2">
            {formatCurrency(currentTimeframeProfit)}
          </div>
          <div class="text-xs text-black tracking-wide uppercase">Current Profit</div>
        </div>
        <div class="col-span-4 text-center">
          <div class="text-3xl font-light text-black mb-2">
            {formatCurrency(maxProfit)}
          </div>
          <div class="text-xs text-black tracking-wide uppercase">Max Potential</div>
        </div>
      </div>
    </div>
  );
} 