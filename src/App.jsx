import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
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
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() =>
    new Date().toLocaleDateString("en-CA")
  );
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const quotes = [
    "You’re not your thoughts. You’re the awareness behind them.",
    "Even the darkest night will end and the sun will rise.",
    "Be gentle with yourself. You’re doing the best you can.",
    "The mind is everything. What you think you become.",
    "Nothing can dim the light that shines from within.",
  ];
  const todayQuote = quotes[new Date().getDate() % quotes.length];

  // 🔐 Check auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setIsLoggedIn(!!firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // 🔁 Load entries for this user
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`moodEntries_${user.uid}`);
      setEntries(saved ? JSON.parse(saved) : []);
    }
  }, [user]);

  // 💾 Save entries for this user
  useEffect(() => {
    if (user) {
      localStorage.setItem(`moodEntries_${user.uid}`, JSON.stringify(entries));
    }
  }, [entries, user]);

  const addMoodEntry = ({ mood, note, triggers }) => {
    const newEntry = {
      id: crypto.randomUUID(),
      mood,
      note,
      triggers,
      date: selectedDate,
    };

    const updated = entries.filter((e) => e.date !== selectedDate);
    updated.push(newEntry);
    setEntries([...updated]);
  };

  const handleClearData = () => {
    if (user) {
      const confirmed = window.confirm("Clear all mood logs?");
      if (confirmed) {
        setEntries([]);
        localStorage.removeItem(`moodEntries_${user.uid}`);
      }
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const PageWrapper = ({ children }) => (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FDFBF8] via-[#FAF9F6] to-[#F5F3EF] flex flex-col items-center pt-12 px-4 pb-24">
      <div className="flex justify-between items-center w-full max-w-md mb-4 px-2">
        <button onClick={() => navigate("/calendar")} className="text-2xl">📆</button>
        <h1 className="text-xl font-bold text-gray-700">MindMapMe</h1>
        <button onClick={() => navigate("/settings")} className="text-2xl">⚙️</button>
      </div>

      {children}

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
                <div className="w-full max-w-md space-y-4">
                  <MoodSelector addMoodEntry={addMoodEntry} />
                  <MoodCalendar
                    entries={entries}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
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
                  <p className="italic text-gray-600">“{todayQuote}”</p>
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
                  onLogout={handleLogout}
                  user={user}
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
