import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MoodSelector from "./components/MoodSelector";
import MoodCalendar from "./components/MoodCalendar";
import CalendarView from "./views/CalendarView";
import LogView from "./views/LogView";
import SettingsView from "./views/SettingsView";

function App() {
  const navigate = useNavigate();

  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("moodEntries");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedDate, setSelectedDate] = useState(() =>
    new Date().toLocaleDateString("en-CA")
  );

  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(entries));
  }, [entries]);

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
    const confirmed = window.confirm("Are you sure you want to clear all mood logs?");
    if (confirmed) {
      setEntries([]);
      localStorage.removeItem("moodEntries");
    }
  };

  const quotes = [
    "You’re not your thoughts. You’re the awareness behind them.",
    "Even the darkest night will end and the sun will rise.",
    "Be gentle with yourself. You’re doing the best you can.",
    "The mind is everything. What you think you become.",
    "Nothing can dim the light that shines from within.",
  ];
  const todayQuote = quotes[new Date().getDate() % quotes.length];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FDFBF8] via-[#FAF9F6] to-[#F5F3EF] flex flex-col items-center pt-12 px-4 pb-24">

      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-md mb-4 px-2">
        <button onClick={() => navigate("/calendar")} className="text-2xl">📆</button>
        <h1 className="text-xl font-bold text-gray-700">MindMapMe</h1>
        <button onClick={() => navigate("/settings")} className="text-2xl">⚙️</button>
      </div>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="w-full max-w-md space-y-4">
              <MoodSelector addMoodEntry={addMoodEntry} />
              <MoodCalendar
                entries={entries}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
          }
        />
        <Route path="/calendar" element={<CalendarView entries={entries} />} />
        <Route path="/log" element={<LogView entries={entries} />} />
        <Route
          path="/quote"
          element={
            <div className="w-full max-w-md bg-white/90 p-6 rounded-xl shadow text-center space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Thought of the Day 🌱</h2>
              <p className="italic text-gray-600">“{todayQuote}”</p>
            </div>
          }
        />
        <Route path="/settings" element={<SettingsView onClearData={handleClearData} />} />
      </Routes>

      {/* Bottom Navigation */}
      <div className="fixed bottom-4 w-full max-w-md flex justify-around items-center bg-white/70 backdrop-blur-md p-3 rounded-full shadow-lg mx-auto">
        <button onClick={() => navigate("/")} className="text-2xl">📅</button>
        <button onClick={() => navigate("/log")} className="text-2xl">📋</button>
        <button onClick={() => navigate("/quote")} className="text-2xl">🧘‍♀️</button>
      </div>
    </div>
  );
}

export default App;
