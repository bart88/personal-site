import { useRef, useEffect } from "preact/hooks";

class Particle {
    effect: Effect;
    x: number;
    y: number;
    speedX: number = 0;
    speedY: number = 0;
    speedModifier: number = Math.floor(Math.random() * 5 + 1);
    history: { x: number; y: number }[];
    maxLength: number;
    angle: number;
    timer: number;
    color: string;
    lineWidth: number;

    constructor(effect: Effect) {
        this.effect = effect
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);
        this.history = [{ x: this.x, y: this.y }];
        this.maxLength = Math.floor(Math.random() * 200 + 10);
        this.angle = 0;
        this.timer = this.maxLength * 2;
        this.color = this.getRandomColour();
        this.lineWidth = this.getRandomLineWidth();
    }
    
    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 0; i < this.history.length; i++) {
            context.lineTo(this.history[i].x, this.history[i].y);
        }
        context.strokeStyle = this.color;
        context.lineWidth = this.lineWidth;
        context.stroke();
    }

    update() {
        this.timer--;

        if (this.timer >= 1) {
            // Check if particle is within canvas bounds first
            if (this.x < 0 || this.x >= this.effect.width || 
                this.y < 0 || this.y >= this.effect.height) {
                this.reset();
                return;
            }

            // Calculate grid position with bounds checking
            let x = Math.floor(this.x / this.effect.cellSize);
            let y = Math.floor(this.y / this.effect.cellSize);
            
            // Clamp grid coordinates to valid range
            x = Math.max(0, Math.min(x, this.effect.columns - 1));
            y = Math.max(0, Math.min(y, this.effect.rows - 1));
            
            const index = y * this.effect.columns + x;
            this.angle = this.effect.flowField[index];

            this.speedX = Math.cos(this.angle);
            this.speedY = Math.sin(this.angle);
            this.x += this.speedX * this.speedModifier;
            this.y += this.speedY * this.speedModifier;

            this.history.push({ x: this.x, y: this.y });
            if (this.history.length > this.maxLength) {
                this.history.shift();
            }
        } else if (this.history.length > 1) {
            this.history.shift();
        } else {
            this.reset();
        }
    }

    reset() {
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);
        this.history = [{ x: this.x, y: this.y }];
        this.timer = this.maxLength * 2;
        this.resetColor();
    }

    resetColor() {
        this.color = this.getRandomColour();
    }

    getRandomLineWidth(): number {
        return Math.floor(Math.random() * 0.4 + 1);
    }

    getRandomColour(): string {
        const hue = (this.x / this.effect.width) * 360;
        const saturation = 30;
        const lightness = 50;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
}

class Effect {

    width: number;
    height: number;
    particles: Particle[] = [];
    numberOfParticles: number;
    cellSize: number;
    rows: number;
    columns: number;
    flowField: number[];
    curve: number;
    zoom: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.particles = [];
        this.numberOfParticles = 1000;
        this.cellSize = Math.floor(Math.random() * 20 + 10); // Random between 10-29
        this.flowField = [];
        this.rows = 0;
        this.columns = 0;
        this.curve = 1.0;
        this.zoom = 0.1;
        this.init();
    }

    init() {
        // create flow field
        this.rows = Math.floor(this.height / this.cellSize);
        this.columns = Math.floor(this.width / this.cellSize);
        this.flowField = [];

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                const angle = (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
                this.flowField.push(angle);
            }            
        }

        // create particles
        for (let i = 0; i < this.numberOfParticles; i++) {
        this.particles.push(new Particle(this));
        }
    }

    drawGrid(context: CanvasRenderingContext2D) {
        context.save();
        context.strokeStyle = "black"
        context.lineWidth = 0.3;

        for (let c = 0; c < this.columns; c++) {
            context.beginPath();
            context.moveTo(this.cellSize * c, 0);
            context.lineTo(this.cellSize * c, this.height);
            context.stroke();
        }

        for (let r = 0; r < this.rows; r++) {
            context.beginPath();
            context.moveTo(0, this.cellSize * r);
            context.lineTo(this.width, this.cellSize * r);
            context.stroke();
        }   

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {
//       this.drawGrid(context);
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update();
        });
    }

    clearParticles() {
        this.particles = [];
    }
}



export function HeaderCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const effectRef = useRef<Effect | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            
            if (!context) {
                return;
            }


            // Set canvas size to match its display size
            const resizeCanvas = () => {
                const { width, height } = canvas.getBoundingClientRect();
                canvas.width = width;
                canvas.height = height;

                if (effectRef.current) {
                    effectRef.current.clearParticles();
                    effectRef.current = new Effect(canvas.width, canvas.height);
                }

                if (animationFrameRef.current !== null) {
                    cancelAnimationFrame(animationFrameRef.current);
                }

                // Create a new effect
                effectRef.current = new Effect(canvas.width, canvas.height);

                // Start a new animation
                function animate() {
                    if (context === null) {
                        return;
                    }    
                     // Add a semi-transparent layer over the previous frame
                context.fillStyle = 'rgba(10, 0, 0, 0.05)'; // Adjust the alpha value (0.05) to control fade speed
                context.fillRect(0, 0, canvas.width, canvas.height);

//                    context.clearRect(0, 0, canvas.width, canvas.height);
                    effectRef.current?.render(context);
                    animationFrameRef.current = requestAnimationFrame(animate);
                }
                animate();
            };

            // Initial resize
            resizeCanvas();

            // Add resize listener
            window.addEventListener('resize', resizeCanvas);

            // Cleanup
            return () => {
                window.removeEventListener('resize', resizeCanvas);
            };
        }
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            id="header_canvas" 
            class="absolute z-0 w-full h-full bg-gray-800"
        ></canvas>
    );
}
