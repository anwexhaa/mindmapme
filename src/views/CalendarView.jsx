import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BookOpenCheck } from "lucide-react";

function CalendarView({ entries }) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

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
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FDFBF8] via-[#FAF9F6] to-[#F5F3EF] px-4 py-6 flex flex-col items-center space-y-6">
      <h1 className="text-xl font-bold text-gray-700 flex items-center gap-2">
        Mood History <BookOpenCheck className="w-6 h-6 text-black" />
      </h1>


      {/* Calendar */}
      <div className="w-full flex justify-center">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow p-4">
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
                  className="w-2.5 h-2.5 rounded-full mx-auto mt-1"
                  style={{ backgroundColor: moodColors[mood] || "#ccc" }}
                ></div>
              );
            }}
          />
        </div>
      </div>

      {/* Log Viewer */}
      {entries.some((e) => e.date === selectedDate) ? (
        <div className="w-full max-w-md bg-white/90 p-4 rounded-xl shadow space-y-3">
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

export default CalendarView;
