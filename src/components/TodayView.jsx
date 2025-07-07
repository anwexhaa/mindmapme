import React from "react";
import MoodSelector from "./MoodSelector";
import MoodCalendar from "./MoodCalendar";

function TodayView({ entries, selectedDate, setSelectedDate, addMoodEntry }) {
  // ✨ Daily Quote Generator
  const quotes = [
    "You did enough today. Rest now. 🌙",
    "Every emotion is valid. Breathe. 🫶",
    "Progress, not perfection. 🌱",
    "Healing isn’t linear. 💫",
    "It’s okay to not be okay. 💖",
    "Tiny steps still count. 👣",
    "You showed up today, and that matters. 💛",
  ];

  const today = new Date().getDate(); // 1–31
  const quoteOfTheDay = quotes[today % quotes.length];

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">

      <h1 className="text-2xl font-bold text-center mb-4">
        How are you feeling today? 💭
      </h1>

      {/* Mood Selector (emoji, note, triggers, save) */}
      <MoodSelector addMoodEntry={addMoodEntry} />

      {/* Mood Calendar (dots for mood on selected date) */}
      <MoodCalendar
        entries={entries}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* 🧘 Quote of the Day */}
      <div className="mt-6 p-4 text-center text-sm italic text-gray-600 bg-[#FFF5F7] rounded-xl">
        “{quoteOfTheDay}”
      </div>
    </div>
  );
}

export default TodayView;
