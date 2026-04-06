import { useEffect, useState } from 'react'

interface Sensor {
  id: string
  type: string
  temperature: number
  occupation_pct: number
  status: string
}

interface Reservation {
  id: number
  room: string
  time: string
  subject: string
}

function App() {
  const [sensors, setSensors] = useState<Sensor[]>([])
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sensorsRes, reservationsRes] = await Promise.all([
          fetch(`${API_URL}/api/sensors`).catch(() => null),
          fetch(`${API_URL}/api/reservations`).catch(() => null)
        ])
        
        if (sensorsRes && sensorsRes.ok) {
          setSensors(await sensorsRes.json())
        } else {
          // Serve mock data if API is down
          setSensors([
            { id: "A101", type: "room", temperature: 21.5, occupation_pct: 65, status: "online" },
            { id: "Amphi_C", type: "amphitheater", temperature: 19.8, occupation_pct: 90, status: "warning" },
            { id: "Biblio_Main", type: "library", temperature: 22.1, occupation_pct: 45, status: "online" }
          ])
        }

        if (reservationsRes && reservationsRes.ok) {
          setReservations(await reservationsRes.json())
        } else {
          // Serve mock data if API is down
          setReservations([
            { id: 1, room: "A101", time: "10:00 - 12:00", subject: "Cloud Computing" },
            { id: 2, room: "Amphi_C", time: "14:00 - 17:00", subject: "DevOps Conference" }
          ])
        }
      } catch (error) {
        console.error("Failed to fetch data", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // Poll every 5s for realtime effect
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [API_URL])

  return (
    <div className="app-container">
      <header className="header animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h1>Smart Campus</h1>
        <p>Université de Corse Pasquale Paoli • Real-time Infrastructure Monitoring</p>
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>Loading...</div>
      ) : (
        <div className="dashboard-grid">
          
          {/* Sensors Section */}
          <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.2s', gridColumn: '1 / -1' }}>
            <h2>Infrastructure Sensors</h2>
            <div className="dashboard-grid">
              {sensors.map((sensor, idx) => (
                <div key={sensor.id} className="sensor-card glass-panel" style={{ animationDelay: `${0.3 + idx * 0.1}s` }}>
                  <div className="sensor-header">
                    <span className="sensor-title">{sensor.id}</span>
                    <span className={`status-badge status-${sensor.status}`}>
                      {sensor.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="sensor-stats">
                    <div className="stat-item">
                      <span className="stat-value">{sensor.temperature}°C</span>
                      <span className="stat-label">Temperature</span>
                    </div>
                    <div className="stat-item" style={{ flex: 1 }}>
                      <span className="stat-value">{sensor.occupation_pct}%</span>
                      <span className="stat-label">Occupation</span>
                    </div>
                  </div>

                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${sensor.occupation_pct}%`, background: sensor.occupation_pct > 80 ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : undefined }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reservations Section */}
          <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.5s', gridColumn: '1 / -1' }}>
            <h2>Upcoming Reservations</h2>
            <div className="reservation-list">
              {reservations.map(res => (
                <div key={res.id} className="reservation-item">
                  <div className="reservation-info">
                    <h3>{res.subject}</h3>
                    <p>Room: {res.room}</p>
                  </div>
                  <div className="reservation-time">
                    {res.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default App
