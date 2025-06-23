import { useRef } from "preact/hooks";

interface HomePageIslandProps {
  children?: any;
}

export default function HomePageIsland({ children }: HomePageIslandProps) {
  const mainContentRef = useRef<HTMLElement>(null);
  const returnBtnRef = useRef<HTMLButtonElement>(null);

  const toggleBackgroundView = () => {
    const mainContent = mainContentRef.current;
    const returnBtn = returnBtnRef.current;
    
    if (mainContent && returnBtn) {
      if (mainContent.style.transform === 'translateX(-100%)') {
        // Show content
        mainContent.style.transform = 'translateX(0)';
        returnBtn.style.opacity = '0';
        returnBtn.style.pointerEvents = 'none';
        returnBtn.style.transform = 'translateX(100%)';
      } else {
        // Hide content
        mainContent.style.transform = 'translateX(-100%)';
        returnBtn.style.opacity = '1';
        returnBtn.style.pointerEvents = 'auto';
        returnBtn.style.transform = 'translateX(0)';
      }
    }
  };

  return (
    <>
      {/* Main content */}
      <main ref={mainContentRef} class="relative z-10 transition-transform duration-1000 ease-in-out min-h-screen md:h-full">
        <div class="container mx-auto px-4 py-8 md:py-12 min-h-screen md:h-full flex items-center justify-center">
          <div class="max-w-4xl w-full">
            
            {/* Hero section */}
            <div class="text-center mb-8 md:mb-16 fade-in-up">
              <div class="inline-block mb-4 md:mb-6">
                <h1 class="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4">
                  Hey, I'm{" "}
                  <span class="text-gradient">Chris</span>
                </h1>
              </div>
            </div>

            {/* Single column profile card */}
            <div class="fade-in-up" style="animation-delay: 0.2s;">
              <div class="glass-dark rounded-2xl p-6 md:p-8 hover-lift">
                
                {/* Profile section */}
                <div class="text-center mb-6 md:mb-8">
                  <div class="relative inline-block mb-4 md:mb-6">
                    <div class="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mx-auto rounded-full overflow-hidden border-4 border-cyan-400 shadow-2xl hover-lift">
                      <img
                        alt="Chris Barton - Senior Software Engineer"
                        class="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110"
                        src="/profile.jpeg"
                      />
                    </div>
                  </div>
                </div>
                
                <p class="text-gray-300 text-base md:text-lg leading-relaxed mb-4 md:mb-6 text-center">
                  Hi! I'm Chris Barton—a Senior Software Engineer at{" "}
                  <a 
                    class="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-2 decoration-cyan-400/50 hover:decoration-cyan-300 transition-all duration-300"
                    href="https://rezdy.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Rezdy
                  </a>{" "}
                  by day and a freelance developer by night.
                </p>
                
                <p class="text-gray-300 text-base md:text-lg leading-relaxed mb-6 md:mb-8 text-center">
                  With over 15 years of experience across startups, scaleups, and large organizations, 
                  I specialize in front-end development while bringing extensive full-stack expertise 
                  to every project. I'm passionate about creating seamless user experiences and 
                  scalable solutions.
                </p>

                {/* Skills tags */}
                <div class="flex flex-wrap gap-2 mb-6 md:mb-8 justify-center">
                  {["React", "TypeScript", "Node.js", "AWS", "Angular", "AureliaJS", "Kotlin", "Java", "PHP"].map((skill, index) => (
                    <span 
                      key={skill}
                      class="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-medium hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300 cursor-default"
                      style={`animation-delay: ${0.1 * index}s;`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* CTA buttons */}
                <div class="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <a 
                    class="group flex items-center justify-center px-6 md:px-8 py-3 md:py-4 glass border-2 border-cyan-400/30 text-cyan-300 font-semibold rounded-xl hover:border-cyan-400/50 hover:bg-cyan-400/10 transform hover:scale-105 transition-all duration-300"
                    href="/blog"
                  >
                    <span class="mr-2">📖</span>
                    Read My Blog
                    <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </a>
                  
                  <a 
                    class="group flex items-center justify-center px-6 md:px-8 py-3 md:py-4 glass border-2 border-cyan-400/30 text-cyan-300 font-semibold rounded-xl hover:border-cyan-400/50 hover:bg-cyan-400/10 transform hover:scale-105 transition-all duration-300"
                    href="https://www.linkedin.com/in/chrisbartonadl/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span class="mr-2">💼</span>
                    Let's Connect
                    <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                </div>

                {/* View Background Button */}
                <div class="text-center mt-6 md:mt-8">
                  <button 
                    onClick={toggleBackgroundView}
                    class="group flex items-center justify-center mx-auto px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-purple-300 font-medium rounded-xl hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-400/50 transform hover:scale-105 transition-all duration-300"
                  >
                    View Animation
                    <svg class="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>

      {/* Return button (hidden by default) */}
      <button 
        ref={returnBtnRef}
        onClick={toggleBackgroundView}
        class="fixed top-4 md:top-8 right-4 md:right-8 z-20 opacity-0 pointer-events-none transform translate-x-full transition-all duration-1000 ease-in-out px-4 md:px-6 py-2 md:py-3 glass border-2 border-cyan-400/30 text-cyan-300 font-medium md:font-semibold text-sm md:text-base rounded-xl hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:scale-105"
      >
        <span class="mr-2">←</span>
        Return
      </button>
    </>
  );
} 