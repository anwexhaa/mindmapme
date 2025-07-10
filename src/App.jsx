import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import MoodSelector from "./components/MoodSelector";
import MoodCalendar from "./components/MoodCalendar";

import CalendarView from "./views/CalendarView";
import LogView from "./views/LogView";
import SettingsView from "./views/SettingsView";
import LoginView from "./views/LogInView";
import SignUpView from "./views/SignUpView";

import { auth } from "./firebase";

function App() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("moodEntries");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedDate, setSelectedDate] = useState(() =>
    new Date().toLocaleDateString("en-CA")
  );

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const quotes = [
    "You're not your thoughts. You're the awareness behind them.",
    "Even the darkest night will end and the sun will rise.",
    "Be gentle with yourself. You're doing the best you can.",
    "The mind is everything. What you think you become.",
    "Nothing can dim the light that shines from within.",
  ];
  const todayQuote = quotes[new Date().getDate() % quotes.length];

  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const addMoodEntry = ({ mood, note, triggers }) => {
    const newEntry = {
      id: crypto.randomUUID(),
      mood,
      note,
      triggers,
      date: selectedDate,
    };
    const updated = entries.filter((e) => e.date !== selectedDate).concat(newEntry);
    setEntries(updated);
  };

  const handleClearData = () => {
    const confirmed = window.confirm("Clear all mood logs?");
    if (confirmed) {
      setEntries([]);
      localStorage.removeItem("moodEntries");
    }
  };

const PageWrapper = ({ children }) => (
  <div className="min-h-screen w-full bg-gradient-to-b from-[#FDFBF8] via-[#FAF9F6] to-[#F5F3EF] flex flex-col items-center pt-12 px-4 pb-24">
    {/* Top Header - Updated Layout */}
    <div className="flex justify-between items-center w-full max-w-5xl mb-4 px-4">
      {/* Far Left Calendar Button */}
      <button 
        onClick={() => navigate("/calendar")} 
        className="text-2xl flex-none"
      >
        📆
      </button>
      
      {/* Centered Title */}
      <h1 className="text-xl font-bold text-gray-700 mx-auto px-4">
        MindMapMe
      </h1>
      
      {/* Far Right Settings Button */}
      <button 
        onClick={() => navigate("/settings")} 
        className="text-2xl flex-none"
      >
        ⚙️
      </button>
    </div>

    {/* Main Content */}
    {children}

    {/* Bottom Navigation */}
    {isLoggedIn && (
      <div className="fixed bottom-4 w-full max-w-md flex justify-around items-center bg-white/70 backdrop-blur-md p-3 rounded-full shadow-lg mx-auto">
        <button onClick={() => navigate("/")} className="text-2xl">📅</button>
        <button onClick={() => navigate("/log")} className="text-2xl">📋</button>
        <button onClick={() => navigate("/quote")} className="text-2xl">🧘‍♀️</button>
      </div>
    )}
  </div>
);

  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Checking login status...
      </div>
    );
  }

  return (
    <Routes>
      {!isLoggedIn && (
        <>
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignUpView />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}

      {isLoggedIn && (
        <>
          <Route
  path="/"
  element={
    <PageWrapper>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        <div className="bg-white/90 rounded-xl shadow-md p-4 h-full min-h-[500px] flex flex-col">
          <div className="flex-1">
            <MoodSelector addMoodEntry={addMoodEntry} />
          </div>
        </div>
        <div className="bg-white/90 rounded-xl shadow-md p-4 h-full min-h-[500px]">
          <MoodCalendar
            entries={entries}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
      </div>
    </PageWrapper>
  }
/>

          <Route
            path="/calendar"
            element={
              <PageWrapper>
                <CalendarView entries={entries} />
              </PageWrapper>
            }
          />

          <Route
            path="/log"
            element={
              <PageWrapper>
                <LogView entries={entries} />
              </PageWrapper>
            }
          />

          <Route
            path="/quote"
            element={
              <PageWrapper>
                <div className="w-full max-w-md bg-white/90 p-6 rounded-xl shadow text-center space-y-4">
                  <h2 className="text-lg font-semibold text-gray-700">Thought of the Day 🌱</h2>
                  <p className="italic text-gray-600">"{todayQuote}"</p>
                </div>
              </PageWrapper>
            }
          />

          <Route
            path="/settings"
            element={
              <PageWrapper>
                <SettingsView
                  onClearData={handleClearData}
                  onLogout={() => auth.signOut()}
                />
              </PageWrapper>
            }
          />
        </>
      )}
    </Routes>
  );
}

export default App;