import { HeaderCanvas } from "../islands/HeaderCanvas.tsx";

export default function Home() {
  return (
    <main>
                <HeaderCanvas />
      <div class="px-4 py-8 mx-auto">
        <section class="text-gray-400 body-font">
          <div class="container px-5 pt-12 mx-auto flex flex-col">
            <div class="lg:w-4/6 mx-auto">
              <div class="flex flex-col sm:flex-row mt-10  bg-[#0c214c] text-[#fff] backdrop-blur-lg border-[1px] border-solid border-white border-opacity-20 rounded-2xl shadow-[rgba(0,0,0,0.70)] shadow-2xl">
                <div class="sm:w-1/3 text-center sm:px-8 sm:py-8 py-4 px-8 rounded-l-2xl sm:bg-[#b4b4b433]">
                  <div class="w-28 h-28 rounded-full inline-flex items-center justify-center  ">
                    <img
                      alt="It's me Chris Barton"
                      class="object-cover object-center rounded-full w-28 h-28"
                      src="/profile.jpeg"
                    />
                  </div>
                  <div class="flex flex-col items-center text-center justify-center">
                    <h2 class="font-bold title-font mt-4 text-3xl text-white">
                      Chris Barton
                    </h2>
                    <div class="w-12 h-1 rounded mt-2 mb-4 anim"></div>
                    <p class="text-base text-gray-300">
                      Senior Software Engineer
                    </p>
                  </div>
                </div>
                <div class="sm:w-2/3 sm:px-8 sm:py-8 py-4 px-4 sm:border-l border-solid border-white border-opacity-20  mt-4 sm:mt-0 text-center sm:text-left">
                  <p class="leading-normal mt-3 mb-4">
                  Hi, I'm Chris Barton—a Senior Software Engineer at <a class="text-teal-200 no-underline hover:underline"href="https://rezdy.com/">Rezdy</a> by day and a freelance developer by night. With over 10 years of experience in startups, scaleups, and large organizations, I bring a strong focus on front-end development alongside extensive full-stack expertise. Let’s connect and see how I can help bring your vision to life!                  </p>
                  
                  <a
                    class="text-teal-200 hover:text-[#0ea5e9] hover:underline inline-flex items-center mr-3 p-2 border-0 focus:outline-none transition-colors duration-500"
                    href="https://www.linkedin.com/in/chrisbartonadl/"
                  >
                    <span class="[&>svg]:h-5 [&>svg]:w-5 pr-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 448 512">
    <path
      d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
  </svg>
</span>

                    Contact me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* <div class="fixed bottom-4 right-4">
      <button class="bg-blue-600 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded">
  Dev Mode
</button>
</div> */}

    </main>
  );
}
