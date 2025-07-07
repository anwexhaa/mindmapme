import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MoodCalendar({ entries, selectedDate, setSelectedDate }) {
  const moodColors = {
    Happy: "#FFF6B2",
    Sad: "#B3C7F9",
    Angry: "#FFB3B3",
    Anxious: "#D6C4F7",
    Excited: "#FFE7B2",
  };

  const moodMap = entries.reduce((acc, entry) => {
    acc[entry.date] = entry.mood;
    return acc;
  }, {});

  return (
  <div className="flex justify-center mt-6">
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
);

}

export default MoodCalendar;
