// Test.jsx
import React, { useState, useEffect, useMemo } from "react";
import "./App.css";

/**
 * Modern iOS-style, mobile-first event app with glass morphism:
 * Features:
 * - Mobile-optimized interface with smooth animations
 * - Glassmorphism UI with liquid effects
 * - Color palette: Dark teal (#22404D), Lime (#BBD153), Aqua (#99D9DF)
 * - Montserrat font from Google Fonts
 * - Responsive design with smooth transitions
 *
 * Components:
 * - Announcements with pulse animations
 * - Agenda with collapsible cards
 * - Weather with gradient backgrounds
 * - Prayer times with hover effects
 * - Currency converter with glass effect
 * - Local spots with image hover effects
 */

// --------------------------- Sample Data ---------------------------
const SAMPLE_ANNOUNCEMENTS = [];

const SAMPLE_AGENDA = {
  "Day 1": [
    {
      id: "d1-1",
      date: "Sunday, 02 November 2025",
      time: "All Day",
      title: "Alumni Arrival to BH: Airport to Hotel",
      status: "upcoming",
      meta: { location: "--" },
    },
    {
      id: "d1-2",
      date: "Sunday, 02 November 2025",
      time: "19:00-22:00 PM",
      title: "Free Night: Suggested Connection Dinner",
      status: "upcoming",
      meta: { location: "TimeOut Market CC Rooftop" },
    },
  ],
  "Day 2": [
    {
      id: "d2-1",
      date: "Monday, 03 November 2025",
      time: "08:45 - 09:00 AM",
      title: "Bus Leaves from Hotel to INJAZ BH HQ",
      status: "upcoming",
      meta: { location: "Crowne Plaza" },
    },
    {
      id: "d2-2",
      date: "Monday, 03 November 2025",
      time: "09:00 – 09:30 AM",
      title: "Opening & Orientation Session",
      description: "- Welcome remarks\n- Ice-breakers\n- Forum objectives",
      status: "upcoming",
      meta: { location: "INJAZ Bahrain HQ" },
    },
    {
      id: "d2-3",
      date: "Monday, 03 November 2025",
      time: "09:30 - 10:30 AM",
      title: "Session 1: Data-Driven Decision Making for Alumni Networks",
      status: "upcoming",
      meta: { location: "INJAZ Bahrain HQ" },
    },
    {
      id: "d2-4",
      date: "Monday, 03 November 2025",
      time: "10:30 - 11:30 AM",
      title:
        "Session 2: Providing a Regional Incubator Space for Alumni Businesses",
      status: "upcoming",
      meta: { location: "INJAZ Bahrain HQ" },
    },
    {
      id: "d2-5",
      date: "Monday, 03 November 2025",
      time: "11:30 - 12:00 AM",
      title: "Transport from INJAZ BH HQ to Lunch Location",
      status: "upcoming",
      meta: { location: "INJAZ Bahrain HQ" },
    },
    {
      id: "d2-6",
      date: "Monday, 03 November 2025",
      time: "12:00 – 14:00 PM",
      title: "VIP Lunch - with INJAZ Al Arab and INJAZ Bahrain Board Member",
      status: "upcoming",
      meta: { location: "--" },
    },
    {
      id: "d2-7",
      date: "Monday, 03 November 2025",
      time: "14:30-15:00 PM",
      title: "Transport from Lunch Location to INJAZ BH HQ",
      status: "upcoming",
      meta: { location: "--" },
    },
    {
      id: "d2-8",
      date: "Monday, 03 November 2025",
      time: "15:00 – 16:30 PM",
      title:
        "Conversation Over Coffee: Common Weaknesses and their Mitigations + Outreach Strategies Knowledge Transfer",
      status: "upcoming",
      meta: { location: "Crowne Plaza Hotel" },
    },
    {
      id: "d2-9",
      date: "Monday, 03 November 2025",
      time: "17:00 – 20:00 PM",
      title: "INJAZ Bahrain Headquarters Inauguration (Joint event)",
      status: "upcoming",
      meta: { location: "INJAZ Bahrain HQ" },
    },
  ],
  "Day 3": [
    {
      id: "d3-1",
      date: "Tuesday, 04 November 2025",
      time: "08:45 - 09:00 AM",
      title: "Bus Leaves from Hotel to INJAZ BH HQ",
      status: "upcoming",
      meta: { location: "Crowne Plaza" },
    },
    {
      id: "d3-2",
      date: "Tuesday, 04 November 2025",
      time: "09:00 – 10:30 AM",
      title: "Session 4: Initiating a Regional Alumni Fund",
      status: "upcoming",
      meta: { location: "INJAZ Bahrain HQ" },
    },
    {
      id: "d3-3",
      date: "Tuesday, 04 November 2025",
      time: "10:30 – 12:00 PM",
      title: "Finalizing Collaborative Study",
      status: "upcoming",
      meta: { location: "INJAZ Bahrain HQ" },
    },
    {
      id: "d3-4",
      date: "Tuesday, 04 November 2025",
      time: "12:00 – 12:45 PM",
      title: "Coffee Break + Prayer",
      status: "upcoming",
      meta: { location: "INJAZ Bahrain HQ" },
    },
    {
      id: "d3-5",
      date: "Tuesday, 04 November 2025",
      time: "12:45 – 13:45 PM",
      title: "Roundtable: INJAZ Leadership",
      status: "upcoming",
      meta: { location: "INJAZ Bahrain HQ" },
    },
    {
      id: "d3-6",
      date: "Tuesday, 04 November 2025",
      time: "13:45 – 14:45 PM",
      title: "Lunch",
      status: "upcoming",
      meta: { location: "INJAZ Bahrain HQ" },
    },
    {
      id: "d3-7",
      date: "Tuesday, 04 November 2025",
      time: "14:45 – 16:00 PM",
      title: "Return to Hotel & get ready for GALA",
      status: "upcoming",
      meta: { location: "Crowne Plaza" },
    },
    {
      id: "d3-8",
      date: "Tuesday, 04 November 2025",
      time: "17:00 – 22:00 PM",
      title: "Gala Dinner",
      status: "upcoming",
      meta: { location: "" },
    },
  ],
};

const SAMPLE_SPOTS = [
  {
    id: 1,
    name: "668",
    category: "Coffee",
    price: "BHD 2-3",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/a6/f7/1d/you-can-try-814-it-is.jpg?w=1100&h=1100&s=1",
  },
  {
    id: 2,
    name: "Jasmis",
    category: "Burgers",
    price: "BHD 3-4",
    img: "https://static.wixstatic.com/media/85ffa9_6e211c6e8e1242b6986b18aec2787c35~mv2_d_7119_5294_s_4_2.jpg/v1/fill/w_640,h_694,al_tl,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/85ffa9_6e211c6e8e1242b6986b18aec2787c35~mv2_d_7119_5294_s_4_2.jpg",
  },
  {
    id: 3,
    name: "Haji's Cafe",
    category: "Traditional Breakfast",
    price: "BHD 4-5",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgt5fDKi46Z3vJWA_jEXXUp-1_X49g3KI-BqhA7WBsRZPKh4E7u5GD8EuL7uPwcenBeWAmb-URuF2Vbqr9BGObr8p0oduuk3VoGM1z1OuXkzRPsSoZu80Ia9PJJhPajRRctEOwI_-kyGdQ/s1600/DSC05195-003.jpg",
  },
  {
    id: 4,
    name: "GB Cafe",
    category: "Cafe",
    price: "BHD 5-8",
    img: "https://greenbarcafe.com/wp-content/uploads/2023/11/GB-904x1024.jpg",
  },
  {
    id: 5,
    name: "Bahrain National Museum",
    category: "Museum",
    price: "BHD 1",
    img: "https://chescadventures.com/wp-content/uploads/2019/03/bahrain-national-museum-entrance.jpg?w=1200",
  },
  {
    id: 6,
    name: "Marassi Galleria",
    category: "Mall",
    price: "Shopping & Dining",
    img: "https://marassigalleria.bh/wp-content/uploads/2024/02/MG-Opening-Entertainment-1-scaled.jpg",
  },
  {
    id: 7,
    name: "Al Liwan",
    category: "Mall",
    price: "BHD 5-10",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7Ki5HQdqNGCVPfhxbiV_wTSu-GIOAEclVQ&s",
  },
  {
    id: 8,
    name: "Integrale",
    category: "Cafe",
    price: "BHD 2-3",
    img: "https://i.pinimg.com/736x/ed/58/01/ed5801b8ee9fc3c68a3cf07cc2e64b96.jpg",
  },
  {
    id: 9,
    name: "Saber Ayoub",
    category: "Tikka",
    price: "BHD 2-5",
    img: "https://glebekitchen.com/wp-content/uploads/2016/12/chickentikkakebab.jpg",
  },
  {
    id: 10,
    name: "Souq Al Manama",
    category: "Traditional Market",
    price: "Souveniers & Culture",
    img: "https://www.airial.travel/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fplace-photos%2FAJnk2czAO54YiijYQ-KcEVtpa3qStNSnQg2YME2Hhy3DyMN98XWhsT-nlUbVhNHiZP_BpJbBy9CedNefqGA2kphpvn_vl2bI30du9TR8jrRmi_DZYEP08hcw23XdDtTpxu83h8QZvbKy9H6DCIYK2Q%3Ds4800-w400-h400&w=3840&q=75",
  },
  {
    id: 11,
    name: "Avenues",
    category: "Mall",
    price: "Shopping & Dining",
    img: "https://propertyawards.net/wp-content/uploads/2020/06/shopping.jpg",
  },
  {
    id: 12,
    name: "King Karak",
    category: "Tea",
    price: "BHD 0.1-0.3",
    img: "https://media.istockphoto.com/id/1300484768/photo/traditional-middle-eastern-indian-drink-masala-or-karak-chai-closeup.jpg?s=612x612&w=0&k=20&c=PJFT9vvXSyxMMX5g7WYSlfwnpRFi4oCWhWKTZBV5rb4=",
  },
  {
    id: 13,
    name: "Al Baraha",
    category: "Traditional Market",
    price: "Souveniers & Culture",
    img: "https://www.timeoutbahrain.com/cloud/timeoutbahrain/2025/01/22/jpg-2025-01-22T152434.346-1024x1024.jpeg",
  },
  {
    id: 14,
    name: "Coco's",
    category: "Lunch/Dinner",
    price: "BHD 5-8",
    img: "https://www.dineoutbahrain.com/sites/default/files/images/restaurants/coco2.jpg",
  },
];

// Currency flags and sample static rates (replace with live rates later)
const CURRENCIES = [
  { code: "SAR", label: "Saudi Riyal", flag: "🇸🇦" },
  { code: "AED", label: "UAE Dirham", flag: "🇦🇪" },
  { code: "QAR", label: "Qatari Riyal", flag: "🇶🇦" },
  { code: "KWD", label: "Kuwaiti Dinar", flag: "🇰🇼" },
  { code: "OMR", label: "Omani Rial", flag: "🇴🇲" },
  { code: "JOD", label: "Jordanian Dinar", flag: "🇯🇴" },
  { code: "EGP", label: "Egyptian Pound", flag: "🇪🇬" },
  { code: "TND", label: "Tunisian Dinar", flag: "🇹🇳" },
  { code: "USD", label: "US Dollar", flag: "🇺🇸" },
];

// Apps to download
const RECOMMENDED_APPS = [
  {
    id: "talabat",
    name: "Talabat",
    icon: "https://mir-s3-cdn-cf.behance.net/projects/404/092efb96977653.Y3JvcCw4MDgsNjMyLDAsMg.png",
    description: "Food Delivery",
    category: "Food",
  },
  {
    id: "uber",
    name: "Uber",
    icon: "https://play-lh.googleusercontent.com/WTGDz8M2gRie-UPC1eFZ321-RavuXFhKlcvxHp0uVEDN0UrWfCMwU9uMvuEE98H3VtZG",
    description: "Transportation",
    category: "Transport",
  },
    {
    id: "airalo",
    name: "Airalo",
    icon: "https://airalo.com/favicon.ico",
    description: "eSIM Data Plans",
    category: "Travel",
  },
  {
    id: "vbh",
    name: "Visit Bahrain",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d8/83/cd/d883cda7-2bf9-f991-73b9-bc248d276fb5/AppIcon-0-0-1x_U007emarketing-0-11-0-0-85-220.png/246x0w.webp",
    description: "Tourism",
    category: "Tourism",
  },
  {
    id: "injaz",
    name: "INJAZ Bahrain",
    icon: "https://play-lh.googleusercontent.com/ki377cP0av1JZjkZskD1-HgeSB8py9IpIeCm-NZR5_YPvAZmA6a7fXoDMyW6IWMAaiw=w240-h480-rw",
    description: "INJAZ",
    category: "Injaz",
  },
];

// Participants data
// Emergency contacts data
const EMERGENCY_CONTACTS = [
  {
    id: "police",
    name: "Police",
    number: "999",
    icon: "🚓",
  },
  {
    id: "ambulance",
    name: "Ambulance",
    number: "998",
    icon: "🚑",
  },
  {
    id: "fire",
    name: "Fire Department",
    number: "997",
    icon: "🚒",
  },
  {
    id: "hotel",
    name: "Crown Plaza Hotel",
    number: "+973 1753 1122",
    icon: "🏨",
  },
  {
    id: "organizer",
    name: "INJAZ Bahrain",
    number: "+973 3314 7140",
    icon: "📱",
  },
];

const PARTICIPANTS = [
  {
    id: 10,
    name: "Ahmad Ben Yaghlen",
    country: "Tunisia",
    flag: "🇹🇳",
    photo: "https://res.cloudinary.com/dwqpwi809/image/upload/w_200,h_200,c_fill,q_auto:good/v1761407264/Profile_picture_-_Ahmed_Ben_Yaghlen_gekm80.png",
  },
  {
    id: 2,
    name: "Abdulla Abdulaal",
    country: "Bahrain",
    flag: "🇧🇭",
    photo: "https://res.cloudinary.com/dwqpwi809/image/upload/w_200,h_200,c_fill,q_auto:good/v1761407370/IMG_8887_jfgqtx.jpg",
  },
  {
    id: 14,
    name: "Anas",
    country: "Morocco",
    flag: "🇲🇦",
    photo: "https://res.cloudinary.com/dwqpwi809/image/upload/w_200,h_200,c_fill,q_auto:good/v1761407262/IMG-20251023-WA0108_-_Anas_Raghib_q7qkuk.jpg",
  },
  {
    id: 8,
    name: "Amr Elsharaby",
    country: "Egypt",
    flag: "🇪🇬",
    photo: "https://res.cloudinary.com/dwqpwi809/image/upload/w_200,h_200,c_fill,q_auto:good/v1761407264/Amr_Elsharaby_-_Amr_ElSharaby_sqtkdj.png",
  },
  {
    id: 4,
    name: "Alwalah Fawaz",
    country: "Bahrain",
    flag: "🇧🇭",
    photo: "https://res.cloudinary.com/dwqpwi809/image/upload/w_200,h_200,c_fill,q_auto:good/v1761407235/IMG_3476_pe3lnu.jpg",
  },
  {
    id: 6,
    name: "Fatima Turkistani",
    country: "KSA",
    flag: "🇸🇦",
    photo: "",
  },
  {
    id: 11,
    name: "Judy Abdelrhaman",
    country: "Lebanon",
    flag: "🇱🇧",
    photo: "https://res.cloudinary.com/dwqpwi809/image/upload/v1761407262/85666b5a-0ee0-4dc0-ad70-b55c2ecb20cc_-_Judy_Abdelrahman_id2bty.jpg",
  },
  {
    id: 5,
    name: "Mohammad Ayasi",
    country: "Palestine",
    flag: "🇵🇸",
    photo: "https://res.cloudinary.com/dwqpwi809/image/upload/v1761407262/WhatsApp_Image_2025-10-24_at_20.42.50_433fba07_-_Mohammad_Ayasi_oknoj4.jpg",
  },
  {
    id: 3,
    name: "Moodhi AlDookhi",
    country: "Bahrain",
    flag: "🇧🇭",
    photo: "https://res.cloudinary.com/dwqpwi809/image/upload/v1761407235/IMG_3477_b2ioi1.jpg",
  },
  {
    id: 7,
    name: "Muhamad Olabi",
    country: "UAE",
    flag: "🇦🇪",
    photo: "",
  },
  {
    id: 1,
    name: "Nabil Adili",
    country: "Bahrain",
    flag: "🇧🇭",
    photo:
      "https://res.cloudinary.com/dwqpwi809/image/upload/w_200,h_200,c_fill,q_auto:good/v1760979547/IMG_7427_dx6jqj.jpg",
  },
  {
    id: 9,
    name: "Norah AlRashidi",
    country: "Kuwait",
    flag: "🇰🇼",
    photo: "https://res.cloudinary.com/dwqpwi809/image/upload/w_200,h_200,c_fill,q_auto:good/v1761407261/05e59163-611d-4856-9bf0-fcb241f4fcf4_-_Norah_AlRashidi_z5bqcw.jpg",
  },
  {
    id: 13,
    name: "Reema Al-Kuwari",
    country: "Qatar",
    flag: "🇶🇦",
    photo: "",
  },
  {
    id: 12,
    name: "Sharifa Al Ajmi",
    country: "Oman",
    flag: "🇴🇲",
    photo: "https://res.cloudinary.com/dwqpwi809/image/upload/w_200,h_200,c_fill,q_auto:good/v1761407263/Photo_2_-_Sharifa_AlAjmi_ja1lrm.jpg",
  },
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
  // Data states
  const [announcements, setAnnouncements] = useState(SAMPLE_ANNOUNCEMENTS);
  const [agenda] = useState(SAMPLE_AGENDA);
  const [selectedDay, setSelectedDay] = useState("Day 1");
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

  // scroll position tracking
  const [activeSpotPage, setActiveSpotPage] = useState(0);
  const [activeParticipantPage, setActiveParticipantPage] = useState(0);
  const staticRates = useMemo(
    () => ({
      BHD: 1,
      SAR: 9.9734043,
      AED: 9.7672872,
      QAR: 9.6808511,
      KWD: 0.81355385,
      OMR: 1.0235428,
      JOD: 1.8856383,
      EGP: 126.32828,
      TND: 7.7875803,
      USD: 2.6595745,
    }),
    []
  );

  // announcements carousel index for autoplay (touch-friendly)
  const [, setAnnIndex] = useState(0);

  // ---------------- compute next agenda item and ensure first announcement is it ----------------
  useEffect(() => {
    // Find the next upcoming event across all days
    const now = new Date();
    let nextEvent = null;

    // Iterate through all days to find the next event
    for (const dayEvents of Object.values(agenda)) {
      for (const event of dayEvents) {
        const eventDate = new Date(event.date + " " + event.time.split(" ")[0]);
        if (eventDate >= now) {
          if (
            !nextEvent ||
            eventDate <
              new Date(nextEvent.date + " " + nextEvent.time.split(" ")[0])
          ) {
            nextEvent = event;
          }
        }
      }
    }

    if (nextEvent) {
      // create an announcement for it and ensure it's first
      const agendaAnnouncement = {
        id: `agenda-${nextEvent.id}`,
        text: (
          <>
            <b>Next Up 📌:</b>
            <br />
            {nextEvent.title}
          </>
        ),
        time: nextEvent.time,
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

  // ---------------- Weather fetch (today + tomorrow) using WeatherAPI ----------------
  useEffect(() => {
    let mounted = true;

    // Fallback data in case of API issues
    const FALLBACK = {
      forecast: {
        forecastday: [
          {
            date: new Date().toISOString().split("T")[0],
            day: {
              mintemp_c: 28,
              maxtemp_c: 34,
              condition: { text: "Sunny" },
            },
          },
          {
            date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
            day: {
              mintemp_c: 27,
              maxtemp_c: 33,
              condition: { text: "Partly cloudy" },
            },
          },
        ],
      },
    };

    // WeatherAPI endpoint for Manama, Bahrain (free tier)
    const url =
      "https://api.weatherapi.com/v1/forecast.json?key=1f6ba2a0ab0a46ca826141900232110&q=Manama,Bahrain&days=2&aqi=no";

    setWeather((s) => ({ ...s, loading: true, error: null }));
    fetch(url)
      .then(async (res) => {
        if (!mounted) return;
        if (!res.ok) throw new Error(`Weather fetch failed (${res.status})`);
        const json = await res.json();
        setWeather({ loading: false, error: null, data: json });
      })
      .catch((err) => {
        if (!mounted) return;
        console.log("Weather API error:", err);
        setWeather({
          loading: false,
          error: "Using sample weather data",
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

  // ---------------- Qibla compass with device orientation ----------------
  const [deviceOrientation, setDeviceOrientation] = useState(0);
  const [compassEnabled, setCompassEnabled] = useState(false);

  useEffect(() => {
    const KAABA = { lat: 21.422487, lon: 39.826206 };

    // Request permissions for sensors if available
    const requestSensorPermission = async () => {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        DeviceOrientationEvent.requestPermission
      ) {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          setCompassEnabled(permission === "granted");
        } catch (error) {
          console.error("Error requesting orientation permission:", error);
          setCompassEnabled(false);
        }
      } else {
        // If no permission API, assume it's allowed (older devices)
        setCompassEnabled(true);
      }
    };

    // Handle device orientation updates
    const handleOrientation = (event) => {
      // Get compass heading (alpha) and adjust for different devices/browsers
      let heading = event.webkitCompassHeading || Math.abs(event.alpha - 360);
      setDeviceOrientation(heading);
    };

    // Get initial location and calculate qibla
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const bearing = Math.round(
            bearingBetweenPoints(lat, lon, KAABA.lat, KAABA.lon)
          );
          setQibla({ bearing, userCoords: { lat, lon }, error: null });

          // After getting location, request sensor access
          requestSensorPermission();
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

    // Add orientation event listener if enabled
    if (compassEnabled) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, [compassEnabled]);

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

  // Derived UI data for weather display
  const weatherData = useMemo(() => {
    const forecast = weather?.data?.forecast?.forecastday || [];
    return forecast.map((d) => ({
      day: new Date(d.date).toLocaleDateString(undefined, { weekday: "short" }),
      min: Math.round(d.day?.mintemp_c || 0),
      max: Math.round(d.day?.maxtemp_c || 0),
      condition: d.day?.condition?.text || "",
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

  // Calculate relative qibla direction based on device orientation
  const qiblaDirection =
    qibla && typeof qibla.bearing !== "undefined" && qibla.bearing !== null
      ? qibla.bearing
      : null;

  const relativeQiblaDirection =
    compassEnabled && qiblaDirection !== null
      ? (qiblaDirection - deviceOrientation + 360) % 360
      : null;

  // ---------------- Render ----------------
  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <img
                src="https://images.squarespace-cdn.com/content/v1/620d6e97bbc44626186c910f/3e752b2a-9ebb-4a56-a665-2be558bfdc6a/JA+social+symbol.png"
                alt="Logo"
              />
            </div>
            <div>
              <h1 className="title">Summit E-Guide</h1>
              <p>INJAZ Bahrain Alumni Association</p>
              <span>Manama, Bahrain</span>
            </div>
          </div>
        </div>
      </header>

      {/* Announcements */}
      <section className="section">
        <h2>Live Updates</h2>
        <div className="announcements-scroll">
          {announcements.map((a, i) => (
            <div key={i} className="announcement-card glass-card">
              <div className="announcement-text">{a.text}</div>
              <p className="time">{a.time}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Agenda */}
      <section className="section">
        <h2>Agenda</h2>
        <div className="agenda-tabs">
          {Object.keys(agenda).map((day) => (
            <button
              key={day}
              className={`agenda-tab glass-card ${
                selectedDay === day ? "active" : ""
              }`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
        <div className="agenda-content glass-card">
          {agenda[selectedDay]?.map((session) => (
            <details key={session.id} className="agenda-item">
              <summary>
                <span className="agenda-time">{session.time}</span>
                <span className="agenda-title">{session.title}</span>
              </summary>
              <div className="agenda-details">
                {session.description && (
                  <div className="agenda-description">
                    {session.description}
                  </div>
                )}
                <div className="agenda-location">
                  <span>📍</span>
                  <span>{session.meta?.location || "Location TBA"}</span>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Participants */}
      <section className="section">
        <h2>Meet the Leaders</h2>
        <p className="desc">
          Get to know the inspiring INJAZ alumni leadership joining us from
          across the region.
        </p>
        <div className="participants-container">
          <div
            className="participants-scroll-grid"
            onScroll={(e) => {
              const element = e.currentTarget;
              const scrollLeft = element.scrollLeft;
              const width = element.clientWidth;
              const newPage = Math.round(scrollLeft / width);
              setActiveParticipantPage(newPage);
            }}
          >
            {Array.from({ length: Math.ceil(PARTICIPANTS.length / 4) }).map(
              (_, pageIndex) => (
                <div key={pageIndex} className="participants-page">
                  <div className="participants-grid">
                    {PARTICIPANTS.slice(pageIndex * 4, (pageIndex + 1) * 4).map(
                      (participant) => (
                        <div
                          key={participant.id}
                          className="participant-card glass-card"
                        >
                          {participant.photo ? (
                            <img
                              src={participant.photo}
                              alt={participant.name}
                              className="participant-photo"
                              loading="lazy"
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                            />
                          ) : (
                            <div className="participant-photo placeholder">
                              👤
                            </div>
                          )}
                          <h3 className="participant-name">
                            {participant.name}
                          </h3>
                          <p className="participant-country">
                            <span>{participant.flag}</span>
                            <span>{participant.country}</span>
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>
          <div className="scroll-dots">
            {Array.from({ length: Math.ceil(PARTICIPANTS.length / 4) }).map(
              (_, index) => (
                <div
                  key={index}
                  className={`dot ${
                    index === activeParticipantPage ? "active" : ""
                  }`}
                ></div>
              )
            )}
          </div>
        </div>
        <style>{`
   
        `}</style>
      </section>

      {/* Local Recommendations */}
      <section className="section">
        <h2>Keep it Local</h2>
        <p className="desc">
          Discover the best spots in Bahrain curated just for you.
        </p>
        <div className="spots-container">
          <div
            className="spots-scroll"
            onScroll={(e) => {
              const element = e.currentTarget;
              const scrollLeft = element.scrollLeft;
              const width = element.clientWidth;
              const newPage = Math.round(scrollLeft / width);
              setActiveSpotPage(newPage);
            }}
          >
            {Array.from({ length: Math.ceil(spots.length / 2) }).map(
              (_, pageIndex) => (
                <div key={pageIndex} className="spots-page">
                  <div className="spots-pair">
                    {spots
                      .slice(pageIndex * 2, (pageIndex + 1) * 2)
                      .map((s) => (
                        <div key={s.id} className="spot-card glass-card">
                          <img src={s.img} alt={s.name} />
                          <div className="spot-info">
                            <p className="spot-name">{s.name}</p>
                            <p className="spot-meta">
                              {s.category} • {s.price}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )
            )}
          </div>
          <div className="scroll-dots">
            {Array.from({ length: Math.ceil(spots.length / 2) }).map(
              (_, index) => (
                <div
                  key={index}
                  className={`dot ${index === activeSpotPage ? "active" : ""}`}
                ></div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Weather */}
      {/* <section className="section">
        <h2>Weather</h2>
        <p className="desc">Please note this information may be inaccurate.</p>
        <div className="weather-card glass-card">
          {weatherData.map((day, i) => (
            <div key={i} className="weather-day">
              <p className="day">{day.day}</p>
              <p className="condition">{day.condition}</p>
              <p className="temp">
                🌡 {day.min}° / {day.max}°
              </p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Currency Converter */}
      <section className="section">
        <h2>Currency Converter</h2>
        <p className="desc">
          Please note that these are estimations and actual rates may vary.
        </p>

        <div className="glass-card">
          <div className="currency-input-container">
            <div className="currency-prefix">
              <span className="currency-code">🇧🇭 BHD</span>
            </div>
            <input
              type="number"
              value={amount === 0 ? "" : amount}
              onChange={(e) => {
                const val = e.target.value;
                setAmount(val === "" ? 0 : parseFloat(val));
              }}
              placeholder="0.00"
              className="currency-input"
            />
          </div>
          <div className="currency-grid">
            {currenciesForDisplay.map((c) => (
              <div key={c.code} className="currency-item">
                <span>
                  {c.flag} {c.code}
                </span>
                <span>{(c.converted ?? 0).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prayer Times */}
      <section className="section">
        <h2>Prayer Timings</h2>
        <p className="desc">Prayer times for today in Manama, Bahrain.</p>

        <div className="prayer-times glass-card">
          {prayers.map((p, i) => (
            <div key={i} className="prayer-time">
              <span>{p.name}</span>
              <span>{p.time}</span>
            </div>
          ))}
          {/* <div className="qibla glass-card">
            <div className="compass-container">
              <div
                className="compass"
                style={{
                  transform: compassEnabled
                    ? `rotate(${deviceOrientation}deg)`
                    : "none",
                }}
              >
                <div className="compass-arrow">↑</div>
                <div
                  className="qibla-indicator"
                  style={{
                    transform: `rotate(${qiblaDirection}deg)`,
                    opacity: compassEnabled ? 1 : 0.5,
                  }}
                >
                  ↑
                </div>
              </div>
            </div>
            <div className="compass-info">
              {compassEnabled ? (
                <p>
                  Point your phone's top edge north and rotate to find Qibla
                </p>
              ) : (
                <p>
                  {qiblaDirection !== null
                    ? `Qibla is ${qiblaDirection}° from North`
                    : "Calculating Qibla direction..."}
                </p>
              )}
            </div>
          </div> */}
        </div>
      </section>

      {/* Apps to Download */}
      <section className="section">
        <h2>Essential Apps</h2>
        <p className="desc">
          If there's anything you need, these apps have got you covered.
        </p>
        <div className="apps-scroll">
          {RECOMMENDED_APPS.map((app) => (
            <div key={app.id} className="app-card glass-card">
              <img
                src={app.icon}
                alt={app.name}
                className="app-icon"
                loading="lazy"
              />
              <h3 className="app-name">{app.name}</h3>
              <p className="app-description">{app.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Numbers */}
      <section className="section">
        <h2>Emergency Numbers</h2>
        <p className="desc">Important numbers you may need during your stay</p>
        <div className="emergency-contacts">
          {EMERGENCY_CONTACTS.map((contact) => (
            <a
              key={contact.id}
              href={`tel:${contact.number.replace(/\s+/g, "")}`}
              className="emergency-card glass-card"
            >
              <span className="contact-icon">{contact.icon}</span>
              <div className="contact-info">
                <h3>{contact.name}</h3>
                <p>{contact.number}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">© 2025 INJAZ Alumni Network</footer>
    </div>
  );
}
