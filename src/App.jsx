import React, { useState, useEffect } from "react";
import TodayView from "./components/TodayView";
// import CalendarView from "./components/CalendarView"; // Uncomment when ready
// import LogView from "./components/LogView";           // Uncomment when ready

function App() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("moodEntries");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedDate, setSelectedDate] = useState(() =>
    new Date().toLocaleDateString("en-CA")
  );

  const [activeView, setActiveView] = useState("today"); // default = mood input screen

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

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFCCE1] to-[#F2F1ED] flex flex-col items-center pt-12 px-4 pb-24">

      {/* 🔝 Top Nav */}
      <div className="w-full max-w-md flex justify-between px-4 mb-4">
        <button onClick={() => setActiveView("calendar")}>📆</button>
        <button onClick={() => alert("Settings coming soon!")}>⚙️</button>
      </div>

      {/* 📄 Main Content Based on View */}
      {activeView === "today" && (
        <TodayView
          entries={entries}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          addMoodEntry={addMoodEntry}
        />
      )}

      {activeView === "calendar" && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 text-center">
          <p className="text-gray-600">🧘‍♀️ Mindfulness or Calendar View coming soon!</p>
        </div>
      )}

      {activeView === "log" && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 text-center">
          <p className="text-gray-600">🧾 Mood Log View coming soon!</p>
        </div>
      )}

      {/* 🔻 Bottom Nav (Updated icons + actions) */}
      <div className="fixed bottom-0 w-full max-w-md bg-white flex justify-around p-3 shadow-inner">
        <button onClick={() => setActiveView("today")}>📅</button> {/* Mood logging screen */}
        <button onClick={() => setActiveView("log")}>🧾</button>   {/* Log of past entries */}
        <button onClick={() => setActiveView("calendar")}>🧘‍♀️</button> {/* Placeholder */}
      </div>
    </div>
  );
}

export default App;
