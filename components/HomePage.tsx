
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-8 py-20">
        {/* Swiss Grid Layout with Apple refinements */}
        <div className="grid grid-cols-12 gap-12 min-h-screen">
          
          {/* Left Column - Name & Title */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-10">
              <div>
                <h1 className="text-6xl lg:text-8xl font-light text-gray-900 leading-none tracking-tight font-system">
                  Chris
                </h1>
                <h2 className="text-6xl lg:text-8xl font-light text-gray-900 leading-none tracking-tight font-system">
                  Barton
                </h2>
              </div>
              
              <div className="w-24 h-1 bg-blue-500 rounded-full"></div>
              
              <div className="space-y-5">
                <p className="text-xl font-medium text-gray-900 leading-relaxed font-system">
                  Senior Software Engineer | AI Engineer
                </p>
                <p className="text-lg font-regular text-gray-600 leading-relaxed font-system">
                  Front-end specialist with 15+ years of full-stack experience
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
            <div className="space-y-16">
              
              {/* Profile Image */}
              <div className="flex justify-start">
                <div className="w-48 h-48 overflow-hidden rounded-2xl shadow-lg ring-1 ring-gray-900/5">
                  <img
                    alt="Chris Barton - Senior Software Engineer"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500 ease-out"
                    src="/profile.jpeg"
                  />
                </div>
              </div>
              
              {/* About */}
              <div className="space-y-8">
                <p className="text-lg font-regular text-gray-800 leading-relaxed max-w-lg font-system">
                  I work at{" "}
                  <a 
                    className="text-blue-600 hover:text-blue-700 underline underline-offset-4 decoration-2 decoration-blue-600/30 hover:decoration-blue-700/50 transition-all duration-300 font-medium"
                    href="https://gdaygroup.com.au/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Gday Group
                  </a>{" "}
                  by day and develop freelance projects by night.
                </p>
                
                <p className="text-lg font-regular text-gray-800 leading-relaxed max-w-lg font-system">
                  I specialize in creating seamless user experiences and scalable solutions 
                  across startups, scaleups, and large organizations.
                </p>
              </div>
              
              {/* Skills */}
              <div className="space-y-6">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider font-system">
                  Technologies
                </h3>
                <div className="grid grid-cols-3 gap-y-3 text-base font-regular text-gray-800 max-w-md font-system">
                  {["React", "Next.js", "TypeScript", "Node.js", "AWS", "Azure", "Angular", "Kotlin", "Java", "C#", "PHP", "AI SDK"].map((skill) => (
                    <span key={skill} className="hover:text-blue-600 transition-colors duration-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Actions */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <a 
                    className="group inline-flex items-center text-blue-600 hover:text-blue-700 font-medium border-b-2 border-blue-600/30 hover:border-blue-700/50 pb-1 transition-all duration-300 font-system"
                    href="/blog"
                  >
                    Read Blog
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </a>
                  
                  <a 
                    className="group inline-flex items-center text-blue-600 hover:text-blue-700 font-medium border-b-2 border-blue-600/30 hover:border-blue-700/50 pb-1 transition-all duration-300 font-system"
                    href="https://www.linkedin.com/in/chrisbartonadl/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
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