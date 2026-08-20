import React from 'react';
import { 
  Briefcase, 
  Users, 
  Building2, 
  Search, 
  ChevronDown 
} from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-black text-white">
     
      <header className="relative flex-1 flex flex-col justify-between overflow-hidden">
      
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 blur-sm scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
      
        <div className="absolute inset-0 z-0 bg-radial from-transparent via-black/60 to-black" />

       {/* <Nav /> */}
    
        <main className="relative z-10 max-w-5xl mx-auto px-6 py-16 text-center flex flex-col items-center justify-center my-auto">
       
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Find Your Dream Job Today!
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-300 font-light max-w-2xl">
            Connecting Talent with Opportunity: Your Gateway to Career Success
          </p>

        
          <div className="mt-10 w-full max-w-4xl bg-white rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row items-center text-gray-700">
           
            <div className="w-full md:w-1/3 px-4 py-3 flex items-center">
              <input 
                type="text" 
                placeholder="Job Title or Company" 
                className="w-full bg-transparent border-none text-sm focus:outline-none placeholder-gray-400 text-gray-800"
              />
            </div>

            <div className="hidden md:block w-px h-8 bg-gray-200" />

          
            <div className="w-full md:w-1/4 px-4 py-3 flex items-center justify-between cursor-pointer border-t md:border-t-0 border-gray-100">
              <span className="text-sm text-gray-400">Select Location</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            <div className="hidden md:block w-px h-8 bg-gray-200" />

       
            <div className="w-full md:w-1/4 px-4 py-3 flex items-center justify-between cursor-pointer border-t md:border-t-0 border-gray-100">
              <span className="text-sm text-gray-400">Select Category</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

           
            <button className="w-full md:w-auto mt-2 md:mt-0 bg-[#2a9d8f] hover:bg-[#238377] text-white px-8 py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition whitespace-nowrap">
              <Search className="w-4 h-4" />
              <span>Search Job</span>
            </button>
          </div>

     
          <div className="mt-16 flex flex-wrap justify-center gap-10 md:gap-16">
           
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-[#2a9d8f] flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">25,850</div>
                <div className="text-xs text-gray-400">Jobs</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-[#2a9d8f] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">10,250</div>
                <div className="text-xs text-gray-400">Candidates</div>
              </div>
            </div>

         
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-[#2a9d8f] flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">18,400</div>
                <div className="text-xs text-gray-400">Companies</div>
              </div>
            </div>
          </div>
        </main>
      </header>

      
      <footer className="relative z-10 border-t border-white/10 bg-black py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-8 opacity-80 filter grayscale hover:grayscale-0 transition duration-300">
        
          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span>Spotify</span>
          </div>

          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <span className="text-2xl tracking-tighter font-extrabold"># slack</span>
          </div>

          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <span className="font-extrabold tracking-widest uppercase text-lg">A Adobe</span>
          </div>

          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <div className="flex -space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-white inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-white inline-block -translate-y-1"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-white inline-block"></span>
            </div>
            <span>asana</span>
          </div>

          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent -rotate-45" />
            <span>Linear</span>
          </div>
        </div>
      </footer>
    </div>
  );
}