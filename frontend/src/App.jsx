import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  GraduationCap, Users, Leaf, Calendar, Clock, MapPin,
  AlertTriangle, Droplets, Zap, Wrench, Thermometer, Wind, Sun, Building,
  Volume2, Wifi, Monitor, ArrowLeft
} from 'lucide-react';

import homeImage from './assets/home.png';
import logoImage from './assets/smartcompus.png';
import filleImage from './assets/fille.png';
import buImage from './assets/bu-bg.png';
import meteoImage from './assets/meteo.png';

// ============================================================================
// PAGE 1 : CHOIX DE L'HORAIRE DE RESERVATION
// ============================================================================
function ReservationPage() {
  const [selectedTime, setSelectedTime] = useState(null);

  const times = [
    "8h00", "9h00", "10h00", "11h00", "12h00", "13h00", "14h00",
    "15h00", "16h00", "17h00", "18h00", "19h00", "20h00", "21h00"
  ];

  return (
    <div
      className="h-screen overflow-hidden bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: `url(${buImage})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <nav className="relative z-10 flex justify-between items-center py-8 px-12 w-full">
        <div className="w-12 h-12">
          <Link to="/">
            <img src={logoImage} alt="Logo" className="w-full h-full object-contain" />
          </Link>
        </div>

        <div className="flex items-center gap-12 text-sm font-medium tracking-wide text-white">
          <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          <a href="#" className="hover:text-gray-300 transition">About Us</a>
          <Link to="/signup" className="hover:text-gray-400 transition">Sign Up</Link>
          <Link to="/login">
            <button className="bg-white text-black px-7 py-2.5 rounded-full font-semibold hover:bg-gray-200 transition">
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center -mt-10 px-4">
        <h1 className="text-6xl md:text-7xl font-serif text-white mb-2 tracking-wide text-center">
          Online reservation
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-12 font-light tracking-wider text-center">
          Those are the options that are available
        </p>

        <div className="w-full max-w-5xl bg-black/50 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col items-center p-8">

          <div className="grid grid-cols-3 md:grid-cols-7 w-full gap-y-8 gap-x-4 mb-10 text-center">
            {times.map((time, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(time)}
                className={`text-2xl font-light py-2 rounded-xl transition-all duration-300 ${selectedTime === time
                  ? "bg-white text-black font-medium scale-110 shadow-lg"
                  : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
              >
                {time}
              </button>
            ))}
          </div>

          <Link to="/room-info" state={{ time: selectedTime }}>
            <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-all duration-300">
              view informations about the room
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PAGE 2 : INFORMATIONS DÉTAILLÉES DE LA SALLE
// ============================================================================
function RoomInfoPage() {
  const location = useLocation();
  const selectedTime = location.state?.time || "your selected time";

  return (
    <div
      className="h-screen overflow-hidden bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: `url(${buImage})` }}
    >
      <div className="absolute inset-0 bg-black/65 backdrop-blur-md"></div>

      <nav className="relative z-10 flex justify-between items-center py-8 px-12 w-full">
        <div className="w-12 h-12">
          <Link to="/"><img src={logoImage} alt="Logo" className="w-full h-full object-contain" /></Link>
        </div>
      </nav>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center -mt-10 px-6">

        <div className="w-full max-w-6xl bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 shadow-2xl flex flex-col md:flex-row gap-16">

          {/* Colonne Gauche : Présentation et Équipements */}
          <div className="flex-1 flex flex-col justify-center">
            <Link to="/reservation" className="flex items-center gap-2 text-gray-400 hover:text-white transition w-fit mb-6 uppercase tracking-widest text-xs">
              <ArrowLeft size={16} /> Back to schedule
            </Link>

            <h2 className="text-5xl font-serif text-white mb-2">Study Room A-204</h2>
            <p className="text-gray-300 font-light mb-8">
              Booking for : <span className="font-bold text-white bg-white/10 px-3 py-1 rounded-lg ml-2">{selectedTime}</span>
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <div className="bg-white/10 p-3 rounded-xl"><Users size={20} /></div>
                <div><h4 className="text-sm font-bold uppercase tracking-widest">Capacity</h4><p className="text-xs text-gray-400">Up to 6 students</p></div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="bg-white/10 p-3 rounded-xl"><Wifi size={20} /></div>
                <div><h4 className="text-sm font-bold uppercase tracking-widest">Connectivity</h4><p className="text-xs text-gray-400">High-speed Campus Wi-Fi</p></div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="bg-white/10 p-3 rounded-xl"><Monitor size={20} /></div>
                <div><h4 className="text-sm font-bold uppercase tracking-widest">Equipments</h4><p className="text-xs text-gray-400">Smart Board & 4 Power Outlets</p></div>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Capteurs en direct & Bouton */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs uppercase tracking-widest text-gray-300 font-medium">Live Smart Sensors</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-white/5 border border-white/5 rounded-3xl p-6 hover:bg-white/10 transition cursor-default">
                <Thermometer className="text-white/40 mb-4" size={28} />
                <span className="block text-4xl text-white font-light mb-1">21°</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Temperature</span>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-3xl p-6 hover:bg-white/10 transition cursor-default">
                <Droplets className="text-white/40 mb-4" size={28} />
                <span className="block text-4xl text-white font-light mb-1">42%</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Humidity</span>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-3xl p-6 hover:bg-white/10 transition cursor-default">
                <Wind className="text-white/40 mb-4" size={28} />
                <span className="block text-4xl text-white font-light mb-1">98%</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Air Quality</span>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-3xl p-6 hover:bg-white/10 transition cursor-default">
                <Volume2 className="text-white/40 mb-4" size={28} />
                <span className="block text-4xl text-white font-light mb-1">35dB</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Noise (Quiet)</span>
              </div>
            </div>

            <button
              onClick={() => alert(`Room successfully booked for ${selectedTime} !`)}
              className="w-full py-5 bg-white text-black font-bold uppercase text-sm tracking-[0.2em] rounded-2xl hover:bg-gray-200 transition-all active:scale-95 shadow-xl"
            >
              Confirm Booking
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PAGE 3 : INSCRIPTION
// ============================================================================
function SignupPage() {
  return (
    <div className="h-screen overflow-hidden bg-cover bg-center flex items-center justify-center p-4" style={{ backgroundImage: `url(${homeImage})` }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-[5px]">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 shadow-2xl scale-80 origin-center">
          <h2 className="text-5xl font-serif text-white mb-2">Join Us !</h2>
          <p className="text-gray-300 text-base mb-8 font-light">Create an account to access our intelligent campus.</p>
          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm uppercase tracking-[0.2em] text-gray-300 font-medium ml-1">First Name</label>
                <input type="text" placeholder="John" className="bg-white/10 border border-white/5 rounded-2xl p-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm uppercase tracking-[0.2em] text-gray-300 font-medium ml-1">Last Name</label>
                <input type="text" placeholder="Doe" className="bg-white/10 border border-white/5 rounded-2xl p-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm uppercase tracking-[0.2em] text-gray-300 font-medium ml-1">Email</label>
              <input type="email" placeholder="Enter your email" className="bg-white/10 border border-white/5 rounded-2xl p-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm uppercase tracking-[0.2em] text-gray-300 font-medium ml-1">Password</label>
              <input type="password" placeholder="********" className="bg-white/10 border border-white/5 rounded-2xl p-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition" />
            </div>
            <button className="w-full bg-black text-white font-bold py-4 rounded-2xl hover:bg-white/5 transition-all active:scale-95 text-lg mt-2">Sign Up</button>
            <div className="relative flex items-center justify-center"><div className="w-full h-px bg-white/10"></div><span className="absolute bg-transparent px-4 text-gray-500 text-base italic">Or</span></div>
            <button className="w-full bg-white/20 backdrop-blur-md text-white font-medium py-4 rounded-2xl border border-white/10 hover:bg-white/30 transition flex items-center justify-center gap-3 text-base"><img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="google" />Sign up with google</button>
            <p className="text-center text-sm text-gray-400 pt-2">Already have an account? <Link to="/login"><span className="text-white font-bold cursor-pointer hover:underline">Log In</span></Link></p>
          </form>
        </div>
        <div className="hidden md:flex flex-col items-center justify-center text-center">
          <img src={logoImage} alt="Logo" className="w-28 h-28 mb-4" />
          <h1 className="text-5xl font-serif text-white tracking-wider mb-2">Smart Campus</h1>
          <p className="text-sm tracking-[0.3em] uppercase text-gray-200 font-light italic">The Character of success</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PAGE 4 : CONNEXION
// ============================================================================
function LoginPage() {
  return (
    <div className="h-screen overflow-hidden bg-cover bg-center flex items-center justify-center p-4" style={{ backgroundImage: `url(${homeImage})` }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-[5px]">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 shadow-2xl scale-80 origin-center">
          <h2 className="text-5xl font-serif text-white mb-2">Welcome !</h2>
          <p className="text-gray-300 text-base mb-10 font-light">Sign In to access our intelligent campus, and reserve your desk !</p>
          <form className="space-y-8">
            <div className="flex flex-col gap-3">
              <label className="text-sm uppercase tracking-[0.2em] text-gray-300 font-medium ml-1">Email</label>
              <input type="email" placeholder="Enter your email" className="bg-white/10 border border-white/5 rounded-2xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition" />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-sm uppercase tracking-[0.2em] text-gray-300 font-medium ml-1">Password</label>
              <input type="password" placeholder="********" className="bg-white/10 border border-white/5 rounded-2xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition" />
            </div>
            <div className="flex justify-between items-center px-1 text-sm"><label className="flex items-center gap-2 text-gray-400 cursor-pointer"><input type="checkbox" className="rounded border-white/10 bg-white/5" />Always remember me</label><a href="#" className="text-gray-400 hover:text-white transition">Forgot password ?</a></div>
            <button className="w-full bg-black text-white font-bold py-4 rounded-2xl hover:bg-white/5 transition-all active:scale-95 text-lg">Log In</button>
            <div className="relative flex items-center justify-center"><div className="w-full h-px bg-white/10"></div><span className="absolute bg-transparent px-4 text-gray-500 text-base italic">Or</span></div>
            <button className="w-full bg-white/20 backdrop-blur-md text-white font-medium py-4 rounded-2xl border border-white/10 hover:bg-white/30 transition flex items-center justify-center gap-3 text-base"><img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="google" />Sign in with google</button>
            <p className="text-center text-sm text-gray-400 pt-4">Don't have an account? <Link to="/signup"><span className="text-white font-bold cursor-pointer hover:underline">Sign Up</span></Link></p>
          </form>
        </div>
        <div className="hidden md:flex flex-col items-center justify-center text-center">
          <img src={logoImage} alt="Logo" className="w-28 h-28 mb-4" />
          <h1 className="text-5xl font-serif text-white tracking-wider mb-2">Smart Campus</h1>
          <p className="text-sm tracking-[0.3em] uppercase text-gray-200 font-light italic">The Character of success</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PAGE 5 : SIGNALEMENT (REPORT) - Version optimisée responsive
// ============================================================================
function ReportPage() {
  const [category, setCategory] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReport = (e) => {
    e.preventDefault();
    if (!category) {
      alert("Please select a category first !");
      return;
    }
    // Simulation d'un envoi réussi
    setIsSubmitted(true);
  };

  return (
    <div
      // Modification ici : min-h-screen et overflow-y-auto pour permettre le scroll si besoin
      className="min-h-screen overflow-y-auto bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: `url(${buImage})` }}
    >
      <div className="absolute inset-0 bg-black/65 backdrop-blur-md"></div>

      <nav className="relative z-10 flex justify-between items-center py-8 px-12 w-full">
        <div className="w-12 h-12">
          <Link to="/">
            <img src={logoImage} alt="Logo" className="w-full h-full object-contain" />
          </Link>
        </div>
      </nav>

      {/* Modification ici : -mt-24 au lieu de -mt-10 pour remonter le bloc, et pb-10 pour l'espace en bas */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center -mt-24 px-6 pb-10">

        {/* Modification ici : p-8 au lieu de p-12, et gap-10 au lieu de gap-16 pour tasser légèrement */}
        <div className="w-full max-w-6xl bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 shadow-2xl flex flex-col md:flex-row gap-10">

          <div className="flex-1 flex flex-col justify-center">
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition w-fit mb-6 uppercase tracking-widest text-xs">
              <ArrowLeft size={16} /> Back to Home
            </Link>

            <h2 className="text-5xl font-serif text-white mb-2 flex items-center gap-4">
              <AlertTriangle size={40} className="text-white/80" />
              Report Issue
            </h2>
            <p className="text-gray-300 font-light mb-8 leading-relaxed">
              Help us maintain a perfect environment. Select the type of issue, specify the location, and our maintenance team will be notified in real-time.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 w-fit">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-2">Live Response Time</h4>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm">Team is currently active (~15 min ETA)</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {isSubmitted ? (
              <div className="text-center bg-green-500/10 border border-green-500/20 rounded-3xl p-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Report Submitted!</h3>
                <p className="text-gray-400 mb-6">Thank you for keeping our campus smart and safe.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-gray-200 transition"
                >
                  Submit another issue
                </button>
              </div>
            ) : (
              <form onSubmit={handleReport} className="flex flex-col gap-6">

                <div className="grid grid-cols-2 gap-4 mb-2">
                  <button type="button" onClick={() => setCategory('water')} className={`p-6 border rounded-3xl transition flex flex-col items-center justify-center gap-3 ${category === 'water' ? 'bg-white text-black border-white' : 'border-white/10 text-white hover:bg-white/10'}`}>
                    <Droplets size={28} />
                    <span className="text-xs uppercase tracking-widest font-semibold">Water</span>
                  </button>
                  <button type="button" onClick={() => setCategory('electricity')} className={`p-6 border rounded-3xl transition flex flex-col items-center justify-center gap-3 ${category === 'electricity' ? 'bg-white text-black border-white' : 'border-white/10 text-white hover:bg-white/10'}`}>
                    <Zap size={28} />
                    <span className="text-xs uppercase tracking-widest font-semibold">Power</span>
                  </button>
                  <button type="button" onClick={() => setCategory('damage')} className={`p-6 border rounded-3xl transition flex flex-col items-center justify-center gap-3 ${category === 'damage' ? 'bg-white text-black border-white' : 'border-white/10 text-white hover:bg-white/10'}`}>
                    <Wrench size={28} />
                    <span className="text-xs uppercase tracking-widest font-semibold">Damage</span>
                  </button>
                  <button type="button" onClick={() => setCategory('other')} className={`p-6 border rounded-3xl transition flex flex-col items-center justify-center gap-3 ${category === 'other' ? 'bg-white text-black border-white' : 'border-white/10 text-white hover:bg-white/10'}`}>
                    <AlertTriangle size={28} />
                    <span className="text-xs uppercase tracking-widest font-semibold">Other</span>
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Exact Location (e.g., Room A-204)"
                  required
                  className="bg-white/10 border border-white/5 rounded-2xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition"
                />
                <textarea
                  rows="3"
                  placeholder="Describe the issue briefly..."
                  required
                  className="bg-white/10 border border-white/5 rounded-2xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition resize-none"
                ></textarea>

                <button type="submit" className="w-full py-5 bg-white text-black font-bold uppercase text-sm tracking-[0.2em] rounded-2xl hover:bg-gray-200 transition-all active:scale-95 shadow-xl mt-2">
                  Send Alert
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PAGE 6 : ACCUEIL PRINCIPALE
// ============================================================================
function LandingPage() {
  return (
    <>
      <section className="relative min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: `url(${homeImage})` }}>
        <div className="absolute inset-0 bg-black/45"></div>
        <nav className="relative z-10 flex justify-between items-center py-8 px-12 w-full text-white">
          <div className="w-12 h-12">
            <Link to="/"><img src={logoImage} alt="Logo" className="w-full h-full object-contain" /></Link>
          </div>
          <div className="flex items-center gap-12 text-sm font-medium tracking-wide">
            <a href="#" className="hover:text-gray-300 transition">Home</a>
            <a href="#" className="hover:text-gray-300 transition">About Us</a>
            <Link to="/signup" className="hover:text-gray-300 transition">Sign Up</Link>
            <Link to="/login"><button className="bg-white text-black px-7 py-2.5 rounded-full font-semibold hover:bg-gray-200 transition">Sign In</button></Link>
          </div>
        </nav>
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6">
          <div className="flex flex-col items-center mb-20 -mt-10">
            <div className="w-24 h-24 mb-6"><img src={logoImage} alt="Logo Smart Campus" className="w-full h-full object-contain" /></div>
            <h1 className="text-7xl font-serif mb-3 tracking-wider text-white">Smart Campus</h1>
            <p className="text-lg tracking-[0.3em] uppercase text-gray-200 font-light">The Character of success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4 text-white">
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

      <section className="relative w-full py-40 bg-cover bg-center flex flex-col items-center" style={{ backgroundImage: `url(${buImage})` }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 w-full max-w-6xl px-6">
          <div className="text-center mb-20"><h2 className="text-5xl font-serif text-white tracking-wide">Online reservation</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="flex flex-col gap-4"><div className="flex items-center gap-3"><Calendar size={20} className="text-white" /><label className="text-sm uppercase tracking-[0.2em] text-white font-medium">Date</label></div><input type="date" className="bg-transparent border-b border-white/40 py-2 text-white outline-none" /></div>
            <div className="flex flex-col gap-4"><div className="flex items-center gap-3"><Clock size={20} className="text-white" /><label className="text-sm uppercase tracking-[0.2em] text-white font-medium">Time</label></div><input type="time" className="bg-transparent border-b border-white/40 py-2 text-white outline-none" /></div>
            <div className="flex flex-col gap-4"><div className="flex items-center gap-3"><MapPin size={20} className="text-white" /><label className="text-sm uppercase tracking-[0.2em] text-white font-medium">Room Type</label></div><select className="bg-transparent border-b border-white/40 py-2 text-white outline-none appearance-none"><option className="bg-black">Study Room</option></select></div>
          </div>
          <div className="flex justify-center">
            <Link to="/reservation">
              <button className="px-12 py-4 bg-transparent border border-white text-white text-sm uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-all">Check Availability</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative w-full py-32 bg-black flex flex-col items-center text-white">
        <div className="w-full max-w-6xl px-6">
          <div className="flex flex-col items-center mb-16"><AlertTriangle className="mb-4" size={40} /><h2 className="text-5xl font-serif">Report an Issue</h2><div className="w-20 h-px bg-white/30 mt-6"></div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="grid grid-cols-2 gap-4 text-white">
              <button className="p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition flex flex-col items-center"><Droplets size={32} className="mb-4" /><span className="text-xs uppercase tracking-widest">Water</span></button>
              <button className="p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition flex flex-col items-center"><Zap size={32} className="mb-4" /><span className="text-xs uppercase tracking-widest">Electricity</span></button>
              <button className="p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition flex flex-col items-center"><Wrench size={32} className="mb-4" /><span className="text-xs uppercase tracking-widest">Damage</span></button>
              <button className="p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition flex flex-col items-center"><AlertTriangle size={32} className="mb-4" /><span className="text-xs uppercase tracking-widest">Other</span></button>
            </div>
            <div className="flex flex-col gap-8">
              <Link to="/report" className="w-full">
                <button className="w-full py-4 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-gray-200 transition">
                  Open Reporting Tool
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

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

// ============================================================================
// ROUTEUR PRINCIPAL
// ============================================================================
export default function App() {
  return (
    <div className="min-h-screen font-sans bg-gray-900 text-white flex flex-col">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/room-info" element={<RoomInfoPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </div>
  );
}