import { HeaderCanvas } from "../islands/HeaderCanvas.tsx";
import HomePageIsland from "../islands/HomePageIsland.tsx";

export default function Home() {
  return (
    <div class="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated background canvas */}
      <div class="absolute inset-0 z-0">
        <HeaderCanvas />
      </div>
      
      {/* Interactive homepage content */}
      <HomePageIsland />
    </div>
  );
}
