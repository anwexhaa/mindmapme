import React, { useState, useEffect } from "react";
import MoodSelector from "./components/MoodSelector";
import MoodCalendar from "./components/MoodCalendar";

function App() {
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

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFCCE1] to-[#F2F1ED] flex flex-col items-center pt-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          How are you feeling today? 💭
        </h1>

        <MoodSelector addMoodEntry={addMoodEntry} />

        <MoodCalendar
          entries={entries}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
}

export default App;
