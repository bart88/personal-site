# Dog Food Unit Economics Calculator - Implementation Plan

## Overview
Create a single-page calculator for dog food unit economics with Swiss-style design principles, using Fresh.js, TypeScript, and Tailwind CSS.

## Technical Architecture

### 1. Route Structure
- **Location**: `routes/dogfood/index.tsx`
- **Type**: Fresh.js page component with client-side interactivity
- **Supporting files**:
  - `islands/DogFoodCalculator.tsx` - Main interactive component
  - `components/CalculatorSection.tsx` - Reusable section component
  - `components/InputRow.tsx` - Dynamic input row component
  - `components/ProfitChart.tsx` - Chart visualization component

### 2. Data Structure
```typescript
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
```

## Swiss Design Implementation

### 1. Visual Design Principles
- **Typography**: System font stack (already implemented)
- **Grid System**: 12-column grid with mathematical spacing (multiples of 8px)
- **Color Palette**: 
  - Primary: Existing blues (#06b6d4, #0ea5e9, #3b82f6)
  - Neutral: Grays (#f8fafc, #e2e8f0, #64748b, #1e293b)
  - Accent: Red for remove actions (#ef4444)
  - Success: Green for positive values (#10b981)
- **Whitespace**: Generous margins and padding using Tailwind spacing scale
- **Minimalism**: Clean interface with functional elements only

### 2. Layout Structure
```
Header (Calculator Title + Explanation)
├── Main Container (max-width, centered)
│   ├── Input Ingredients Section
│   ├── Units Per Batch Section
│   ├── Batch Production Costs Section
│   ├── Unit Production Costs Section
│   ├── Margin Percentage Section
│   ├── Results Display Section
│   └── Profit Analysis Section
│       ├── Configuration Controls
│       └── Chart Visualization
```

## Feature Implementation Plan

### Phase 1: Basic Structure & Swiss Design Foundation
1. **Create main route**: `routes/dogfood/index.tsx`
   - Page layout with Swiss typography
   - Clean grid-based structure
   - Responsive design for mobile/desktop

2. **Create calculator island**: `islands/DogFoodCalculator.tsx`
   - State management for all calculator inputs
   - Real-time calculation updates
   - Swiss-style form elements

### Phase 2: Input Sections with Dynamic Add/Remove
1. **Input Ingredients Section**
   - Dynamic list with name + cost fields
   - Add button (Swiss-style, minimal)
   - Remove buttons with smooth animations
   - Input validation and formatting

2. **Units Per Batch Section**
   - Single numeric input
   - Clear labeling and units

3. **Batch Production Costs Section**
   - Dynamic list similar to ingredients
   - Name + price fields
   - Add/remove functionality

4. **Unit Production Costs Section**
   - Single cost input for containers, labels, etc.
   - Clear description of what's included

### Phase 3: Calculations & Results Display
1. **Real-time calculation engine**
   - Cost per unit calculation
   - Margin application
   - Final unit price calculation

2. **Results display**
   - Large, prominent cost per unit display
   - Swiss typography hierarchy
   - Clear visual emphasis on key metrics

### Phase 4: Margin & Configuration
1. **Margin percentage input**
   - Percentage slider or input
   - Live preview of impact

2. **Profit analysis configuration**
   - Units per week input
   - Timeframe selector (days/weeks/months)
   - Dynamic chart updates

### Phase 5: Chart Implementation
1. **Profit visualization chart**
   - Use Chart.js or similar lightweight library
   - Swiss-style chart design (minimal grid, clean lines)
   - Configurable units and timeframe
   - Responsive design

### Phase 6: UX Enhancements
1. **Animations and transitions**
   - Smooth add/remove animations
   - Number formatting and currency display
   - Loading states for calculations

2. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

## Swiss Design Components

### 1. Color Usage
- **Functional colors only**: No decorative elements
- **High contrast**: Ensure readability
- **Consistent application**: Same colors for same functions across the app

### 2. Typography Scale
```css
H1: text-4xl font-bold (Main title)
H2: text-2xl font-semibold (Section headers)
H3: text-xl font-medium (Subsection headers)
Body: text-base (Default text)
Small: text-sm (Labels, helper text)
```

### 3. Spacing System
- **Base unit**: 4px (Tailwind's default)
- **Component spacing**: 16px, 24px, 32px
- **Section spacing**: 48px, 64px
- **Page margins**: 80px+ on desktop

### 4. Interactive Elements
- **Buttons**: Minimal, functional design with hover states
- **Inputs**: Clean borders, focus states, proper spacing
- **Form sections**: Clear grouping with subtle backgrounds

## File Structure
```
routes/dogfood/
├── index.tsx (main route)
└── plan.md (this file)

islands/
├── DogFoodCalculator.tsx (main interactive component)

components/
├── CalculatorSection.tsx (reusable section wrapper)
├── InputRow.tsx (dynamic input row)
├── ProfitChart.tsx (chart component)
└── CalculatorResults.tsx (results display)
```

## Technical Considerations

### 1. State Management
- Use React useState for local state
- Consider useReducer for complex state updates
- Implement proper TypeScript interfaces

### 2. Performance
- Debounce calculation updates for smooth UX
- Memoize expensive calculations
- Optimize chart rendering

### 3. Validation
- Input validation for numeric fields
- Error handling and user feedback
- Prevent negative values where inappropriate

### 4. Charts Library
- Research lightweight options (Chart.js, Recharts, or similar)
- Ensure Swiss design compatibility
- Mobile responsiveness

## Success Criteria
- [ ] Clean, Swiss-style visual design
- [ ] All input sections with add/remove functionality
- [ ] Real-time calculation updates
- [ ] Professional profit analysis chart
- [ ] Responsive design (mobile/desktop)
- [ ] Accessible interface
- [ ] Smooth animations and transitions
- [ ] Clear information hierarchy
- [ ] Professional calculator explanation

## Next Steps
1. Confirm plan approval
2. Begin Phase 1 implementation
3. Iterate through phases with testing
4. Polish and optimize final implementation 