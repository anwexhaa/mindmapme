import React, { useState, useEffect } from "react";
import MoodSelector from "./components/MoodSelector";
import MoodCalendar from "./components/MoodCalendar";
// import GlassJar from "./components/GlassJar"; // for later :)

function App() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("moodEntries");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(entries));
  }, [entries]);

  const addMoodEntry = (mood) => {
    const today = new Date().toISOString().split("T")[0];
    const newEntry = {
      id: crypto.randomUUID(),
      mood,
      date: today,
    };

    const updated = entries.filter((e) => e.date !== today).concat(newEntry);
    setEntries(updated);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFCCE1] to-[#F2F1ED] flex flex-col items-center pt-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          How are you feeling today? 💭
        </h1>

        <MoodSelector addMoodEntry={addMoodEntry} />
        <MoodCalendar entries={entries} />
      </div>
    </div>
  );
}

export default App;
