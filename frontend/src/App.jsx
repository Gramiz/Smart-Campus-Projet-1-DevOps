import { Routes, Route, Link } from 'react-router-dom';
import { GraduationCap, Users, Leaf, Calendar, Clock, MapPin, AlertTriangle, Droplets, Zap, Wrench, Thermometer, Wind, Sun } from 'lucide-react';

import homeImage from './assets/home.png';
import logoImage from './assets/smartcompus.png';
import filleImage from './assets/fille.png';
import buImage from './assets/bu.png';
import meteoImage from './assets/meteo.png';

// --- COMPOSANT PAGE D'INSCRIPTION (NOUVEAU) ---
function SignupPage() {
  return (
    <div
      className="h-screen overflow-hidden bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${homeImage})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center -mt-[15px]">

        {/* Formulaire (Côté Gauche) */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 shadow-2xl scale-80 origin-center">
          <h2 className="text-5xl font-serif text-white mb-2">Join Us !</h2>
          <p className="text-gray-300 text-base mb-8 font-light">
            Create an account to access our intelligent campus.
          </p>

          <form className="space-y-5">
            {/* Prénom et Nom côte à côte pour gagner de la place */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm uppercase tracking-[0.2em] text-gray-300 font-medium ml-1">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="bg-white/10 border border-white/5 rounded-2xl p-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm uppercase tracking-[0.2em] text-gray-300 font-medium ml-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="bg-white/10 border border-white/5 rounded-2xl p-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm uppercase tracking-[0.2em] text-gray-300 font-medium ml-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border border-white/5 rounded-2xl p-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm uppercase tracking-[0.2em] text-gray-300 font-medium ml-1">Password</label>
              <input
                type="password"
                placeholder="********"
                className="bg-white/10 border border-white/5 rounded-2xl p-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition"
              />
            </div>

            <button className="w-full bg-black text-white font-bold py-4 rounded-2xl hover:bg-white/5 transition-all active:scale-95 text-lg mt-2">
              Sign Up
            </button>

            <div className="relative flex items-center justify-center">
              <div className="w-full h-px bg-white/10"></div>
              <span className="absolute bg-transparent px-4 text-gray-500 text-base italic">Or</span>
            </div>

            <button className="w-full bg-white/20 backdrop-blur-md text-white font-medium py-4 rounded-2xl border border-white/10 hover:bg-white/30 transition flex items-center justify-center gap-3 text-base">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="google" />
              Sign up with google
            </button>

            <p className="text-center text-sm text-gray-400 pt-2">
              Already have an account?{' '}
              <Link to="/login">
                <span className="text-white font-bold cursor-pointer hover:underline">Log In</span>
              </Link>
            </p>
          </form>
        </div>

        {/* Logo & Texte (Côté Droit) */}
        <div className="hidden md:flex flex-col items-center justify-center text-center">
          <img src={logoImage} alt="Logo" className="w-28 h-28 mb-4" />
          <h1 className="text-5xl font-serif text-white tracking-wider mb-2">Smart Campus</h1>
          <p className="text-sm tracking-[0.3em] uppercase text-gray-200 font-light italic">
            The Character of success
          </p>
        </div>
      </div>
    </div>
  );
}

// --- COMPOSANT PAGE DE CONNEXION ---
function LoginPage() {
  return (
    <div
      className="h-screen overflow-hidden bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${homeImage})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center -mt-[15px]">

        {/* Formulaire (Côté Gauche) */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 shadow-2xl scale-80 origin-center">
          <h2 className="text-5xl font-serif text-white mb-2">Welcome !</h2>
          <p className="text-gray-300 text-base mb-10 font-light">
            Sign In to access our intelligent campus, and reserve your desk !
          </p>

          <form className="space-y-8">
            <div className="flex flex-col gap-3">
              <label className="text-sm uppercase tracking-[0.2em] text-gray-300 font-medium ml-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border border-white/5 rounded-2xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm uppercase tracking-[0.2em] text-gray-300 font-medium ml-1">Password</label>
              <input
                type="password"
                placeholder="********"
                className="bg-white/10 border border-white/5 rounded-2xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition"
              />
            </div>

            <div className="flex justify-between items-center px-1 text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" className="rounded border-white/10 bg-white/5" />
                Always remember me
              </label>
              <a href="#" className="text-gray-400 hover:text-white transition">Forgot password ?</a>
            </div>

            <button className="w-full bg-black text-white font-bold py-4 rounded-2xl hover:bg-white/5 transition-all active:scale-95 text-lg">
              Log In
            </button>

            <div className="relative flex items-center justify-center">
              <div className="w-full h-px bg-white/10"></div>
              <span className="absolute bg-transparent px-4 text-gray-500 text-base italic">Or</span>
            </div>

            <button className="w-full bg-white/20 backdrop-blur-md text-white font-medium py-4 rounded-2xl border border-white/10 hover:bg-white/30 transition flex items-center justify-center gap-3 text-base">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="google" />
              Sign in with google
            </button>

            <p className="text-center text-sm text-gray-400 pt-4">
              Don't have an account?{' '}
              {/* Le lien vers Sign Up */}
              <Link to="/signup">
                <span className="text-white font-bold cursor-pointer hover:underline">Sign Up</span>
              </Link>
            </p>
          </form>
        </div>

        {/* Logo & Texte (Côté Droit) */}
        <div className="hidden md:flex flex-col items-center justify-center text-center">
          <img src={logoImage} alt="Logo" className="w-28 h-28 mb-4" />
          <h1 className="text-5xl font-serif text-white tracking-wider mb-2">Smart Campus</h1>
          <p className="text-sm tracking-[0.3em] uppercase text-gray-200 font-light italic">
            The Character of success
          </p>
        </div>
      </div>
    </div>
  );
}

// --- COMPOSANT PAGE D'ACCUEIL ---
function LandingPage() {
  return (
    <>
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
            <a href="#" className="hover:text-gray-300 transition">About Us</a>
            {/* Le lien vers Sign Up sur la page d'accueil */}
            <Link to="/signup" className="hover:text-gray-400 transition">Sign Up</Link>
            <Link to="/login">
              <button className="bg-white text-black px-7 py-2.5 rounded-full font-semibold hover:bg-gray-200 transition">
                Sign In
              </button>
            </Link>
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
              <div className="bg-white/5 p-3 rounded-xl"><GraduationCap className="w-10 h-10 text-white" /></div>
              <div><h3 className="font-bold text-2xl mb-2">Student</h3><p className="text-sm text-gray-300 font-light italic">Find, book, and report: your campus in real-time.</p></div>
            </div>
            <div className="bg-black/55 backdrop-blur-xl rounded-[2rem] p-8 flex items-start gap-6 border border-white/10 hover:bg-black/65 transition-all duration-300 group cursor-pointer">
              <div className="bg-white/5 p-3 rounded-xl"><Users className="w-10 h-10 text-white" /></div>
              <div><h3 className="font-bold text-2xl mb-2">Staff</h3><p className="text-sm text-gray-300 font-light italic">Monitor, manage, and optimize your campus infrastructure.</p></div>
            </div>
            <div className="bg-black/55 backdrop-blur-xl rounded-[2rem] p-8 flex items-start gap-6 border border-white/10 hover:bg-black/65 transition-all duration-300 group cursor-pointer">
              <div className="bg-white/5 p-3 rounded-xl"><Leaf className="w-10 h-10 text-white" /></div>
              <div><h3 className="font-bold text-2xl mb-2">Sustainability</h3><p className="text-sm text-gray-300 font-light italic">Smart energy management for a greener campus.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Reste de tes sections (Présentation, Reservation, Signalement, Météo...) */}
      <section className="relative w-full flex flex-col md:flex-row bg-black min-h-[400px] z-20">
        <div className="w-full md:w-1/2 p-12 md:pl-24 flex flex-col justify-center text-white">
          <h2 className="text-6xl font-serif mb-6">Smart Campus</h2>
          <p className="text-gray-300 max-w-lg font-light">Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
        </div>
        <div className="w-full md:w-1/2 relative flex items-center justify-center md:justify-end md:pr-12">
          <div className="relative w-full max-w-[270px] -mt-20 left-[-50px] -mb-20 z-30">
            <img src={filleImage} className="w-full h-auto shadow-2xl" alt="fille" />
          </div>
        </div>
      </section>

      {/* SECTION 3 : RESERVATION */}
      <section className="relative w-full py-40 bg-cover bg-center flex flex-col items-center" style={{ backgroundImage: `url(${buImage})` }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 w-full max-w-6xl px-6">
          <div className="text-center mb-20"><h2 className="text-5xl font-serif text-white tracking-wide">Online reservation</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="flex flex-col gap-4"><div className="flex items-center gap-3"><Calendar size={20} className="text-white" /><label className="text-xs uppercase tracking-[0.2em] text-white font-medium">Date</label></div><input type="date" className="bg-transparent border-b border-white/40 py-2 text-white outline-none" /></div>
            <div className="flex flex-col gap-4"><div className="flex items-center gap-3"><Clock size={20} className="text-white" /><label className="text-xs uppercase tracking-[0.2em] text-white font-medium">Time</label></div><input type="time" className="bg-transparent border-b border-white/40 py-2 text-white outline-none" /></div>
            <div className="flex flex-col gap-4"><div className="flex items-center gap-3"><MapPin size={20} className="text-white" /><label className="text-xs uppercase tracking-[0.2em] text-white font-medium">Room Type</label></div><select className="bg-transparent border-b border-white/40 py-2 text-white outline-none appearance-none"><option className="bg-black">Study Room</option></select></div>
          </div>
          <div className="flex justify-center"><button className="px-12 py-4 bg-transparent border border-white text-white text-sm uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-all">Check Availability</button></div>
        </div>
      </section>

      {/* SECTION 4 : SIGNALEMENT */}
      <section className="relative w-full py-32 bg-black flex flex-col items-center text-white">
        <div className="w-full max-w-6xl px-6">
          <div className="flex flex-col items-center mb-16"><AlertTriangle className="mb-4" size={40} /><h2 className="text-5xl font-serif">Report an Issue</h2><div className="w-20 h-px bg-white/30 mt-6"></div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition flex flex-col items-center"><Droplets size={32} className="mb-4" /><span className="text-xs uppercase tracking-widest">Water</span></button>
              <button className="p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition flex flex-col items-center"><Zap size={32} className="mb-4" /><span className="text-xs uppercase tracking-widest">Electricity</span></button>
              <button className="p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition flex flex-col items-center"><Wrench size={32} className="mb-4" /><span className="text-xs uppercase tracking-widest">Damage</span></button>
              <button className="p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition flex flex-col items-center"><AlertTriangle size={32} className="mb-4" /><span className="text-xs uppercase tracking-widest">Other</span></button>
            </div>
            <div className="flex flex-col gap-8">
              <input type="text" placeholder="Location" className="bg-transparent border-b border-white/20 py-3 outline-none" />
              <textarea rows="3" placeholder="Description" className="bg-transparent border-b border-white/20 py-3 outline-none resize-none"></textarea>
              <button className="w-full py-4 bg-white text-black font-bold uppercase text-xs tracking-widest">Submit Report</button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 : METEO */}
      <section className="relative w-full py-40 bg-cover bg-fixed bg-center" style={{ backgroundImage: `url(${meteoImage})` }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center text-white">
          <div><span className="text-xs uppercase tracking-[0.4em]">Live Campus Data</span><h2 className="text-8xl font-serif mb-8">22°C</h2></div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10"><Thermometer className="mb-4 opacity-50" /><h4 className="text-3xl font-light">19°</h4><p className="text-xs uppercase text-gray-400">Indoor Temp</p></div>
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10"><Droplets className="mb-4 opacity-50" /><h4 className="text-3xl font-light">45%</h4><p className="text-xs uppercase text-gray-400">Humidity</p></div>
          </div>
        </div>
      </section>

      <footer className="w-full py-20 bg-black border-t border-white/5 text-gray-600 flex flex-col items-center">
        <img src={logoImage} alt="Logo" className="w-10 opacity-50 mb-8" />
        <p className="text-xs uppercase tracking-widest">&copy; 2026 Smart Campus</p>
      </footer>
    </>
  );
}

// --- LOGIQUE PRINCIPALE DU ROUTER ---
export default function App() {
  return (
    <div className="min-h-screen font-sans bg-gray-900 text-white flex flex-col">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* NOUVELLE ROUTE POUR L'INSCRIPTION */}
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}