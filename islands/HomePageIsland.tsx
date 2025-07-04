
interface HomePageIslandProps {
  children?: any;
}

export default function HomePageIsland({ children }: HomePageIslandProps) {
  return (
    <div class="min-h-screen bg-white">
      <div class="max-w-6xl mx-auto px-8 py-20">
        {/* Swiss Grid Layout with Apple refinements */}
        <div class="grid grid-cols-12 gap-12 min-h-screen">
          
          {/* Left Column - Name & Title */}
          <div class="col-span-12 lg:col-span-5 flex flex-col justify-center">
            <div class="space-y-10">
              <div>
                <h1 class="text-6xl lg:text-8xl font-light text-gray-900 leading-none tracking-tight font-system">
                  Chris
                </h1>
                <h2 class="text-6xl lg:text-8xl font-light text-gray-900 leading-none tracking-tight font-system">
                  Barton
                </h2>
              </div>
              
              <div class="w-24 h-1 bg-blue-500 rounded-full"></div>
              
              <div class="space-y-5">
                <p class="text-xl font-medium text-gray-900 leading-relaxed font-system">
                  Senior Software Engineer
                </p>
                <p class="text-lg font-regular text-gray-600 leading-relaxed font-system">
                  Front-end specialist with 15+ years of full-stack experience
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div class="col-span-12 lg:col-span-7 flex flex-col justify-center">
            <div class="space-y-16">
              
              {/* Profile Image */}
              <div class="flex justify-start">
                <div class="w-48 h-48 overflow-hidden rounded-2xl shadow-lg ring-1 ring-gray-900/5">
                  <img
                    alt="Chris Barton - Senior Software Engineer"
                    class="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500 ease-out"
                    src="/profile.jpeg"
                  />
                </div>
              </div>
              
              {/* About */}
              <div class="space-y-8">
                <p class="text-lg font-regular text-gray-800 leading-relaxed max-w-lg font-system">
                  I work at{" "}
                  <a 
                    class="text-blue-600 hover:text-blue-700 underline underline-offset-4 decoration-2 decoration-blue-600/30 hover:decoration-blue-700/50 transition-all duration-300 font-medium"
                    href="https://rezdy.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Rezdy
                  </a>{" "}
                  by day and develop freelance projects by night.
                </p>
                
                <p class="text-lg font-regular text-gray-800 leading-relaxed max-w-lg font-system">
                  I specialize in creating seamless user experiences and scalable solutions 
                  across startups, scaleups, and large organizations.
                </p>
              </div>
              
              {/* Skills */}
              <div class="space-y-6">
                <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wider font-system">
                  Technologies
                </h3>
                <div class="grid grid-cols-3 gap-y-3 text-base font-regular text-gray-800 max-w-md font-system">
                  {["React", "TypeScript", "Node.js", "AWS", "Angular", "AureliaJS", "Kotlin", "Java", "PHP"].map((skill) => (
                    <span key={skill} class="hover:text-blue-600 transition-colors duration-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Actions */}
              <div class="space-y-6">
                <div class="flex flex-col sm:flex-row gap-6">
                  <a 
                    class="group inline-flex items-center text-blue-600 hover:text-blue-700 font-medium border-b-2 border-blue-600/30 hover:border-blue-700/50 pb-1 transition-all duration-300 font-system"
                    href="/blog"
                  >
                    Read Blog
                    <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </a>
                  
                  <a 
                    class="group inline-flex items-center text-blue-600 hover:text-blue-700 font-medium border-b-2 border-blue-600/30 hover:border-blue-700/50 pb-1 transition-all duration-300 font-system"
                    href="https://www.linkedin.com/in/chrisbartonadl/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                    <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
} 