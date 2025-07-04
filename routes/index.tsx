import HomePageIsland from "../islands/HomePageIsland.tsx";
import LangtonsAnt from "../islands/LangtonsAnt.tsx";

export default function Home() {
  return (
    <div class="min-h-screen w-full bg-white relative">
      {/* Langton's Ant Background Animation */}
      <LangtonsAnt 
        width={1920}
        height={1080}
        cellSize={12}
        animationSpeed={30}
        opacity={0.15}
      />
      <HomePageIsland />
    </div>
  );
}
