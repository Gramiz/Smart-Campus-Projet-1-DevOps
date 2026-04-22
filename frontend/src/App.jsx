import { GraduationCap, Users, Leaf, Calendar, Clock, MapPin, AlertTriangle, Droplets, Zap, Wrench, Thermometer, Wind, Sun } from 'lucide-react';

import homeImage from './assets/home.png';
import logoImage from './assets/smartcompus.png';
import filleImage from './assets/fille.png';
import buImage from './assets/bu.png';
import meteoImage from './assets/meteo.png';

export default function App() {
  return (
    <div className="min-h-screen font-sans bg-gray-900 text-white flex flex-col">

      {/* SECTION 1 : HERO */}
      <section
        className="relative min-h-screen flex flex-col bg-cover bg-center"
        style={{ backgroundImage: `url(${homeImage})` }}
      >
        <div className="absolute inset-0 bg-black/45"></div>

        <nav className="relative z-10 flex justify-between items-center py-8 px-12 w-full">
          <div className="w-12 h-12">
            <img src={logoImage} alt="Logo" className="w-full h-full object-contain" />
          </div>

          <div className="flex items-center gap-12 text-sm font-medium tracking-wide">
            <a href="#" className="hover:text-gray-300 transition">Home</a>
            <a href="#" className="hover:text-gray-400 transition">About Us</a>
            <a href="#" className="hover:text-gray-400 transition">Sign Up</a>
            <button className="bg-white text-black px-7 py-2.5 rounded-full font-semibold hover:bg-gray-200 transition">
              Sign In
            </button>
          </div>
        </nav>

        <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6">
          <div className="flex flex-col items-center mb-20 -mt-10">
            <div className="w-24 h-24 mb-6">
              <img src={logoImage} alt="Logo Smart Campus" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-7xl font-serif mb-3 tracking-wider">Smart Campus</h1>
            <p className="text-lg tracking-[0.3em] uppercase text-gray-200 font-light">The Character of success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
            <div className="bg-black/55 backdrop-blur-xl rounded-[2rem] p-8 flex items-start gap-6 border border-white/10 hover:bg-black/65 transition-all duration-300 group cursor-pointer">
              <div className="bg-white/5 p-3 rounded-xl">
                <GraduationCap className="w-10 h-10 text-white" strokeWidth={1.2} />
              </div>
              <div>
                <h3 className="font-bold text-2xl mb-2">Student</h3>
                <p className="text-sm text-gray-300 leading-relaxed font-light">Find, book, and report: your campus in real-time.</p>
              </div>
            </div>

            <div className="bg-black/55 backdrop-blur-xl rounded-[2rem] p-8 flex items-start gap-6 border border-white/10 hover:bg-black/65 transition-all duration-300 group cursor-pointer">
              <div className="bg-white/5 p-3 rounded-xl">
                <Users className="w-10 h-10 text-white" strokeWidth={1.2} />
              </div>
              <div>
                <h3 className="font-bold text-2xl mb-2">Staff</h3>
                <p className="text-sm text-gray-300 leading-relaxed font-light">Monitor, manage, and optimize your campus infrastructure.</p>
              </div>
            </div>

            <div className="bg-black/55 backdrop-blur-xl rounded-[2rem] p-8 flex items-start gap-6 border border-white/10 hover:bg-black/65 transition-all duration-300 group cursor-pointer">
              <div className="bg-white/5 p-3 rounded-xl">
                <Leaf className="w-10 h-10 text-white" strokeWidth={1.2} />
              </div>
              <div>
                <h3 className="font-bold text-2xl mb-2">Sustainability</h3>
                <p className="text-sm text-gray-300 leading-relaxed font-light">Smart energy management for a greener campus.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 : PRÉSENTATION */}
      <section className="relative w-full flex flex-col md:flex-row bg-black min-h-[400px] z-20">
        <div className="w-full md:w-1/2 p-12 md:pl-24 flex flex-col justify-center">
          <h2 className="text-5xl md:text-6xl font-serif mb-6 text-white tracking-wide">Smart Campus</h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg font-light">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book.
          </p>
        </div>

        <div className="w-full md:w-1/2 relative flex items-center justify-center md:justify-end md:pr-12">
          <div className="relative w-full max-w-[270px] -mt-20 left-[-50px] -mb-20 z-30">
            <img
              src={filleImage}
              alt="Étudiante"
              className="w-full h-auto object-contain shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3 : ONLINE RESERVATION */}
      <section
        className="relative w-full py-40 bg-cover bg-center flex flex-col items-center"
        style={{ backgroundImage: `url(${buImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 w-full max-w-6xl px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-wide">Online reservation</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-white" />
                <label className="text-xs uppercase tracking-[0.2em] text-white font-medium">Date</label>
              </div>
              <input type="date" className="bg-transparent border-b border-white/40 py-2 text-white focus:outline-none focus:border-white transition" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-white" />
                <label className="text-xs uppercase tracking-[0.2em] text-white font-medium">Time</label>
              </div>
              <input type="time" className="bg-transparent border-b border-white/40 py-2 text-white focus:outline-none focus:border-white transition" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-white" />
                <label className="text-xs uppercase tracking-[0.2em] text-white font-medium">Room Type</label>
              </div>
              <select className="bg-transparent border-b border-white/40 py-2 text-white focus:outline-none focus:border-white transition appearance-none cursor-pointer">
                <option className="bg-black">Study Room</option>
                <option className="bg-black">Co-working Space</option>
                <option className="bg-black">Private Office</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="px-12 py-4 bg-transparent border border-white text-white text-sm uppercase tracking-[0.2em] font-semibold hover:bg-white hover:text-black transition-all duration-300 active:scale-95">
              Check Availability
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4 : SIGNALEMENT (Corrigée) */}
      <section className="relative w-full py-32 bg-black flex flex-col items-center">
        <div className="w-full max-w-6xl px-6">
          <div className="flex flex-col items-center mb-16">
            <AlertTriangle className="text-white mb-4" size={40} strokeWidth={1} />
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-wide text-center">Report an Issue</h2>
            <div className="w-20 h-px bg-white/30 mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition-all duration-500 group">
                <Droplets size={32} className="mb-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs uppercase tracking-widest font-medium">Water</span>
              </button>
              <button className="flex flex-col items-center justify-center p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition-all duration-500 group">
                <Zap size={32} className="mb-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs uppercase tracking-widest font-medium">Electricity</span>
              </button>
              <button className="flex flex-col items-center justify-center p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition-all duration-500 group">
                <Wrench size={32} className="mb-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs uppercase tracking-widest font-medium">Damage</span>
              </button>
              <button className="flex flex-col items-center justify-center p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition-all duration-500 group">
                <AlertTriangle size={32} className="mb-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs uppercase tracking-widest font-medium">Other</span>
              </button>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <label className="text-xs uppercase tracking-[0.2em] text-gray-400">Location</label>
                <input type="text" placeholder="e.g. Building B, Room 204" className="bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition placeholder:text-gray-700" />
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-xs uppercase tracking-[0.2em] text-gray-400">Description</label>
                <textarea rows="3" placeholder="Tell us what's wrong..." className="bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition resize-none placeholder:text-gray-700"></textarea>
              </div>
              <button className="w-full mt-4 py-4 bg-white text-black font-bold uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-all active:scale-95">Submit Report</button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 : MÉTÉO & ENVIRONNEMENT */}
      <section
        className="relative w-full py-40 bg-cover bg-fixed bg-center"
        style={{ backgroundImage: `url(${meteoImage})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-white"></div>
                <span className="text-xs uppercase tracking-[0.4em] font-semibold">Live Campus Data</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-serif mb-8">22°C</h2>
              <div className="flex gap-10">
                <div className="flex flex-col gap-2">
                  <span className="text-gray-400 text-[10px] uppercase tracking-widest">Conditions</span>
                  <div className="flex items-center gap-2">
                    <Sun size={18} />
                    <span className="font-medium">Sunny Day</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-gray-400 text-[10px] uppercase tracking-widest">Air Quality</span>
                  <div className="flex items-center gap-2">
                    <Wind size={18} />
                    <span className="font-medium">Excellent (12)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl">
                <Thermometer className="mb-4 text-white/50" />
                <h4 className="text-3xl font-light mb-1">19°</h4>
                <p className="text-[10px] uppercase tracking-tighter text-gray-400">Indoor Temp</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl">
                <Droplets className="mb-4 text-white/50" />
                <h4 className="text-3xl font-light mb-1">45%</h4>
                <p className="text-[10px] uppercase tracking-tighter text-gray-400">Humidity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-20 bg-black border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="w-10">
            <img src={logoImage} alt="Logo" className="w-full opacity-50" />
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] text-gray-500">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-600">&copy; 2026 Smart Campus</p>
        </div>
      </footer>

    </div>
  );
}