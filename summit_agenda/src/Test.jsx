import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Calendar,
  Megaphone,
  Cloud,
  Users,
  MapPin,
  Link2,
  AlertCircle,
  Globe,
  Sun,
  Moon,
} from "lucide-react";

// Sample Data
const announcementsData = [
  {
    id: 1,
    text: "🚌 Shuttle departs in 10 minutes from hotel lobby",
    time: "10:30 AM",
  },
  { id: 2, text: "📸 Group photo at 2 PM in main hall", time: "2:00 PM" },
];

const agendaData = [
  {
    id: 1,
    time: "09:00 AM",
    title: "Registration & Welcome Coffee",
    speaker: "",
    status: "completed",
  },
  {
    id: 2,
    time: "10:00 AM",
    title: "Opening Ceremony",
    speaker: "Dr. Ahmed Al-Mansour",
    status: "now",
  },
  {
    id: 3,
    time: "11:30 AM",
    title: "Regional Alumni Panel",
    speaker: "Alumni Leaders",
    status: "upcoming",
  },
  {
    id: 4,
    time: "01:00 PM",
    title: "Networking Lunch",
    speaker: "",
    status: "upcoming",
  },
  {
    id: 5,
    time: "02:30 PM",
    title: "Workshops & Breakout Sessions",
    speaker: "Various",
    status: "upcoming",
  },
];

const participantsData = [
  {
    id: 1,
    name: "Sarah Al-Khalifa",
    country: "Bahrain",
    year: "2019",
    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Mohammed Hassan",
    country: "Saudi Arabia",
    year: "2020",
    photo: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 3,
    name: "Layla Ibrahim",
    country: "UAE",
    year: "2018",
    photo: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 4,
    name: "Omar Mansour",
    country: "Jordan",
    year: "2021",
    photo: "https://i.pravatar.cc/150?img=8",
  },
];

const localSpotsData = [
  {
    id: 1,
    name: "Café Lilou",
    type: "Coffee",
    desc: "French bistro with great coffee",
    lat: 26.2235,
    lng: 50.5876,
  },
  {
    id: 2,
    name: "Emmawash Restaurant",
    type: "Restaurant",
    desc: "Traditional Bahraini cuisine",
    lat: 26.2285,
    lng: 50.582,
  },
  {
    id: 3,
    name: "Starbucks City Centre",
    type: "Coffee",
    desc: "24-hour coffee shop",
    lat: 26.2361,
    lng: 50.5455,
  },
];

const translations = {
  en: {
    title: "INJAZ AL-ARAB REGIONAL ALUMNI LEADERSHIP REGROUPING",
    tagline: "Uniting Alumni Across the Middle East",
    location: "Manama, Bahrain",
    agenda: "Conference Agenda",
    announcements: "Live Updates",
    weather: "Local Weather",
    participants: "Meet the Participants",
    explore: "Explore Local Spots",
    quickLinks: "Quick Links",
    support: "Emergency & Support",
  },
  ar: {
    title: "تجمع قيادات خريجي إنجاز العرب الإقليمي",
    tagline: "توحيد الخريجين عبر الشرق الأوسط",
    location: "المنامة، البحرين",
    agenda: "جدول المؤتمر",
    announcements: "التحديثات المباشرة",
    weather: "الطقس المحلي",
    participants: "تعرف على المشاركين",
    explore: "اكتشف الأماكن المحلية",
    quickLinks: "روابط سريعة",
    support: "الطوارئ والدعم",
  },
};

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(false);
  const [weather, setWeather] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currency, setCurrency] = useState({ amount: 1, from: "BHD" });

  const t = translations[language];
  const isRTL = language === "ar";

  // Auto theme based on time
  useEffect(() => {
    const hour = new Date().getHours();
    setDarkMode(hour < 6 || hour >= 18);
  }, []);

  // Fetch weather
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Manama,BH&units=metric&appid=demo`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch(() =>
        setWeather({
          main: { temp: 32, humidity: 65 },
          weather: [{ description: "clear sky" }],
        })
      );
  }, []);

  // Announcement carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcementsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const convertCurrency = (amount, from) => {
    const rates = { BHD: 1, SAR: 10, USD: 2.65 };
    const inBHD = amount / rates[from];
    return {
      BHD: (inBHD * rates.BHD).toFixed(2),
      SAR: (inBHD * rates.SAR).toFixed(2),
      USD: (inBHD * rates.USD).toFixed(2),
    };
  };

  const theme = {
    bg: darkMode ? "#22404D" : "#FFFFFF",
    text: darkMode ? "#FFFFFF" : "#22404D",
    accent: "#BBD153",
    secondary: "#99D9DF",
    card: darkMode ? "#2D5563" : "#F5F5F5",
  };

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
        direction: isRTL ? "rtl" : "ltr",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40 px-4 py-6 text-center"
        style={{ background: `linear-gradient(135deg, #22404D, #99D9DF)` }}
      >
        <div className="flex justify-between items-start mb-4">
          <button
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="p-2 rounded-full transition-transform hover:scale-110"
            style={{ backgroundColor: theme.accent }}
          >
            <Globe size={20} color="#22404D" />
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full transition-transform hover:scale-110"
            style={{ backgroundColor: theme.accent }}
          >
            {darkMode ? (
              <Sun size={20} color="#22404D" />
            ) : (
              <Moon size={20} color="#22404D" />
            )}
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-2 text-white leading-tight">
          {t.title}
        </h1>
        <p className="text-sm text-white opacity-90">{t.tagline}</p>
        <p className="text-xs text-white opacity-80 mt-2">
          📍 {t.location} • October 25-27, 2025
        </p>
      </header>

      {/* Floating Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-transform hover:scale-110"
        style={{ backgroundColor: theme.accent }}
      >
        {menuOpen ? (
          <X size={24} color="#22404D" />
        ) : (
          <Menu size={24} color="#22404D" />
        )}
      </button>

      {/* Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 m-4 max-w-xs w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {[
              { icon: Calendar, label: t.agenda, id: "agenda" },
              { icon: Megaphone, label: t.announcements, id: "announcements" },
              { icon: Cloud, label: t.weather, id: "weather" },
              { icon: Users, label: t.participants, id: "participants" },
              { icon: MapPin, label: t.explore, id: "explore" },
              { icon: Link2, label: t.quickLinks, id: "links" },
              { icon: AlertCircle, label: t.support, id: "support" },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-3 w-full p-3 mb-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <item.icon size={20} color="#22404D" />
                <span className="text-gray-800">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Announcements */}
      <section id="announcements" className="px-4 py-6">
        <div
          className="rounded-lg p-4 text-center transition-all"
          style={{ backgroundColor: theme.accent, color: "#22404D" }}
        >
          <Megaphone className="inline-block mb-2" size={24} />
          <p className="font-semibold">
            {announcementsData[currentIndex].text}
          </p>
          <p className="text-sm mt-1 opacity-75">
            {announcementsData[currentIndex].time}
          </p>
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">{t.agenda}</h2>
        {agendaData.map((item) => (
          <div
            key={item.id}
            className="mb-4 p-4 rounded-lg transition-all"
            style={{ backgroundColor: theme.card }}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold">{item.time}</span>
              {item.status === "now" && (
                <span
                  className="px-2 py-1 text-xs rounded-full animate-pulse"
                  style={{ backgroundColor: theme.accent, color: "#22404D" }}
                >
                  NOW
                </span>
              )}
            </div>
            <h3 className="font-bold mb-1">{item.title}</h3>
            {item.speaker && (
              <p className="text-sm opacity-75">{item.speaker}</p>
            )}
          </div>
        ))}
      </section>

      {/* Weather */}
      <section
        id="weather"
        className="px-4 py-8"
        style={{ background: `linear-gradient(135deg, #22404D, #99D9DF)` }}
      >
        <h2 className="text-2xl font-bold mb-4 text-white">{t.weather}</h2>
        {weather && (
          <div className="text-center text-white">
            <Cloud size={48} className="mx-auto mb-2" />
            <p className="text-4xl font-bold mb-2">
              {Math.round(weather.main?.temp || 32)}°C
            </p>
            <p className="capitalize mb-2">
              {weather.weather?.[0]?.description || "Clear sky"}
            </p>
            <p className="text-sm opacity-90">
              Humidity: {weather.main?.humidity || 65}%
            </p>
            <p className="text-xs mt-2 opacity-75">Stay hydrated 🧃</p>
          </div>
        )}
      </section>

      {/* Currency Converter */}
      <section className="px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Currency Converter</h2>
        <div className="p-4 rounded-lg" style={{ backgroundColor: theme.card }}>
          <input
            type="number"
            value={currency.amount}
            onChange={(e) =>
              setCurrency({
                ...currency,
                amount: parseFloat(e.target.value) || 0,
              })
            }
            className="w-full p-3 mb-3 rounded border-2"
            style={{
              backgroundColor: theme.bg,
              color: theme.text,
              borderColor: theme.accent,
            }}
            placeholder="Enter amount"
          />
          <select
            value={currency.from}
            onChange={(e) => setCurrency({ ...currency, from: e.target.value })}
            className="w-full p-3 mb-4 rounded border-2"
            style={{
              backgroundColor: theme.bg,
              color: theme.text,
              borderColor: theme.accent,
            }}
          >
            <option value="BHD">BHD - Bahraini Dinar</option>
            <option value="SAR">SAR - Saudi Riyal</option>
            <option value="USD">USD - US Dollar</option>
          </select>
          <div className="space-y-2">
            {Object.entries(
              convertCurrency(currency.amount, currency.from)
            ).map(([curr, val]) => (
              <div
                key={curr}
                className="flex justify-between p-2 rounded"
                style={{ backgroundColor: theme.bg }}
              >
                <span className="font-semibold">{curr}</span>
                <span>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Participants */}
      <section id="participants" className="px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">{t.participants}</h2>
        <div className="grid grid-cols-2 gap-4">
          {participantsData.map((p) => (
            <div
              key={p.id}
              className="p-3 rounded-lg text-center transition-transform hover:scale-105"
              style={{ backgroundColor: theme.card }}
            >
              <img
                src={p.photo}
                alt={p.name}
                className="w-16 h-16 rounded-full mx-auto mb-2 border-2"
                style={{ borderColor: theme.accent }}
              />
              <p className="font-semibold text-sm">{p.name}</p>
              <p className="text-xs opacity-75">{p.country}</p>
              <p className="text-xs opacity-60">Class of {p.year}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Local Spots */}
      <section id="explore" className="px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">{t.explore}</h2>
        {localSpotsData.map((spot) => (
          <div
            key={spot.id}
            className="mb-4 p-4 rounded-lg"
            style={{ backgroundColor: theme.card }}
          >
            <div className="flex items-start gap-2 mb-2">
              <MapPin size={20} style={{ color: theme.accent }} />
              <div className="flex-1">
                <h3 className="font-bold mb-1">{spot.name}</h3>
                <span
                  className="text-xs px-2 py-1 rounded"
                  style={{ backgroundColor: theme.accent, color: "#22404D" }}
                >
                  {spot.type}
                </span>
              </div>
            </div>
            <p className="text-sm mb-3 opacity-75">{spot.desc}</p>
            <a
              href={`https://maps.google.com/?q=${spot.lat},${spot.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 rounded-lg text-sm font-semibold transition-transform hover:scale-105"
              style={{ backgroundColor: theme.accent, color: "#22404D" }}
            >
              📍 Open in Maps
            </a>
          </div>
        ))}
      </section>

      {/* Quick Links */}
      <section id="links" className="px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">{t.quickLinks}</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "🗺️ Google Maps", url: "https://maps.google.com" },
            { name: "🚗 Careem", url: "https://www.careem.com" },
            { name: "🍽️ Talabat", url: "https://www.talabat.com" },
            { name: "✈️ Airport", url: "https://www.bahrain-airport.com" },
            { name: "💬 WhatsApp", url: "https://wa.me" },
            { name: "🌐 INJAZ", url: "https://www.injazalarab.org" },
          ].map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg text-center font-semibold transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: theme.accent, color: "#22404D" }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </section>

      {/* Emergency */}
      <section id="support" className="px-4 py-8 mb-20">
        <h2 className="text-2xl font-bold mb-4 text-red-500">{t.support}</h2>
        {[
          { label: "🚨 Emergency", tel: "999" },
          { label: "🏥 Hospital", tel: "+973-1728-4433" },
          { label: "📞 INJAZ Staff", tel: "+973-1234-5678" },
          { label: "💊 24h Pharmacy", tel: "+973-1747-7777" },
        ].map((item, i) => (
          <a
            key={i}
            href={`tel:${item.tel}`}
            className="block mb-3 p-4 rounded-lg text-center font-bold bg-red-500 text-white transition-transform hover:scale-105 active:scale-95"
          >
            {item.label}: {item.tel}
          </a>
        ))}
      </section>

      {/* Footer */}
      <footer
        className="px-4 py-8 text-center text-sm"
        style={{
          background: `linear-gradient(135deg, #22404D, #99D9DF)`,
          color: "#FFFFFF",
        }}
      >
        <p className="mb-3 font-semibold">
          Powered by INJAZ Al-Arab Alumni Network
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-75 hover:opacity-100 transition-opacity"
          >
            LinkedIn
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-75 hover:opacity-100 transition-opacity"
          >
            Instagram
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-75 hover:opacity-100 transition-opacity"
          >
            X
          </a>
        </div>
        <p className="mt-4 text-xs opacity-75">
          © 2025 INJAZ Al-Arab. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;
