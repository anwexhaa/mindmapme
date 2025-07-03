import { useState } from "react";

const moods = [
  { label: "Happy", emoji: "😊", color: "#FFD700" },
  { label: "Sad", emoji: "😢", color: "#A0C4FF" },
  { label: "Anxious", emoji: "😰", color: "#BDB2FF" },
  { label: "Angry", emoji: "😠", color: "#FFADAD" },
  { label: "Calm", emoji: "😌", color: "#D0F4DE" },
];

const MoodSelector = () => {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? moods.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === moods.length - 1 ? 0 : prev + 1));
  };

  const handleSelect = () => {
    const selectedMood = moods[index];
    alert(`You selected: ${selectedMood.label} ${selectedMood.emoji}`);
    // or store in localStorage, etc.
  };

  const currentMood = moods[index];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Mood carousel */}
      <div className="flex items-center gap-6">
        <button onClick={handlePrev} className="text-2xl hover:scale-110">◀️</button>

        <div
          className="flex flex-col items-center justify-center px-6 py-4 rounded-xl shadow-md transition"
          style={{
            backgroundColor: currentMood.color,
          }}
        >
          <span className="text-4xl">{currentMood.emoji}</span>
          <span className="text-lg font-semibold">{currentMood.label}</span>
        </div>

        <button onClick={handleNext} className="text-2xl hover:scale-110">▶️</button>
      </div>

      {/* Select button */}
      <button
        onClick={handleSelect}
        className="mt-2 px-6 py-2 bg-[#A875A7] text-white rounded-full shadow hover:bg-[#9666a0] transition"
      >
        Select this mood
      </button>
    </div>
  );
};

export default MoodSelector;
