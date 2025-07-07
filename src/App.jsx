import React, { useState, useEffect } from "react";
import MoodSelector from "./components/MoodSelector";
import MoodCalendar from "./components/MoodCalendar";
import CalendarView from "./views/CalendarView";
import LogView from "./views/LogView";

function App() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("moodEntries");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedDate, setSelectedDate] = useState(() =>
    new Date().toLocaleDateString("en-CA")
  );

  const [selectedTab, setSelectedTab] = useState("today");

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

  // 🌼 Thought of the Day Logic
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
        <button onClick={() => setSelectedTab("calendarFull")} className="text-2xl">
          📆
        </button>
        <h1 className="text-xl font-bold text-gray-700">MindMapMe</h1>
        <button onClick={() => setSelectedTab("settings")} className="text-2xl">
          ⚙️
        </button>
      </div>

      {/* Quote Screen */}
      {selectedTab === "quote" && (
        <div className="w-full max-w-md bg-white/90 p-6 rounded-xl shadow text-center space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Thought of the Day 🌱</h2>
          <p className="italic text-gray-600">
            “{todayQuote}”
          </p>
        </div>
      )}

      {/* Mood Tracker Today Screen */}
      {selectedTab === "today" && (
        <div className="w-full max-w-md space-y-4">
          <MoodSelector addMoodEntry={addMoodEntry} />
          <MoodCalendar
            entries={entries}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
      )}

      {/* Full Calendar Screen */}
      {selectedTab === "calendarFull" && (
        <CalendarView entries={entries} />
      )}

      {/* Log Placeholder */}
      {selectedTab === "log" && <LogView entries={entries} />}


      {/* Settings Placeholder */}
      {selectedTab === "settings" && (
        <div className="w-full max-w-md bg-white/80 p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">Settings coming soon 🛠️</p>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-4 w-full max-w-md flex justify-around items-center bg-white/70 backdrop-blur-md p-3 rounded-full shadow-lg mx-auto">
        <button onClick={() => setSelectedTab("today")} className="text-2xl">📅</button>
        <button onClick={() => setSelectedTab("log")} className="text-2xl">📋</button>
        <button onClick={() => setSelectedTab("quote")} className="text-2xl">🧘‍♀️</button>
      </div>
    </div>
  );
}

export default App;
