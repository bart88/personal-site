import { useEffect, useRef, useState } from "preact/hooks";

interface LangtonsAntProps {
  width?: number;
  height?: number;
  cellSize?: number;
  animationSpeed?: number;
  opacity?: number;
}

interface AntState {
  x: number;
  y: number;
  direction: number; // 0=North, 1=East, 2=South, 3=West
}

interface GridCell {
  state: number; // 0=white, 1=black
  lastChanged: number;
}

const DIRECTIONS = [
  { x: 0, y: -1 }, // North
  { x: 1, y: 0 },  // East
  { x: 0, y: 1 },  // South
  { x: -1, y: 0 }  // West
];

export default function LangtonsAnt({ 
  width = 800, 
  height = 600, 
  cellSize = 4, 
  animationSpeed = 50,
  opacity = 0.6
}: LangtonsAntProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isRunning, setIsRunning] = useState(true);
  const [stepCount, setStepCount] = useState(0);
  
  const gridWidth = Math.floor(width / cellSize);
  const gridHeight = Math.floor(height / cellSize);
  
  // Grid state
  const gridRef = useRef<Map<string, GridCell>>(new Map());
  
  // Ant state
  const antRef = useRef<AntState>({
    x: Math.floor(gridWidth / 2),
    y: Math.floor(gridHeight / 2),
    direction: 0
  });
  
  const stepCountRef = useRef(0);
  const lastRenderRef = useRef(0);

  const getGridKey = (x: number, y: number) => `${x},${y}`;

  const getCell = (x: number, y: number): GridCell => {
    const key = getGridKey(x, y);
    return gridRef.current.get(key) || { state: 0, lastChanged: 0 };
  };

  const setCell = (x: number, y: number, state: number) => {
    const key = getGridKey(x, y);
    gridRef.current.set(key, { state, lastChanged: Date.now() });
  };

  // Rounded rectangle fallback
  const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(x, y, width, height, radius);
    } else {
      // Fallback for browsers without roundRect
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }
  };

  const step = () => {
    const ant = antRef.current;
    const currentCell = getCell(ant.x, ant.y);
    
    // Langton's ant rules
    if (currentCell.state === 0) {
      // White square: turn right, flip color, move forward
      ant.direction = (ant.direction + 1) % 4;
      setCell(ant.x, ant.y, 1);
    } else {
      // Black square: turn left, flip color, move forward
      ant.direction = (ant.direction + 3) % 4;
      setCell(ant.x, ant.y, 0);
    }
    
    // Move forward
    const dir = DIRECTIONS[ant.direction];
    ant.x += dir.x;
    ant.y += dir.y;
    
    // Wrap around edges
    if (ant.x < 0) ant.x = gridWidth - 1;
    if (ant.x >= gridWidth) ant.x = 0;
    if (ant.y < 0) ant.y = gridHeight - 1;
    if (ant.y >= gridHeight) ant.y = 0;
    
    stepCountRef.current++;
    
    // Update step count display every 100 steps
    if (stepCountRef.current % 100 === 0) {
      setStepCount(stepCountRef.current);
    }
  };

  const render = (ctx: CanvasRenderingContext2D, currentTime: number) => {
    // Clear canvas with Swiss white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    
    // Swiss/Apple styling
    const trailColor = '#e5e7eb'; // Light gray for trails
    const antColor = '#3b82f6';  // Blue for ant
    const shadowColor = 'rgba(0, 0, 0, 0.1)';
    
    // Render grid cells
    gridRef.current.forEach((cell, key) => {
      const [x, y] = key.split(',').map(Number);
      
      if (cell.state === 1) {
        const cellX = x * cellSize;
        const cellY = y * cellSize;
        
        // Apple-style subtle shadow
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = 1;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0.5;
        
        // Swiss-style rounded squares
        ctx.fillStyle = trailColor;
        roundRect(ctx, cellX, cellY, cellSize - 1, cellSize - 1, 1);
        ctx.fill();
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }
    });
    
    // Render ant with Apple-style refinements
    const ant = antRef.current;
    const antX = ant.x * cellSize;
    const antY = ant.y * cellSize;
    
    // Ant shadow
    ctx.shadowColor = 'rgba(59, 130, 246, 0.3)';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 1;
    
    // Ant body
    ctx.fillStyle = antColor;
    roundRect(ctx, antX, antY, cellSize - 1, cellSize - 1, 2);
    ctx.fill();
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    
    // Direction indicator (small arrow)
    ctx.fillStyle = '#ffffff';
    ctx.font = `${Math.max(cellSize * 0.6, 8)}px system-ui`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const arrows = ['↑', '→', '↓', '←'];
    ctx.fillText(
      arrows[ant.direction],
      antX + cellSize / 2,
      antY + cellSize / 2
    );
  };

  const animate = (currentTime: number) => {
    if (!isRunning) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Control animation speed
    if (currentTime - lastRenderRef.current > animationSpeed) {
      step();
      render(ctx, currentTime);
      lastRenderRef.current = currentTime;
    }
    
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Initial render
    render(ctx, 0);
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning]);

  // Pause/resume on visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsRunning(!document.hidden);
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div 
      class="fixed inset-0 pointer-events-none z-0"
      style={{ opacity }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        class="w-full h-full object-cover"
        style={{ 
          imageRendering: 'pixelated',
          filter: 'blur(0.5px)' // Subtle blur for Apple-style softness
        }}
      />
      
      {/* Swiss-style info overlay */}
      <div class="absolute bottom-4 right-4 font-system text-xs text-gray-400 font-light">
        Steps: {stepCount.toLocaleString()}
      </div>
    </div>
  );
} 