import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  authAPI,
  incidentsAPI,
  bookingsAPI,
  roomsAPI,
  sensorsAPI,
} from "./api";
import {
  GraduationCap,
  Users,
  Leaf,
  Calendar,
  Clock,
  MapPin,
  AlertTriangle,
  Droplets,
  Zap,
  Wrench,
  Thermometer,
  Wind,
  Wifi,
  Monitor,
  ArrowLeft,
  ChevronDown,
  LogOut,
  BookOpen,
  ClipboardList,
  CheckCircle,
  Clock3,
} from "lucide-react";

import homeImage from "./assets/home.png";
import logoImage from "./assets/smartcompus.png";
import filleImage from "./assets/fille.png";
import buImage from "./assets/bu-bg.png";
import meteoImage from "./assets/meteo.png";

// ============================================================================
// HOOK D'AUTHENTIFICATION
// ============================================================================
/**
 * Hook personnalisé gérant l'état d'authentification de l'utilisateur.
 * Récupère automatiquement le profil depuis l'API si un token JWT est présent
 * dans le localStorage, et expose une fonction de déconnexion.
 */
function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await authAPI.getMe();
          setUser(res.data);
        } catch (err) {
          console.error(
            "Erreur lors de la récupération du profil utilisateur :",
            err,
          );
        }
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    // Suppression du token et rechargement complet pour réinitialiser l'état global
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  return { user, logout };
}

// ============================================================================
// COMPOSANT : USER MENU (DROPDOWN)
// ============================================================================
function UserMenu({ user, logout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white font-medium bg-white/10 px-4 py-2 rounded-full border border-white/10 shadow-sm backdrop-blur-md hover:bg-white/20 transition-all text-sm"
      >
        <span className="max-w-[120px] truncate">
          {user.first_name} {user.last_name}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-3 w-64 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-white/5">
              <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">
                Session active
              </p>
              <p className="text-sm text-white truncate">{user.email}</p>
            </div>
            <div className="p-2">
              <Link
                to="/my-bookings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition"
              >
                <BookOpen size={18} />
                Mes réservations
              </Link>
              <Link
                to="/my-incidents"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition"
              >
                <ClipboardList size={18} />
                Mes signalements
              </Link>
              <div className="h-px bg-white/5 my-2 mx-2"></div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition"
              >
                <LogOut size={18} />
                Déconnexion
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================================
// COMPOSANT : NAVBAR COMMUNE (RESPONSIVE)
// ============================================================================
function Navbar({ user, logout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  /**
   * Gère le clic sur le lien "À propos".
   * Si la section est présente dans le DOM (page d'accueil), on fait défiler
   * vers elle directement. Sinon, on redirige vers la page d'accueil avec l'ancre.
   */
  const handleAboutClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    const section = document.getElementById("about");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#about");
    }
  };

  return (
    <nav className="relative z-50 w-full text-white">
      {/* Barre principale */}
      <div className="flex justify-between items-center py-5 px-5 sm:px-8 md:px-12">
        <div className="w-10 h-10 flex-shrink-0">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img
              src={logoImage}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </Link>
        </div>

        {/* Menu desktop */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12 text-sm font-medium tracking-wide">
          <Link to="/" className="hover:text-gray-300 transition">
            Accueil
          </Link>
          <a
            href="#about"
            onClick={handleAboutClick}
            className="hover:text-gray-300 transition cursor-pointer"
          >
            À propos
          </a>
          {user ? (
            <UserMenu user={user} logout={logout} />
          ) : (
            <>
              <Link to="/signup" className="hover:text-gray-300 transition">
                S'inscrire
              </Link>
              <Link to="/login">
                <button className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition text-sm">
                  Se connecter
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Bouton burger mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl z-50 px-5 py-4 flex flex-col gap-1">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-3 text-sm font-medium text-white hover:bg-white/10 rounded-xl transition"
          >
            Accueil
          </Link>
          <a
            href="#about"
            onClick={handleAboutClick}
            className="px-4 py-3 text-sm font-medium text-white hover:bg-white/10 rounded-xl transition cursor-pointer"
          >
            À propos
          </a>
          {user ? (
            <>
              <div className="h-px bg-white/10 my-1"></div>
              <p className="px-4 py-1 text-xs text-gray-500 uppercase tracking-widest">
                {user.first_name} {user.last_name}
              </p>
              <Link
                to="/my-bookings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition"
              >
                <BookOpen size={16} /> Mes réservations
              </Link>
              <Link
                to="/my-incidents"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition"
              >
                <ClipboardList size={16} /> Mes signalements
              </Link>
              <div className="h-px bg-white/10 my-1"></div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
                className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition w-full text-left"
              >
                <LogOut size={16} /> Déconnexion
              </button>
            </>
          ) : (
            <>
              <div className="h-px bg-white/10 my-1"></div>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-white hover:bg-white/10 rounded-xl transition"
              >
                S'inscrire
              </Link>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="mx-4 my-1 py-3 bg-white text-black font-bold rounded-full text-sm text-center hover:bg-gray-200 transition"
              >
                Se connecter
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

// ============================================================================
// PAGE 1 : CHOIX DE L'HORAIRE DE RESERVATION
// ============================================================================
function ReservationPage() {
  const { user, logout } = useAuth();
  const [selectedHeure, setSelectedHeure] = useState(null);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(false);

  const handleHeureSelect = async (time) => {
    setSelectedHeure(time);
    setLoadingRooms(true);

    // Extraction du chiffre de l'heure depuis un format "8h00", "14h00", etc.
    const hourMatch = time.match(/(\d+)/);
    const hour = hourMatch ? parseInt(hourMatch[1], 10) : null;
    if (hour === null) {
      setLoadingRooms(false);
      return;
    }

    // Construction des bornes ISO pour la plage horaire d'une heure
    const today = new Date();
    today.setHours(hour, 0, 0, 0);
    const startHeure = today.toISOString();

    today.setHours(hour + 1, 0, 0, 0);
    const endHeure = today.toISOString();

    try {
      const res = await roomsAPI.getAvailable(startHeure, endHeure);
      setAvailableRooms(res.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des salles disponibles :",
        error,
      );
    } finally {
      setLoadingRooms(false);
    }
  };

  const times = [
    "8h00",
    "9h00",
    "10h00",
    "11h00",
    "12h00",
    "13h00",
    "14h00",
    "15h00",
    "16h00",
    "17h00",
    "18h00",
    "19h00",
    "20h00",
    "21h00",
  ];

  return (
    <div
      className="h-screen overflow-hidden bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: `url(${buImage})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <Navbar user={user} logout={logout} />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-6 px-3 sm:px-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-2 tracking-wide text-center">
          Réservation en ligne
        </h1>
        <p className="text-base sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-12 font-light tracking-wider text-center">
          Voici les créneaux disponibles
        </p>

        <div className="w-full max-w-5xl bg-black/50 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col items-center p-4 sm:p-8">
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-7 w-full gap-y-4 sm:gap-y-8 gap-x-2 sm:gap-x-4 mb-6 sm:mb-10 text-center">
            {times.map((time, index) => (
              <button
                key={index}
                onClick={() => handleHeureSelect(time)}
                className={`text-lg sm:text-2xl font-light py-2 rounded-xl transition-all duration-300 ${
                  selectedHeure === time
                    ? "bg-white text-black font-medium scale-110 shadow-lg"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          {selectedHeure && (
            <div className="w-full flex flex-col items-center mt-6">
              <h3 className="text-2xl text-white font-light mb-6">
                Salles disponibles à {selectedHeure}
              </h3>
              {loadingRooms ? (
                <div className="text-white animate-pulse">
                  Chargement des salles...
                </div>
              ) : availableRooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                  {availableRooms.map((room) => (
                    <Link
                      key={room.id}
                      to="/room-info"
                      state={{ time: selectedHeure, room: room }}
                    >
                      <div className="bg-black/40 hover:bg-white/20 border border-white/20 rounded-2xl p-6 transition-all cursor-pointer text-left shadow-lg">
                        <h4 className="text-xl font-bold text-white mb-2">
                          {room.name}
                        </h4>
                        <div className="flex justify-between items-center text-sm text-gray-300">
                          <span className="capitalize">{room.room_type}</span>
                          <span>Capacité : {room.capacity}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-gray-300 italic">
                  Aucune salle disponible pour cet horaire.
                </div>
              )}
            </div>
          )}
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
  const navigate = useNavigate();
  const selectedHeure = location.state?.time || "Heure non définie";
  // Salle par défaut utilisée uniquement si la page est accédée directement (sans navigation)
  const room = location.state?.room || {
    id: 1,
    name: "Salle d'étude A-204",
    capacity: 6,
  };

  const [sensorsData, setSensorsData] = useState([]);
  const [loadingSensors, setLoadingSensors] = useState(true);

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        setLoadingSensors(true);
        const resSensors = await sensorsAPI.getByRoom(room.id);
        const sensors = resSensors.data;

        // Enrichissement de chaque capteur avec sa dernière valeur mesurée.
        // Les requêtes sont exécutées en parallèle pour optimiser les performances.
        const enrichedSensors = await Promise.all(
          sensors.map(async (sensor) => {
            try {
              const dataRes = await sensorsAPI.getLatestData(sensor.id);
              const latestData =
                dataRes.data.length > 0 ? dataRes.data[0].value : null;
              return { ...sensor, latestValue: latestData };
            } catch {
              // En cas d'échec individuel, on retourne null pour ne pas bloquer les autres capteurs
              return { ...sensor, latestValue: null };
            }
          }),
        );
        setSensorsData(enrichedSensors);
      } catch (error) {
        console.error("Erreur lors de la récupération des capteurs :", error);
      } finally {
        setLoadingSensors(false);
      }
    };
    fetchSensors();
  }, [room.id]);

  /** Retourne l'icône Lucide correspondant au type de capteur. */
  const getSensorIcon = (type) => {
    switch (type) {
      case "temperature":
        return <Thermometer className="text-white/40 mb-4" size={28} />;
      case "occupancy":
        return <Users className="text-white/40 mb-4" size={28} />;
      case "energy":
        return <Zap className="text-white/40 mb-4" size={28} />;
      default:
        return <Wind className="text-white/40 mb-4" size={28} />;
    }
  };

  const handleBooking = async () => {
    // Reconstruction des bornes ISO à partir du format "8h00" transmis par la page précédente
    const hourMatch = selectedHeure.match(/(\d+)/);
    const hour = hourMatch ? parseInt(hourMatch[1], 10) : null;
    if (hour === null) {
      alert("Veuillez d'abord sélectionner une heure valide.");
      return;
    }

    const today = new Date();
    today.setHours(hour, 0, 0, 0);
    const startHeure = today.toISOString();

    today.setHours(hour + 1, 0, 0, 0);
    const endHeure = today.toISOString();

    try {
      await bookingsAPI.create({
        room_id: room.id,
        start_time: startHeure,
        end_time: endHeure,
        status: "confirmed",
      });
      alert(`Salle réservée avec succès pour ${selectedHeure} !`);
      navigate("/");
    } catch (err) {
      alert(
        "Échec de la réservation : " +
          (err.response?.data?.detail || err.message),
      );
    }
  };

  return (
    <div
      className="h-screen overflow-hidden bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: `url(${buImage})` }}
    >
      <div className="absolute inset-0 bg-black/65 backdrop-blur-md"></div>

      <Navbar user={null} logout={null} />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-6 px-3 sm:px-6 overflow-y-auto">
        <div className="w-full max-w-6xl bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Colonne Gauche : Présentation et Équipements */}
          <div className="flex-1 flex flex-col justify-center">
            <Link
              to="/reservation"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition w-fit mb-6 uppercase tracking-widest text-xs"
            >
              <ArrowLeft size={16} /> Retour aux horaires
            </Link>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-2">
              {room.name}
            </h2>
            <p className="text-gray-300 font-light mb-8">
              Réservation pour :{" "}
              <span className="font-bold text-white bg-white/10 px-3 py-1 rounded-lg ml-2">
                {selectedHeure}
              </span>
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest">
                    Capacité
                  </h4>
                  <p className="text-xs text-gray-400">
                    Jusqu'à {room.capacity || 6} étudiants
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Wifi size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest">
                    Connectivité
                  </h4>
                  <p className="text-xs text-gray-400">
                    Wi-Fi Haut Débit du Campus
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Monitor size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest">
                    Équipements
                  </h4>
                  <p className="text-xs text-gray-400">
                    Tableau Interactif & 4 Prises
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Capteurs en direct & Bouton */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs uppercase tracking-widest text-gray-300 font-medium">
                Capteurs Intelligents en Direct
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {loadingSensors ? (
                <div className="col-span-2 text-center text-white/50 py-10 animate-pulse">
                  Chargement des données des capteurs...
                </div>
              ) : sensorsData.length > 0 ? (
                sensorsData.map((sensor) => (
                  <div
                    key={sensor.id}
                    className="bg-white/5 border border-white/5 rounded-3xl p-6 hover:bg-white/10 transition cursor-default"
                  >
                    {getSensorIcon(sensor.sensor_type)}
                    <span className="block text-4xl text-white font-light mb-1">
                      {sensor.latestValue !== null ? sensor.latestValue : "--"}
                      <span className="text-xl ml-1 text-white/50">
                        {sensor.unit || ""}
                      </span>
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500">
                      {sensor.sensor_type}
                    </span>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center text-white/50 py-10">
                  Aucun capteur installé dans cette salle.
                </div>
              )}
            </div>

            <button
              onClick={handleBooking}
              className="w-full py-5 bg-white text-black font-bold uppercase text-sm tracking-[0.2em] rounded-2xl hover:bg-gray-200 transition-all active:scale-95 shadow-xl"
            >
              Confirmer la réservation
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
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await authAPI.register({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        role: "student",
      });
      alert("Compte créé avec succès !");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Échec de l'inscription");
    }
  };

  return (
    <div
      className="min-h-screen overflow-y-auto bg-cover bg-center flex items-center justify-center p-3 sm:p-4"
      style={{ backgroundImage: `url(${homeImage})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center py-6">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-8 md:p-10 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-2">
            Rejoignez-nous !
          </h2>
          <p className="text-gray-300 text-base mb-8 font-light">
            Créez un compte pour accéder à notre campus intelligent.
          </p>
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}
          <form className="space-y-5" onSubmit={handleSignup}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm uppercase tracking-[0.2em] text-gray-300 font-medium ml-1">
                  Prénom
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  required
                  className="bg-white/10 border border-white/5 rounded-2xl p-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm uppercase tracking-[0.2em] text-gray-300 font-medium ml-1">
                  Nom
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  required
                  className="bg-white/10 border border-white/5 rounded-2xl p-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm uppercase tracking-[0.2em] text-gray-300 font-medium ml-1">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre adresse e-mail"
                required
                className="bg-white/10 border border-white/5 rounded-2xl p-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm uppercase tracking-[0.2em] text-gray-300 font-medium ml-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                minLength="8"
                className="bg-white/10 border border-white/5 rounded-2xl p-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-4 rounded-2xl hover:bg-white/5 transition-all active:scale-95 text-lg mt-2"
            >
              S'inscrire
            </button>
            <div className="relative flex items-center justify-center">
              <div className="w-full h-px bg-white/10"></div>
              <span className="absolute bg-transparent px-4 text-gray-500 text-base italic">
                Ou
              </span>
            </div>
            <button className="w-full bg-white/20 backdrop-blur-md text-white font-medium py-4 rounded-2xl border border-white/10 hover:bg-white/30 transition flex items-center justify-center gap-3 text-base">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                className="w-5 h-5"
                alt="google"
              />
              S'inscrire avec Google
            </button>
            <p className="text-center text-sm text-gray-400 pt-2">
              Vous avez déjà un compte ?{" "}
              <Link to="/login">
                <span className="text-white font-bold cursor-pointer hover:underline">
                  Se connecter
                </span>
              </Link>
            </p>
          </form>
        </div>
        <div className="hidden md:flex flex-col items-center justify-center text-center">
          <img src={logoImage} alt="Logo" className="w-28 h-28 mb-4" />
          <h1 className="text-5xl font-serif text-white tracking-wider mb-2">
            Smart Campus
          </h1>
          <p className="text-sm tracking-[0.3em] uppercase text-gray-200 font-light italic">
            Le caractère du succès
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PAGE 4 : CONNEXION
// ============================================================================
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await authAPI.login({ email, password });
      localStorage.setItem("token", res.data.access_token);
      // Utilisation de href pour forcer un rechargement complet et vider les caches d'état
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.detail || "Échec de la connexion");
    }
  };

  return (
    <div
      className="min-h-screen overflow-y-auto bg-cover bg-center flex items-center justify-center p-3 sm:p-4"
      style={{ backgroundImage: `url(${homeImage})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center py-6">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-8 md:p-10 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-2">
            Bienvenue !
          </h2>
          <p className="text-gray-300 text-base mb-10 font-light">
            Connectez-vous pour accéder à votre campus intelligent et réserver
            vos espaces de travail.
          </p>
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}
          <form className="space-y-8" onSubmit={handleLogin}>
            <div className="flex flex-col gap-3">
              <label className="text-sm uppercase tracking-[0.2em] text-gray-300 font-medium ml-1">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Entrez votre adresse e-mail"
                className="bg-white/10 border border-white/5 rounded-2xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-sm uppercase tracking-[0.2em] text-gray-300 font-medium ml-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
                className="bg-white/10 border border-white/5 rounded-2xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition"
              />
            </div>
            <div className="flex justify-between items-center px-1 text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-white/10 bg-white/5"
                />
                Se souvenir de moi
              </label>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Mot de passe oublié ?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-4 rounded-2xl hover:bg-white/5 transition-all active:scale-95 text-lg"
            >
              Se connecter
            </button>
            <div className="relative flex items-center justify-center">
              <div className="w-full h-px bg-white/10"></div>
              <span className="absolute bg-transparent px-4 text-gray-500 text-base italic">
                Ou
              </span>
            </div>
            <button className="w-full bg-white/20 backdrop-blur-md text-white font-medium py-4 rounded-2xl border border-white/10 hover:bg-white/30 transition flex items-center justify-center gap-3 text-base">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                className="w-5 h-5"
                alt="google"
              />
              Se connecter avec Google
            </button>
            <p className="text-center text-sm text-gray-400 pt-4">
              Vous n'avez pas de compte ?{" "}
              <Link to="/signup">
                <span className="text-white font-bold cursor-pointer hover:underline">
                  S'inscrire
                </span>
              </Link>
            </p>
          </form>
        </div>
        <div className="hidden md:flex flex-col items-center justify-center text-center">
          <img src={logoImage} alt="Logo" className="w-28 h-28 mb-4" />
          <h1 className="text-5xl font-serif text-white tracking-wider mb-2">
            Smart Campus
          </h1>
          <p className="text-sm tracking-[0.3em] uppercase text-gray-200 font-light italic">
            Le caractère du succès
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PAGE 5 : SIGNALEMENT D'INCIDENT
// ============================================================================
function ReportPage() {
  const { user, logout } = useAuth();
  const [category, setCategory] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoadingRooms(true);
        const res = await roomsAPI.getAll();
        setRooms(res.data);
        if (res.data.length > 0) setRoomId(res.data[0].id.toString());
      } catch (err) {
        console.error("Erreur lors de la récupération des salles :", err);
      } finally {
        setLoadingRooms(false);
      }
    };
    fetchRooms();
  }, []);

  const handleReport = async (e) => {
    e.preventDefault();
    if (!category) {
      alert("Veuillez d'abord sélectionner une catégorie !");
      return;
    }
    setError(null);
    try {
      await incidentsAPI.create({
        // L'API attend un entier ; fallback sur 1 si la valeur n'est pas définie
        room_id: parseInt(roomId) || 1,
        //  La catégorie est préfixée en majuscules dans la description pour faciliter le tri côté back
        description: `[${category.toUpperCase()}] ${description}`,
        severity: "medium",
      });
      setIsSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.detail || "Échec de l'envoi du signalement");
    }
  };

  return (
    <div
      className="min-h-screen overflow-y-auto bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: `url(${buImage})` }}
    >
      <div className="absolute inset-0 bg-black/65 backdrop-blur-md"></div>

      <Navbar user={user} logout={logout} />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-10 px-6 pb-10">
        <div className="w-full max-w-6xl bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 shadow-2xl flex flex-col md:flex-row gap-10">
          <div className="flex-1 flex flex-col justify-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition w-fit mb-6 uppercase tracking-widest text-xs"
            >
              <ArrowLeft size={16} /> Retour à l'Accueil
            </Link>

            <h2 className="text-5xl font-serif text-white mb-2 flex items-center gap-4">
              <AlertTriangle size={40} className="text-white/80" />
              Signaler un problème
            </h2>
            <p className="text-gray-300 font-light mb-8 leading-relaxed">
              Aidez-nous à maintenir un environnement parfait. Sélectionnez le
              type de problème, indiquez le lieu, et notre équipe de maintenance
              sera alertée en temps réel.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 w-fit">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-2">
                Temps de réponse en direct
              </h4>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm">Équipe active (Attente ~15 min)</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {isSubmitted ? (
              <div className="text-center bg-green-500/10 border border-green-500/20 rounded-3xl p-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Signalement envoyé !
                </h3>
                <p className="text-gray-400 mb-6">
                  Merci de garder notre campus intelligent et sûr.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-gray-200 transition"
                >
                  Signaler un autre problème
                </button>
              </div>
            ) : (
              <form onSubmit={handleReport} className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <button
                    type="button"
                    onClick={() => setCategory("water")}
                    className={`p-6 border rounded-3xl transition flex flex-col items-center justify-center gap-3 ${category === "water" ? "bg-white text-black border-white" : "border-white/10 text-white hover:bg-white/10"}`}
                  >
                    <Droplets size={28} />
                    <span className="text-xs uppercase tracking-widest font-semibold">
                      Eau
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory("electricity")}
                    className={`p-6 border rounded-3xl transition flex flex-col items-center justify-center gap-3 ${category === "electricity" ? "bg-white text-black border-white" : "border-white/10 text-white hover:bg-white/10"}`}
                  >
                    <Zap size={28} />
                    <span className="text-xs uppercase tracking-widest font-semibold">
                      Électricité
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory("damage")}
                    className={`p-6 border rounded-3xl transition flex flex-col items-center justify-center gap-3 ${category === "damage" ? "bg-white text-black border-white" : "border-white/10 text-white hover:bg-white/10"}`}
                  >
                    <Wrench size={28} />
                    <span className="text-xs uppercase tracking-widest font-semibold">
                      Dégâts
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory("other")}
                    className={`p-6 border rounded-3xl transition flex flex-col items-center justify-center gap-3 ${category === "other" ? "bg-white text-black border-white" : "border-white/10 text-white hover:bg-white/10"}`}
                  >
                    <AlertTriangle size={28} />
                    <span className="text-xs uppercase tracking-widest font-semibold">
                      Autre
                    </span>
                  </button>
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-bold ml-1">
                    Lieu de l'incident
                  </label>
                  {loadingRooms ? (
                    <div className="bg-white/10 border border-white/5 rounded-2xl p-4 text-white animate-pulse">
                      Chargement des salles...
                    </div>
                  ) : (
                    <select
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      required
                      className="bg-white/10 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-white/20 transition appearance-none cursor-pointer"
                    >
                      {rooms.map((room) => (
                        <option
                          key={room.id}
                          value={room.id}
                          className="bg-black text-white"
                        >
                          {room.room_number} ({room.room_type})
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez brièvement le problème..."
                  required
                  className="bg-white/10 border border-white/5 rounded-2xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition resize-none"
                ></textarea>

                <button
                  type="submit"
                  className="w-full py-5 bg-white text-black font-bold uppercase text-sm tracking-[0.2em] rounded-2xl hover:bg-gray-200 transition-all active:scale-95 shadow-xl mt-2"
                >
                  Envoyer l'alerte
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
  const { user, logout } = useAuth();
  const [date, setDate] = useState("");
  const [time, setHeure] = useState("");
  const [roomType, setRoomType] = useState("study");

  const [availableRooms, setAvailableRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleCheckAvailability = async () => {
    if (!date || !time) {
      alert("Veuillez sélectionner une date et une heure");
      return;
    }

    setLoadingRooms(true);
    setHasSearched(true);

    try {
      // Construction des bornes ISO à partir des champs date (YYYY-MM-DD) et time (HH:MM)
      const startDateHeure = new Date(`${date}T${time}`);
      // Durée fixe d'une heure (3 600 000 ms)
      const endDateHeure = new Date(startDateHeure.getTime() + 60 * 60 * 1000);

      const res = await roomsAPI.getAvailable(
        startDateHeure.toISOString(),
        endDateHeure.toISOString(),
      );

      let filtered = res.data;
      // Filtre côté client : "all" retourne tous les types, sinon on filtre sur room_type
      if (roomType && roomType !== "all") {
        filtered = res.data.filter(
          (r) => r.room_type === roomType || roomType === "study",
        );
      }
      setAvailableRooms(filtered);
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des salles disponibles",
        err,
      );
    } finally {
      setLoadingRooms(false);
    }
  };

  // Conversion du format "HH:MM" en "HHhMM" pour l'affichage et la transmission via router state
  const formattedHeure = time ? time.replace(":", "h") : "";

  return (
    <>
      <section
        className="relative min-h-screen flex flex-col bg-cover bg-center"
        style={{ backgroundImage: `url(${homeImage})` }}
      >
        <div className="absolute inset-0 bg-black/45"></div>
        <Navbar user={user} logout={logout} />
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6">
          <div className="flex flex-col items-center mb-10 md:mb-20 py-6 md:py-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-4 md:mb-6">
              <img
                src={logoImage}
                alt="Logo Smart Campus"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif mb-3 tracking-wider text-white text-center">
              Smart Campus
            </h1>
            <p className="text-sm sm:text-base lg:text-lg tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gray-200 font-light text-center">
              Le caractère du succès
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-3 lg:gap-8 w-full max-w-6xl px-3 sm:px-4 text-white -mt-6 md:-mt-16">
            <div className="bg-black/55 backdrop-blur-xl rounded-[2rem] p-5 sm:p-6 lg:p-8 flex flex-row md:flex-col lg:flex-row items-start gap-4 md:gap-3 lg:gap-6 border border-white/10 hover:bg-black/65 transition-all duration-300 group cursor-pointer">
              <div className="bg-white/5 p-2 sm:p-3 rounded-xl flex-shrink-0">
                <GraduationCap className="w-7 h-7 lg:w-10 lg:h-10 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg md:text-base lg:text-xl xl:text-2xl mb-1 sm:mb-2">
                  Étudiant
                </h3>
                <p className="text-xs md:text-[11px] lg:text-xs xl:text-sm text-gray-300 font-light italic">
                  Trouvez, réservez et signalez : votre campus en temps réel.
                </p>
              </div>
            </div>
            <div className="bg-black/55 backdrop-blur-xl rounded-[2rem] p-5 sm:p-6 lg:p-8 flex flex-row md:flex-col lg:flex-row items-start gap-4 md:gap-3 lg:gap-6 border border-white/10 hover:bg-black/65 transition-all duration-300 group cursor-pointer">
              <div className="bg-white/5 p-2 sm:p-3 rounded-xl flex-shrink-0">
                <Users className="w-7 h-7 lg:w-10 lg:h-10 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg md:text-base lg:text-xl xl:text-2xl mb-1 sm:mb-2">
                  Personnel
                </h3>
                <p className="text-xs md:text-[11px] lg:text-xs xl:text-sm text-gray-300 font-light italic">
                  Surveillez, gérez et optimisez les infrastructures du campus.
                </p>
              </div>
            </div>
            <div className="bg-black/55 backdrop-blur-xl rounded-[2rem] p-5 sm:p-6 lg:p-8 flex flex-row md:flex-col lg:flex-row items-start gap-4 md:gap-3 lg:gap-6 border border-white/10 hover:bg-black/65 transition-all duration-300 group cursor-pointer">
              <div className="bg-white/5 p-2 sm:p-3 rounded-xl flex-shrink-0">
                <Leaf className="w-7 h-7 lg:w-10 lg:h-10 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg md:text-base lg:text-xl xl:text-2xl mb-1 sm:mb-2">
                  Développement durable
                </h3>
                <p className="text-xs md:text-[11px] lg:text-xs xl:text-sm text-gray-300 font-light italic">
                  Gestion intelligente de l'énergie pour un campus plus vert.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="relative w-full flex flex-col md:flex-row bg-black min-h-[400px] z-20"
      >
        <div className="w-full md:w-1/2 p-8 sm:p-10 md:pl-24 flex flex-col justify-center text-white">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4 md:mb-6">
            Smart Campus
          </h2>
          <p className="text-gray-300 max-w-lg font-light leading-relaxed text-sm sm:text-base">
            Optimisez votre vie étudiante grâce à un campus connecté. Réservez
            vos espaces de travail en temps réel, consultez les conditions
            environnementales de vos salles et contribuez à l'amélioration de
            votre établissement.
          </p>
        </div>
        <div className="w-full md:w-1/2 relative flex items-center justify-center md:justify-end md:pr-12">
          <div className="relative w-full max-w-[260px] sm:max-w-[320px] z-30">
            <img
              src={filleImage}
              className="w-full h-auto shadow-2xl"
              alt="fille"
            />
          </div>
        </div>
      </section>

      <section
        className="relative w-full py-16 sm:py-28 md:py-40 bg-cover bg-center flex flex-col items-center"
        style={{ backgroundImage: `url(${buImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 w-full max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide">
              Réservation en ligne
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mb-10 md:mb-16">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-white" />
                <label className="text-sm uppercase tracking-[0.2em] text-white font-medium">
                  Date
                </label>
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent border-b border-white/40 py-2 text-white outline-none"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-white" />
                <label className="text-sm uppercase tracking-[0.2em] text-white font-medium">
                  Heure
                </label>
              </div>
              <input
                type="time"
                value={time}
                onChange={(e) => setHeure(e.target.value)}
                className="bg-transparent border-b border-white/40 py-2 text-white outline-none"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-white" />
                <label className="text-sm uppercase tracking-[0.2em] text-white font-medium">
                  Type de salle
                </label>
              </div>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="bg-transparent border-b border-white/40 py-2 text-white outline-none appearance-none"
              >
                <option value="study" className="bg-black">
                  Salle d'étude
                </option>
                <option value="lecture" className="bg-black">
                  Amphithéâtre
                </option>
                <option value="all" className="bg-black">
                  Tous les types
                </option>
              </select>
            </div>
          </div>

          <div className="flex justify-center mb-10">
            <button
              onClick={handleCheckAvailability}
              className="px-12 py-4 bg-transparent border border-white text-white text-sm uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-all"
            >
              Vérifier la disponibilité
            </button>
          </div>

          {hasSearched && (
            <div className="w-full flex flex-col items-center mt-6">
              {loadingRooms ? (
                <div className="text-white animate-pulse">
                  Recherche des salles disponibles...
                </div>
              ) : availableRooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                  {availableRooms.map((room) => (
                    <Link
                      key={room.id}
                      to="/room-info"
                      state={{ time: formattedHeure, room: room }}
                    >
                      <div className="bg-black/60 hover:bg-white/20 border border-white/20 rounded-2xl p-6 transition-all cursor-pointer text-left shadow-lg">
                        <h4 className="text-xl font-bold text-white mb-2">
                          {room.room_number}
                        </h4>
                        <div className="flex justify-between items-center text-sm text-gray-300">
                          <span className="capitalize">{room.room_type}</span>
                          <span>Capacité : {room.capacity}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-white/80 italic bg-black/40 px-8 py-4 rounded-xl">
                  Aucune salle disponible pour ces critères.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="relative w-full py-16 sm:py-24 md:py-32 bg-black flex flex-col items-center text-white">
        <div className="w-full max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center mb-8 md:mb-16">
            <AlertTriangle className="mb-4" size={32} />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-center">
              Signaler un problème
            </h2>
            <div className="w-20 h-px bg-white/30 mt-4 md:mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-white">
              <button className="p-5 sm:p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition flex flex-col items-center">
                <Droplets size={24} className="mb-2 sm:mb-4" />
                <span className="text-xs uppercase tracking-widest">Eau</span>
              </button>
              <button className="p-5 sm:p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition flex flex-col items-center">
                <Zap size={24} className="mb-2 sm:mb-4" />
                <span className="text-xs uppercase tracking-widest">
                  Électricité
                </span>
              </button>
              <button className="p-5 sm:p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition flex flex-col items-center">
                <Wrench size={24} className="mb-2 sm:mb-4" />
                <span className="text-xs uppercase tracking-widest">
                  Dégâts
                </span>
              </button>
              <button className="p-5 sm:p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition flex flex-col items-center">
                <AlertTriangle size={24} className="mb-2 sm:mb-4" />
                <span className="text-xs uppercase tracking-widest">Autre</span>
              </button>
            </div>
            <div className="flex flex-col gap-8">
              <Link to="/report" className="w-full">
                <button className="w-full py-4 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-gray-200 transition">
                  Accéder à l'outil de signalement
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative w-full py-16 sm:py-28 md:py-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${meteoImage})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-8 text-white">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em]">
              Données campus en direct
            </span>
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-serif mb-4 md:mb-8">
              22°C
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            <div className="bg-white/5 backdrop-blur-md p-5 sm:p-8 rounded-3xl border border-white/10">
              <Thermometer className="mb-2 sm:mb-4 opacity-50" />
              <h4 className="text-2xl sm:text-3xl font-light">19°</h4>
              <p className="text-xs uppercase text-gray-400">
                Temp. intérieure
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-5 sm:p-8 rounded-3xl border border-white/10">
              <Droplets className="mb-2 sm:mb-4 opacity-50" />
              <h4 className="text-2xl sm:text-3xl font-light">45%</h4>
              <p className="text-xs uppercase text-gray-400">Humidité</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-20 bg-black border-t border-white/5 text-gray-600 flex flex-col items-center">
        <img src={logoImage} alt="Logo" className="w-10 opacity-50 mb-8" />
        <p className="text-xs uppercase tracking-widest">
          &copy; 2026 Smart Campus
        </p>
      </footer>
    </>
  );
}

// ============================================================================
// PAGE 7 : MES RÉSERVATIONS
// ============================================================================
function MyBookingsPage() {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [bookingsRes, roomsRes] = await Promise.all([
          bookingsAPI.getMyBookings(),
          roomsAPI.getAll(),
        ]);
        setBookings(bookingsRes.data);
        setRooms(roomsRes.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchData();
  }, [user]);

  const getRoomName = (id) => {
    if (!rooms || rooms.length === 0) return `Salle #${id}`;
    const room = rooms.find((r) => r.id === id);
    return room ? room.room_number : `Salle #${id}`;
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir annuler cette réservation ?"))
      return;
    try {
      await bookingsAPI.cancel(id);
      setBookings(bookings.filter((b) => b.id !== id));
      alert("Réservation annulée.");
    } catch {
      alert("Erreur lors de l'annulation.");
    }
  };

  return (
    <div
      className="min-h-screen bg-black flex flex-col relative overflow-hidden"
      style={{ backgroundImage: `url(${buImage})`, backgroundSize: "cover" }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl"></div>
      <Navbar user={user} logout={logout} />

      <div className="relative z-10 max-w-6xl mx-auto w-full px-3 sm:px-6 py-10 sm:py-20">
        <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white/10 p-3 sm:p-4 rounded-3xl flex-shrink-0">
            <BookOpen size={24} className="sm:hidden" />
            <BookOpen size={32} className="hidden sm:block" />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white">
              Mes réservations
            </h2>
            <p className="text-gray-400 font-light mt-2 italic">
              Gérez vos créneaux réservés sur le campus.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 text-white animate-pulse">
            Chargement de vos réservations...
          </div>
        ) : bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/10 transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
                    <CheckCircle size={12} /> Confirmé
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">
                  {getRoomName(booking.room_id)}
                </h4>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar size={16} className="opacity-50" />
                    <span className="text-sm">
                      {new Date(booking.start_time).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Clock size={16} className="opacity-50" />
                    <span className="text-sm">
                      {new Date(booking.start_time).getHours()}h00 -{" "}
                      {new Date(booking.end_time).getHours()}h00
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="w-full py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl hover:bg-red-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
                >
                  Annuler la réservation
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white/5 border border-white/10 rounded-[3rem] border-dashed">
            <Calendar
              size={48}
              className="mx-auto mb-6 opacity-20 text-white"
            />
            <p className="text-xl text-gray-400 font-light italic">
              Vous n'avez pas encore de réservation.
            </p>
            <Link to="/reservation">
              <button className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition">
                Réserver une salle
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// PAGE 8 : MES SIGNALEMENTS
// ============================================================================
function MyIncidentsPage() {
  const { user, logout } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [incRes, roomsRes] = await Promise.all([
          incidentsAPI.getMyIncidents(),
          roomsAPI.getAll(),
        ]);
        setIncidents(incRes.data);
        setRooms(roomsRes.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchData();
  }, [user]);

  const getRoomName = (id) => {
    if (!rooms || rooms.length === 0) return `Salle #${id}`;
    const room = rooms.find((r) => r.id === id);
    return room ? room.room_number : `Salle #${id}`;
  };

  return (
    <div
      className="min-h-screen bg-black flex flex-col relative overflow-hidden"
      style={{ backgroundImage: `url(${buImage})`, backgroundSize: "cover" }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl"></div>
      <Navbar user={user} logout={logout} />

      <div className="relative z-10 max-w-6xl mx-auto w-full px-3 sm:px-6 py-10 sm:py-20">
        <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white/10 p-3 sm:p-4 rounded-3xl flex-shrink-0">
            <ClipboardList size={24} className="sm:hidden" />
            <ClipboardList size={32} className="hidden sm:block" />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white">
              Mes signalements
            </h2>
            <p className="text-gray-400 font-light mt-2 italic">
              Suivez l'état de vos signalements de maintenance.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 text-white animate-pulse">
            Chargement de vos signalements...
          </div>
        ) : incidents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 max-w-4xl">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col md:flex-row gap-8 items-start hover:bg-white/10 transition-all"
              >
                <div
                  className={`p-4 rounded-2xl ${incident.status === "resolved" ? "bg-green-500/10 text-green-400" : "bg-orange-500/10 text-orange-400"}`}
                >
                  {incident.status === "resolved" ? (
                    <CheckCircle size={24} />
                  ) : (
                    <Clock3 size={24} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-3 mb-3">
                    <span className="text-[10px] uppercase tracking-widest font-bold bg-white/10 px-3 py-1 rounded-full text-gray-300">
                      {getRoomName(incident.room_id)}
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${incident.status === "resolved" ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"}`}
                    >
                      {incident.status === "resolved" ? "Résolu" : "En cours"}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-bold bg-red-500/10 text-red-400 px-3 py-1 rounded-full">
                      Sévérité: {incident.severity}
                    </span>
                  </div>
                  <h4 className="text-lg text-white font-medium mb-2">
                    {incident.description}
                  </h4>
                  <p className="text-xs text-gray-500 italic">
                    Signalé le{" "}
                    {new Date(incident.created_at).toLocaleDateString("fr-FR")}{" "}
                    à{" "}
                    {new Date(incident.created_at).toLocaleTimeString("fr-FR")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white/5 border border-white/10 rounded-[3rem] border-dashed">
            <AlertTriangle
              size={48}
              className="mx-auto mb-6 opacity-20 text-white"
            />
            <p className="text-xl text-gray-400 font-light italic">
              Vous n'avez pas encore effectué de signalement.
            </p>
            <Link to="/report">
              <button className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition">
                Signaler un problème
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// ROUTEUR PRINCIPAL
// ============================================================================
/**
 * Composant racine de l'application.
 * Définit toutes les routes et rend la page correspondante selon l'URL active.
 */
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
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/my-incidents" element={<MyIncidentsPage />} />
      </Routes>
    </div>
  );
}
