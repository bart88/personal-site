import { useState, useEffect } from "preact/hooks";
import { JSX } from "preact";
import CalculatorSection from "../components/CalculatorSection.tsx";
import ProfitChart from "../components/ProfitChart.tsx";

interface Ingredient {
  id: string;
  name: string;
  cost: number;
}

interface BatchCost {
  id: string;
  name: string;
  price: number;
}

interface CalculatorState {
  ingredients: Ingredient[];
  unitsPerBatch: number;
  batchCosts: BatchCost[];
  unitProductionCosts: number;
  marginPercentage: number;
  fixedUnitsPerWeek: number;
  timeframeDays: number;
}

const initialState: CalculatorState = {
  ingredients: [{ id: crypto.randomUUID(), name: "", cost: 0 }],
  unitsPerBatch: 1,
  batchCosts: [{ id: crypto.randomUUID(), name: "", price: 0 }],
  unitProductionCosts: 0,
  marginPercentage: 20,
  fixedUnitsPerWeek: 100,
  timeframeDays: 30,
};

export default function DogFoodCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState);
  const [results, setResults] = useState({
    totalIngredientCost: 0,
    totalBatchCosts: 0,
    costPerUnit: 0,
    finalUnitPrice: 0,
    profit: 0,
    profitPerWeek: 0,
    profitPerTimeframe: 0,
    revenuePerWeek: 0,
    revenuePerTimeframe: 0,
  });

  // Calculate results whenever state changes
  useEffect(() => {
    const totalIngredientCost = state.ingredients.reduce((sum, ingredient) => 
      sum + (ingredient.cost || 0), 0);
    
    const totalBatchCosts = state.batchCosts.reduce((sum, cost) => 
      sum + (cost.price || 0), 0);
    
    const costPerUnit = state.unitsPerBatch > 0 
      ? (totalIngredientCost + totalBatchCosts) / state.unitsPerBatch + state.unitProductionCosts
      : 0;
    
    const finalUnitPrice = costPerUnit * (1 + state.marginPercentage / 100);
    const profit = finalUnitPrice - costPerUnit;
    const profitPerWeek = profit * state.fixedUnitsPerWeek;
    const profitPerTimeframe = profitPerWeek * (state.timeframeDays / 7);
    const revenuePerWeek = finalUnitPrice * state.fixedUnitsPerWeek;
    const revenuePerTimeframe = revenuePerWeek * (state.timeframeDays / 7);

    setResults({
      totalIngredientCost,
      totalBatchCosts,
      costPerUnit,
      finalUnitPrice,
      profit,
      profitPerWeek,
      profitPerTimeframe,
      revenuePerWeek,
      revenuePerTimeframe,
    });
  }, [state]);

  const addIngredient = () => {
    setState(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { id: crypto.randomUUID(), name: "", cost: 0 }]
    }));
  };

  const removeIngredient = (id: string) => {
    setState(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(ingredient => ingredient.id !== id)
    }));
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: string | number) => {
    setState(prev => ({
      ...prev,
      ingredients: prev.ingredients.map(ingredient =>
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
      )
    }));
  };

  const addBatchCost = () => {
    setState(prev => ({
      ...prev,
      batchCosts: [...prev.batchCosts, { id: crypto.randomUUID(), name: "", price: 0 }]
    }));
  };

  const removeBatchCost = (id: string) => {
    setState(prev => ({
      ...prev,
      batchCosts: prev.batchCosts.filter(cost => cost.id !== id)
    }));
  };

  const updateBatchCost = (id: string, field: keyof BatchCost, value: string | number) => {
    setState(prev => ({
      ...prev,
      batchCosts: prev.batchCosts.map(cost =>
        cost.id === id ? { ...cost, [field]: value } : cost
      )
    }));
  };

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  return (
    <div>
      {/* Input Ingredients Section */}
      <CalculatorSection
        title="Input Ingredients"
        description="Add all raw materials and their costs. This forms the base of your dog food recipe."
      >
        <div class="space-y-6">
          {state.ingredients.map((ingredient, index) => (
            <div key={ingredient.id} class="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-200">
              <div class="col-span-8">
                <input
                  type="text"
                  placeholder="Ingredient name"
                  value={ingredient.name}
                  onInput={(e) => updateIngredient(ingredient.id, "name", (e.target as HTMLInputElement).value)}
                  class="w-full px-0 py-2 border-0 border-b border-black bg-transparent text-black placeholder-gray-400 focus:outline-none focus:border-b-2 focus:border-black text-lg"
                />
              </div>
              <div class="col-span-3">
                <input
                  type="number"
                  placeholder="0.00"
                  value={ingredient.cost || ""}
                  onInput={(e) => updateIngredient(ingredient.id, "cost", parseFloat((e.target as HTMLInputElement).value) || 0)}
                  class="w-full px-0 py-2 border-0 border-b border-black bg-transparent text-black text-right focus:outline-none focus:border-b-2 focus:border-black text-lg"
                  step="0.01"
                  min="0"
                />
              </div>
              {state.ingredients.length > 1 && (
                <div class="col-span-1 text-right">
                  <button
                    onClick={() => removeIngredient(ingredient.id)}
                    class="w-8 h-8 text-black hover:bg-gray-100 transition-colors flex items-center justify-center"
                    aria-label="Remove ingredient"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            onClick={addIngredient}
            class="mt-8 px-0 py-3 text-black border-b border-black hover:border-b-2 transition-all font-medium text-sm tracking-wide uppercase"
          >
            + Add Ingredient
          </button>
        </div>
      </CalculatorSection>

      {/* Units Per Batch Section */}
      <CalculatorSection
        title="Units Per Batch"
        description="How many individual units (containers, portions) can you produce from one batch of ingredients?"
      >
        <div class="max-w-sm">
          <input
            type="number"
            value={state.unitsPerBatch}
            onInput={(e) => setState(prev => ({ ...prev, unitsPerBatch: parseInt((e.target as HTMLInputElement).value) || 1 }))}
            class="w-full px-0 py-4 border-0 border-b-2 border-black bg-transparent text-black text-2xl font-light focus:outline-none"
            min="1"
          />
          <p class="text-xs text-black mt-4 tracking-wide uppercase">Units per batch</p>
        </div>
      </CalculatorSection>

      {/* Batch Production Costs Section */}
      <CalculatorSection
        title="Batch Production Costs"
        description="Additional costs incurred per batch (utilities, labor, equipment usage, etc.)"
      >
        <div class="space-y-6">
          {state.batchCosts.map((cost) => (
            <div key={cost.id} class="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-200">
              <div class="col-span-8">
                <input
                  type="text"
                  placeholder="Cost name (e.g., Gas, Electricity, Labor)"
                  value={cost.name}
                  onInput={(e) => updateBatchCost(cost.id, "name", (e.target as HTMLInputElement).value)}
                  class="w-full px-0 py-2 border-0 border-b border-black bg-transparent text-black placeholder-gray-400 focus:outline-none focus:border-b-2 focus:border-black text-lg"
                />
              </div>
              <div class="col-span-3">
                <input
                  type="number"
                  placeholder="0.00"
                  value={cost.price || ""}
                  onInput={(e) => updateBatchCost(cost.id, "price", parseFloat((e.target as HTMLInputElement).value) || 0)}
                  class="w-full px-0 py-2 border-0 border-b border-black bg-transparent text-black text-right focus:outline-none focus:border-b-2 focus:border-black text-lg"
                  step="0.01"
                  min="0"
                />
              </div>
              {state.batchCosts.length > 1 && (
                <div class="col-span-1 text-right">
                  <button
                    onClick={() => removeBatchCost(cost.id)}
                    class="w-8 h-8 text-black hover:bg-gray-100 transition-colors flex items-center justify-center"
                    aria-label="Remove batch cost"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            onClick={addBatchCost}
            class="mt-8 px-0 py-3 text-black border-b border-black hover:border-b-2 transition-all font-medium text-sm tracking-wide uppercase"
          >
            + Add Batch Cost
          </button>
        </div>
      </CalculatorSection>

      {/* Unit Production Costs Section */}
      <CalculatorSection
        title="Unit Production Costs"
        description="Per-unit costs for packaging, labels, containers, and other materials used for each individual unit."
      >
        <div class="max-w-sm">
          <input
            type="number"
            value={state.unitProductionCosts || ""}
            onInput={(e) => setState(prev => ({ ...prev, unitProductionCosts: parseFloat((e.target as HTMLInputElement).value) || 0 }))}
            class="w-full px-0 py-4 border-0 border-b-2 border-black bg-transparent text-black text-2xl font-light focus:outline-none"
            step="0.01"
            min="0"
            placeholder="0.00"
          />
          <p class="text-xs text-black mt-4 tracking-wide uppercase">Cost per unit (containers, labels, etc.)</p>
        </div>
      </CalculatorSection>

      {/* Margin Percentage Section */}
      <CalculatorSection
        title="Profit Margin"
        description="Set your desired profit margin percentage to determine final selling price."
      >
        <div class="max-w-md">
          <div class="flex items-baseline gap-2">
            <input
              type="number"
              value={state.marginPercentage}
              onInput={(e) => setState(prev => ({ ...prev, marginPercentage: parseInt((e.target as HTMLInputElement).value) || 0 }))}
              class="w-24 px-0 py-4 border-0 border-b-2 border-black bg-transparent text-black text-2xl font-light focus:outline-none text-right"
              min="0"
              max="1000"
            />
            <span class="text-2xl font-light text-black">%</span>
          </div>
          <div class="mt-8">
            <input
              type="range"
              min="0"
              max="100"
              value={state.marginPercentage}
              onInput={(e) => setState(prev => ({ ...prev, marginPercentage: parseInt((e.target as HTMLInputElement).value) }))}
              class="w-full h-1 bg-black appearance-none cursor-pointer"
              style="background: linear-gradient(to right, #000 0%, #000 calc(var(--value) * 1%), #ccc calc(var(--value) * 1%), #ccc 100%); --value: ${state.marginPercentage}"
            />
          </div>
          <p class="text-xs text-black mt-4 tracking-wide uppercase">Margin percentage</p>
        </div>
      </CalculatorSection>

      {/* Results Display Section */}
      <CalculatorSection title="Unit Economics Results">
        <div class="grid grid-cols-12 gap-8">
          <div class="col-span-12 lg:col-span-6">
            <div class="border-l-2 border-black pl-6">
              <h3 class="text-lg font-medium text-black mb-8 tracking-wide uppercase">Cost Breakdown</h3>
              <div class="space-y-6">
                <div class="flex justify-between items-baseline border-b border-gray-200 pb-2">
                  <span class="text-black text-sm">Total ingredient cost</span>
                  <span class="font-medium text-lg">{formatCurrency(results.totalIngredientCost)}</span>
                </div>
                <div class="flex justify-between items-baseline border-b border-gray-200 pb-2">
                  <span class="text-black text-sm">Total batch costs</span>
                  <span class="font-medium text-lg">{formatCurrency(results.totalBatchCosts)}</span>
                </div>
                <div class="flex justify-between items-baseline border-b border-gray-200 pb-2">
                  <span class="text-black text-sm">Unit production costs</span>
                  <span class="font-medium text-lg">{formatCurrency(state.unitProductionCosts)}</span>
                </div>
                <div class="flex justify-between items-baseline border-t-2 border-black pt-4">
                  <span class="text-black font-medium">Cost per unit</span>
                  <span class="text-black text-2xl font-light">{formatCurrency(results.costPerUnit)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-span-12 lg:col-span-6">
            <div class="border-l-2 border-black pl-6">
              <h3 class="text-lg font-medium text-black mb-8 tracking-wide uppercase">Final Pricing</h3>
              <div class="space-y-8">
                <div>
                  <div class="text-xs text-black tracking-wide uppercase mb-2">Selling Price Per Unit</div>
                  <div class="text-4xl font-light text-black">{formatCurrency(results.finalUnitPrice)}</div>
                </div>
                <div>
                  <div class="text-xs text-black tracking-wide uppercase mb-2">Profit Per Unit</div>
                  <div class="text-2xl font-light text-black">{formatCurrency(results.profit)}</div>
                </div>
                <div>
                  <div class="text-xs text-black tracking-wide uppercase mb-2">Margin</div>
                  <div class="text-xl font-medium text-black">{state.marginPercentage}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CalculatorSection>

      {/* Profit Analysis Section */}
      <CalculatorSection
        title="Profit Analysis"
        description="Configure sales volume and timeframe to project your potential earnings."
      >
        <div class="space-y-6">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Units sold per week
              </label>
              <input
                type="number"
                value={state.fixedUnitsPerWeek}
                onInput={(e) => setState(prev => ({ ...prev, fixedUnitsPerWeek: parseInt((e.target as HTMLInputElement).value) || 0 }))}
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Timeframe (days)
              </label>
              <input
                type="number"
                value={state.timeframeDays}
                onInput={(e) => setState(prev => ({ ...prev, timeframeDays: parseInt((e.target as HTMLInputElement).value) || 1 }))}
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
              />
            </div>
          </div>
          
          {/* Swiss Grid Projections */}
          <div class="grid grid-cols-12 gap-8 mt-16">
            <div class="col-span-12 lg:col-span-4">
              <div class="border-t-2 border-black pt-8">
                <h4 class="text-xs text-black tracking-wide uppercase mb-4">Revenue Analysis</h4>
                <div class="space-y-6">
                  <div>
                    <div class="text-xs text-black mb-1">Weekly</div>
                    <div class="text-2xl font-light text-black">{formatCurrency(results.revenuePerWeek)}</div>
                  </div>
                  <div>
                    <div class="text-xs text-black mb-1">{state.timeframeDays} Days</div>
                    <div class="text-2xl font-light text-black">{formatCurrency(results.revenuePerTimeframe)}</div>
                  </div>
                  <div>
                    <div class="text-xs text-black mb-1">Monthly Est.</div>
                    <div class="text-2xl font-light text-black">{formatCurrency(results.revenuePerWeek * 4.33)}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-span-12 lg:col-span-4">
              <div class="border-t-2 border-black pt-8">
                <h4 class="text-xs text-black tracking-wide uppercase mb-4">Profit Analysis</h4>
                <div class="space-y-6">
                  <div>
                    <div class="text-xs text-black mb-1">Weekly</div>
                    <div class="text-2xl font-light text-black">{formatCurrency(results.profitPerWeek)}</div>
                  </div>
                  <div>
                    <div class="text-xs text-black mb-1">{state.timeframeDays} Days</div>
                    <div class="text-2xl font-light text-black">{formatCurrency(results.profitPerTimeframe)}</div>
                  </div>
                  <div>
                    <div class="text-xs text-black mb-1">Monthly Est.</div>
                    <div class="text-2xl font-light text-black">{formatCurrency(results.profitPerWeek * 4.33)}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-span-12 lg:col-span-4">
              <div class="border-t-2 border-black pt-8">
                <h4 class="text-xs text-black tracking-wide uppercase mb-4">Volume Config</h4>
                <div class="space-y-6">
                  <div>
                    <div class="text-xs text-black mb-1">Units/Week</div>
                    <input
                      type="number"
                      value={state.fixedUnitsPerWeek}
                      onInput={(e) => setState(prev => ({ ...prev, fixedUnitsPerWeek: parseInt((e.target as HTMLInputElement).value) || 0 }))}
                      class="w-full px-0 py-2 border-0 border-b border-black bg-transparent text-black text-xl font-light focus:outline-none focus:border-b-2"
                      min="0"
                    />
                  </div>
                  <div>
                    <div class="text-xs text-black mb-1">Timeframe</div>
                    <input
                      type="number"
                      value={state.timeframeDays}
                      onInput={(e) => setState(prev => ({ ...prev, timeframeDays: parseInt((e.target as HTMLInputElement).value) || 1 }))}
                      class="w-full px-0 py-2 border-0 border-b border-black bg-transparent text-black text-xl font-light focus:outline-none focus:border-b-2"
                      min="1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Swiss Profit Chart */}
        <ProfitChart
          profitPerUnit={results.profit}
          fixedUnitsPerWeek={state.fixedUnitsPerWeek}
          timeframeDays={state.timeframeDays}
        />
      </CalculatorSection>
    </div>
  );
} 