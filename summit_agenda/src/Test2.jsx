// Test.jsx
import React, { useState, useEffect, useMemo } from "react";

/**
 * Modern Apple-style, mobile-first event app shell:
 * - Glassmorphism UI (backdrop blur)
 * - Announcements horizontal banners (first = next agenda item)
 * - Agenda collapsible cards (no speaker in main view)
 * - Weather today & tomorrow with min/max and 401 fallback
 * - Prayer times + Qibla bearing (uses geolocation if permitted)
 * - Currency converter with Middle East currencies + flag emojis
 * - Explore local spots horizontal grid (picture, category, price range)
 *
 * Notes:
 * - Replace OPENWEATHER_KEY and ALADHAN usage with your real API keys/URLs as needed.
 * - Tailwind-style classes are used; if you don't use Tailwind, simple CSS equivalents can be applied.
 */

// --------------------------- Sample Data ---------------------------
const SAMPLE_ANNOUNCEMENTS = [
  {
    id: "a1",
    text: "🚌 Shuttle departs in 10 minutes from hotel lobby",
    time: "10:30 AM",
  },
  {
    id: "a2",
    text: "📸 Group photo at 2 PM in the main hall",
    time: "2:00 PM",
  },
];

const SAMPLE_AGENDA = [
  {
    id: "s1",
    time: "09:00",
    title: "Registration & Welcome Coffee",
    status: "completed",
    meta: { dress: "Smart Casual", location: "Lobby", room: "Lobby" },
  },
  {
    id: "s2",
    time: "10:00",
    title: "Opening Ceremony",
    status: "now",
    meta: { dress: "Business Formal", location: "Main Hall", room: "A" },
  },
  {
    id: "s3",
    time: "11:30",
    title: "Regional Alumni Panel",
    status: "upcoming",
    meta: { dress: "Business Casual", location: "Conference Room", room: "B2" },
  },
  {
    id: "s4",
    time: "13:00",
    title: "Networking Lunch",
    status: "upcoming",
    meta: { dress: "Casual", location: "Dining Area", room: "Outdoor" },
  },
];

const SAMPLE_SPOTS = [
  {
    id: 1,
    name: "Café Lilou",
    category: "Coffee",
    price: "$$",
    img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&q=60&w=800",
  },
  {
    id: 2,
    name: "Emmawash Restaurant",
    category: "Restaurant",
    price: "$$",
    img: "https://images.unsplash.com/photo-1541542684-9a3b3a2b5d90?auto=format&q=60&w=800",
  },
  {
    id: 3,
    name: "Seaside Lounge",
    category: "Bar",
    price: "$$$",
    img: "https://images.unsplash.com/photo-1541542684-2f6f19d2a1e6?auto=format&q=60&w=800",
  },
  {
    id: 4,
    name: "City Mall",
    category: "Shopping",
    price: "$",
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&q=60&w=800",
  },
];

// Currency flags and sample static rates (replace with live rates later)
const CURRENCIES = [
  { code: "BHD", label: "Bahraini Dinar", flag: "🇧🇭" },
  { code: "SAR", label: "Saudi Riyal", flag: "🇸🇦" },
  { code: "AED", label: "UAE Dirham", flag: "🇦🇪" },
  { code: "QAR", label: "Qatari Riyal", flag: "🇶🇦" },
  { code: "KWD", label: "Kuwaiti Dinar", flag: "🇰🇼" },
  { code: "OMR", label: "Omani Rial", flag: "🇴🇲" },
  { code: "JOD", label: "Jordanian Dinar", flag: "🇯🇴" },
  { code: "EGP", label: "Egyptian Pound", flag: "🇪🇬" },
  { code: "USD", label: "US Dollar", flag: "🇺🇸" },
];

// small inline icons (SVG)
const Icon = {
  Menu: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M3 6h18M3 12h18M3 18h18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Megaphone: (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M3 11v2a2 2 0 0 0 2 2h1l7 3V6L6 9H5a2 2 0 0 0-2 2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 12v-1a3 3 0 0 1 0 2v-1z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Cloud: (props) => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M20 16.58A4.42 4.42 0 0 0 15.58 12H9.5A3.5 3.5 0 1 0 9.5 19h10.5a0 0 0 0 0 0z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Compass: (props) => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M16 8l-5 2-2 5 5-2 2-5z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

// --------------------------- Helpers ---------------------------

function toDegrees(rad) {
  return rad * (180 / Math.PI);
}
function toRadians(deg) {
  return deg * (Math.PI / 180);
}

// calculate bearing from (lat1, lon1) to (lat2, lon2) - used for qibla
function bearingBetweenPoints(lat1, lon1, lat2, lon2) {
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δλ = toRadians(lon2 - lon1);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x);
  return (toDegrees(θ) + 360) % 360;
}

// --------------------------- Main Component ---------------------------
export default function App() {
  // Theme state (simple)
  const [dark, setDark] = useState(false);

  // Data states
  const [announcements, setAnnouncements] = useState(SAMPLE_ANNOUNCEMENTS);
  const [agenda] = useState(SAMPLE_AGENDA);
  const [spots] = useState(SAMPLE_SPOTS);

  // weather state
  const [weather, setWeather] = useState({
    loading: true,
    error: null,
    data: null,
  });

  // prayer & qibla
  const [prayer, setPrayer] = useState({
    loading: true,
    error: null,
    data: null,
  });
  const [qibla, setQibla] = useState({
    bearing: null,
    userCoords: null,
    error: null,
  });

  // currency
  const [amount, setAmount] = useState(1);
  const [from] = useState("BHD");
  const staticRates = useMemo(
    () => ({
      BHD: 1,
      SAR: 10.551,
      AED: 3.65,
      QAR: 3.64,
      KWD: 0.302,
      OMR: 0.384,
      JOD: 0.709,
      EGP: 30.9,
      USD: 0.265,
    }),
    []
  );

  // announcements carousel index for autoplay (touch-friendly)
  const [, setAnnIndex] = useState(0);

  // ---------------- compute next agenda item and ensure first announcement is it ----------------
  useEffect(() => {
    // pick next agenda item (first with status upcoming or now)
    const next =
      agenda.find((a) => a.status === "now") ||
      agenda.find((a) => a.status === "upcoming") ||
      agenda[0];
    if (next) {
      // create an announcement for it and ensure it's first
      const agendaAnnouncement = {
        id: `agenda-${next.id}`,
        text: `📌 Next: ${next.title} • ${next.time}`,
        time: next.time,
      };
      // if not already first, place it
      setAnnouncements((prev) => {
        // remove previous agenda- announcement variants
        const filtered = prev.filter(
          (p) => !p.id?.toString().startsWith("agenda-")
        );
        // if already first and same, keep order
        if (filtered[0] && filtered[0].id === agendaAnnouncement.id)
          return prev;
        return [agendaAnnouncement, ...filtered];
      });
    }
  }, [agenda]);

  // ---------------- Weather fetch (today + tomorrow) with 401 handling ----------------
  useEffect(() => {
    let mounted = true;
    const OPENWEATHER_KEY =
      (typeof globalThis !== "undefined" &&
        globalThis.REACT_APP_OPENWEATHER_KEY) ||
      "YOUR_OPENWEATHER_KEY_HERE"; // replace with real key
    // free demo fallback (used on 401 / error)
    const FALLBACK = {
      daily: [
        {
          dt: Date.now() / 1000,
          temp: { min: 28, max: 34 },
          weather: [{ description: "Clear sky" }],
        },
        {
          dt: Date.now() / 1000 + 86400,
          temp: { min: 27, max: 33 },
          weather: [{ description: "Partly cloudy" }],
        },
      ],
    };

    // Use Manama coords by default; ideally use geolocation
    const lat = 26.2154,
      lon = 50.5832;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${OPENWEATHER_KEY}`;

    setWeather((s) => ({ ...s, loading: true, error: null }));
    fetch(url)
      .then(async (res) => {
        if (!mounted) return;
        if (res.status === 401) {
          // unauthorized — show friendly message but still show fallback
          setWeather({
            loading: false,
            error: "Weather API unauthorized (401). Showing sample data.",
            data: FALLBACK,
          });
          return;
        }
        if (!res.ok) throw new Error(`Weather fetch failed (${res.status})`);
        const json = await res.json();
        setWeather({ loading: false, error: null, data: json });
      })
      .catch((err) => {
        if (!mounted) return;
        setWeather({
          loading: false,
          error: err.message || "Failed to load weather",
          data: FALLBACK,
        });
      });
    return () => (mounted = false);
  }, []);

  // ---------------- Prayer times (AlAdhan) ----------------
  useEffect(() => {
    let mounted = true;
    const lat = 26.2154,
      lon = 50.5832; // default to Manama
    const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`;
    setPrayer({ loading: true });
    fetch(url)
      .then(async (res) => {
        if (!mounted) return;
        if (!res.ok) throw new Error(`Prayer API failed (${res.status})`);
        const json = await res.json();
        // we only need today's timings
        setPrayer({ loading: false, error: null, data: json.data });
      })
      .catch((err) => {
        if (!mounted) return;
        // fallback
        setPrayer({
          loading: false,
          error: err.message,
          data: {
            date: { readable: new Date().toLocaleDateString() },
            timings: {
              Fajr: "05:00",
              Dhuhr: "12:10",
              Asr: "15:20",
              Maghrib: "18:05",
              Isha: "19:30",
              Sunrise: "06:15",
            },
          },
        });
      });
    return () => (mounted = false);
  }, []);

  // ---------------- Qibla bearing (calc from geolocation) ----------------
  useEffect(() => {
    const KAABA = { lat: 21.422487, lon: 39.826206 };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const bearing = Math.round(
            bearingBetweenPoints(lat, lon, KAABA.lat, KAABA.lon)
          );
          setQibla({ bearing, userCoords: { lat, lon }, error: null });
        },
        () => {
          // permission denied or not available — fallback to event location (Manama)
          const fallbackLat = 26.2154,
            fallbackLon = 50.5832;
          const bearing = Math.round(
            bearingBetweenPoints(fallbackLat, fallbackLon, KAABA.lat, KAABA.lon)
          );
          setQibla({
            bearing,
            userCoords: { lat: fallbackLat, lon: fallbackLon },
            error: "Location permission denied; using Manama as fallback.",
          });
        },
        { timeout: 6000 }
      );
    } else {
      const fallbackLat = 26.2154,
        fallbackLon = 50.5832;
      const bearing = Math.round(
        bearingBetweenPoints(fallbackLat, fallbackLon, KAABA.lat, KAABA.lon)
      );
      setQibla({
        bearing,
        userCoords: { lat: fallbackLat, lon: fallbackLon },
        error: "Geolocation not available.",
      });
    }
  }, []);

  // ---------------- Currency conversion util ----------------
  const convertFromTo = React.useCallback(
    (amountVal, fromCode) => {
      // static rates are defined in staticRates (base BHD=1)
      const baseBHD = amountVal / (staticRates[fromCode] || 1);
      return CURRENCIES.reduce((acc, cur) => {
        acc[cur.code] = +(baseBHD * (staticRates[cur.code] || 1)).toFixed(3);
        return acc;
      }, {});
    },
    [staticRates]
  );

  // ---------------- UI behaviors ----------------
  // auto rotate announcement banner every 5s
  useEffect(() => {
    const interval = setInterval(
      () => setAnnIndex((i) => (i + 1) % Math.max(1, announcements.length)),
      5000
    );
    return () => clearInterval(interval);
  }, [announcements.length]);

  // Derived UI data (fixes: undefined vars used in JSX)
  const weatherData = useMemo(() => {
    const daily = (weather && weather.data && weather.data.daily) || [];
    return daily.slice(0, 2).map((d) => ({
      day: new Date((d.dt || Date.now() / 1000) * 1000).toLocaleDateString(
        undefined,
        { weekday: "short" }
      ),
      min: Math.round((d.temp && (d.temp.min ?? d.temp?.min)) || 0),
      max: Math.round((d.temp && (d.temp.max ?? d.temp?.max)) || 0),
      condition: (d.weather && d.weather[0] && d.weather[0].description) || "",
    }));
  }, [weather]);

  const convertedRates = useMemo(
    () => convertFromTo(amount, from),
    [amount, from, convertFromTo]
  );

  const currenciesForDisplay = useMemo(
    () =>
      CURRENCIES.map((c) => ({ ...c, converted: convertedRates[c.code] ?? 0 })),
    [convertedRates]
  );

  const prayers = useMemo(() => {
    const timings = (prayer && prayer.data && prayer.data.timings) || {};
    const order = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
    return order.map((name) => ({ name, time: timings[name] ?? "—" }));
  }, [prayer]);

  const qiblaDirection =
    qibla && typeof qibla.bearing !== "undefined" && qibla.bearing !== null
      ? qibla.bearing
      : "—";

  // ---------------- Render ----------------
  return (
    <div
      style={{
        fontFamily: "Inter, system-ui, -apple-system, 'Helvetica Neue', Arial",
        background: dark ? "#0b1220" : "#f3f6f9",
        color: dark ? "#e6f6ff" : "#0b1e2b",
        minHeight: "100vh",
        paddingBottom: 40,
      }}
    >
      {/* Header */}
      <header style={{ padding: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.15))",
                backdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: dark ? "#fff" : "#0b1e2b",
                fontWeight: 600,
                fontSize: 18,
                boxShadow: dark
                  ? "0 4px 12px rgba(0,0,0,0.3)"
                  : "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              🌍
            </div>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 2 }}>
                INJAZ Alumni Hub
              </h1>
              <p style={{ fontSize: 13, opacity: 0.7 }}>Manama, Bahrain</p>
            </div>
          </div>
          <button
            onClick={() => setDark(!dark)}
            style={{
              border: "none",
              background: "rgba(255,255,255,0.1)",
              borderRadius: 10,
              padding: 10,
              backdropFilter: "blur(10px)",
              boxShadow: dark
                ? "0 2px 8px rgba(0,0,0,0.4)"
                : "0 2px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            {dark ? "🌞" : "🌙"}
          </button>
        </div>
      </header>

      {/* Announcements */}
      <section style={{ padding: "12px 16px" }}>
        <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
          Live Announcements
        </h2>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: 12,
            paddingBottom: 8,
            scrollbarWidth: "none",
          }}
        >
          {announcements.map((a, i) => (
            <div
              key={i}
              style={{
                flex: "0 0 auto",
                minWidth: 260,
                background: "rgba(255,255,255,0.1)",
                borderRadius: 16,
                padding: 16,
                backdropFilter: "blur(14px)",
                boxShadow: dark
                  ? "0 2px 10px rgba(0,0,0,0.4)"
                  : "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <p style={{ fontWeight: 600 }}>{a.text}</p>
              <p style={{ fontSize: 13, opacity: 0.6 }}>{a.time}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Agenda */}
      <section style={{ padding: "16px" }}>
        <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
          Agenda
        </h2>
        {agenda.map((session) => (
          <details
            key={session.id}
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: 16,
              marginBottom: 10,
              padding: 14,
              backdropFilter: "blur(14px)",
            }}
          >
            <summary style={{ cursor: "pointer", fontWeight: 600 }}>
              {session.time} — {session.title}
            </summary>
            <div
              style={{
                marginTop: 8,
                paddingLeft: 10,
                fontSize: 13,
                opacity: 0.8,
              }}
            >
              <p>📍 Location: {session.meta?.location}</p>
              <p>👗 Dress Code: {session.meta?.dress}</p>
              <p>🏛 Room: {session.meta?.room}</p>
            </div>
          </details>
        ))}
      </section>

      {/* Weather */}
      <section style={{ padding: "16px" }}>
        <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
          Weather
        </h2>
        <div
          style={{
            display: "flex",
            gap: 12,
            overflowX: "auto",
            paddingBottom: 8,
          }}
        >
          {weatherData.map((day, i) => (
            <div
              key={i}
              style={{
                flex: "0 0 auto",
                minWidth: 160,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: 16,
                backdropFilter: "blur(14px)",
              }}
            >
              <p style={{ fontWeight: 600 }}>{day.day}</p>
              <p style={{ fontSize: 14 }}>{day.condition}</p>
              <p style={{ fontSize: 13, opacity: 0.8 }}>
                🌡 {day.min}° / {day.max}°
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Currency Converter */}
      <section style={{ padding: "16px" }}>
        <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
          Currency Converter
        </h2>
        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: 16,
            backdropFilter: "blur(14px)",
          }}
        >
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            placeholder="Enter amount"
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.2)",
              marginBottom: 10,
              background: "rgba(255,255,255,0.05)",
              color: "inherit",
            }}
          />
          <div style={{ display: "grid", gap: 8 }}>
            {currenciesForDisplay.map((c) => (
              <div
                key={c.code}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 14,
                }}
              >
                <span>
                  {c.flag} {c.code}
                </span>
                <span>{(c.converted ?? 0).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Local Spots */}
      <section style={{ padding: "16px" }}>
        <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
          Explore Local Spots
        </h2>
        <div
          style={{
            display: "flex",
            gap: 12,
            overflowX: "auto",
            paddingBottom: 8,
          }}
        >
          {spots.map((s) => (
            <div
              key={s.id}
              style={{
                flex: "0 0 auto",
                width: 180,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 16,
                overflow: "hidden",
                backdropFilter: "blur(14px)",
              }}
            >
              <img
                src={s.img}
                alt={s.name}
                style={{ width: "100%", height: 100, objectFit: "cover" }}
              />
              <div style={{ padding: 10 }}>
                <p style={{ fontWeight: 600 }}>{s.name}</p>
                <p style={{ fontSize: 13, opacity: 0.7 }}>
                  {s.category} • {s.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Prayer Times */}
      <section style={{ padding: "16px" }}>
        <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
          Prayer Timings & Qibla
        </h2>
        <div
          style={{
            display: "grid",
            gap: 8,
            background: "rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: 16,
            backdropFilter: "blur(14px)",
          }}
        >
          {prayers.map((p, i) => (
            <div
              key={i}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>{p.name}</span>
              <span>{p.time}</span>
            </div>
          ))}
          <div style={{ textAlign: "center", marginTop: 12 }}>
            🧭 Qibla: {qiblaDirection}°
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{ textAlign: "center", fontSize: 13, padding: 20, opacity: 0.6 }}
      >
        © 2025 INJAZ Alumni Network
      </footer>
    </div>
  );
}
