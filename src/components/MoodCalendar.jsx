import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MoodCalendar({ entries, selectedDate, setSelectedDate }) {
  const moodColors = {
    Happy: "#F5E054",     // soft yellow
    Sad: "#4D66F5",       // calm blue-gray
    Angry: "#F51E25",     // pastel peach
    Anxious: "#47F596",   // light gray
    Excited: "#F5B3A7",   // warm beige
  };

  const moodEmojis = {
    Happy: "😊",
    Sad: "😢",
    Angry: "😠",
    Anxious: "😟",
    Excited: "🤩",
  };

  const moodMap = entries.reduce((acc, entry) => {
    acc[entry.date] = entry.mood;
    return acc;
  }, {});

  return (
    <div className="flex flex-col items-center mt-6 space-y-4">
      {/* Calendar */}
      <div className="bg-white/60 backdrop-blur-md p-4 rounded-xl shadow-md">
        <Calendar
          onClickDay={(value) =>
            setSelectedDate(value.toLocaleDateString("en-CA"))
          }
          value={new Date(selectedDate)}
          tileContent={({ date }) => {
            const dateStr = date.toLocaleDateString("en-CA");
            const mood = moodMap[dateStr];
            if (!mood) return null;

            return (
              <div
                className="w-3 h-3 rounded-full mx-auto mt-1"
                style={{ backgroundColor: moodColors[mood] || "#ccc" }}
              ></div>
            );
          }}
        />
      </div>

      {/* Mood Log for Selected Date */}
      {entries.some((e) => e.date === selectedDate) ? (
        <div className="w-full max-w-md bg-white/80 p-4 rounded-xl shadow-md space-y-2">
          {entries
            .filter((e) => e.date === selectedDate)
            .map((entry) => (
              <div key={entry.id} className="space-y-1">
                <p className="text-base font-semibold text-gray-700">
                  {moodEmojis[entry.mood]} {entry.mood}
                </p>
                <p className="text-sm italic text-gray-600">“{entry.note}”</p>
                <p className="text-sm text-gray-500">
                  Triggers:{" "}
                  {entry.triggers.length
                    ? entry.triggers.join(", ")
                    : "None"}
                </p>
              </div>
            ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic text-center">
          No mood logged for this date.
        </p>
      )}
    </div>
  );
}

export default MoodCalendar;
