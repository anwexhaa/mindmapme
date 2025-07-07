import React, { useState } from "react";

const moods = ["Happy", "Sad", "Angry", "Anxious", "Excited"];
const triggerOptions = ["Work", "Friends", "Weather", "Music", "Sleep"];

function MoodSelector({ addMoodEntry }) {
  const [index, setIndex] = useState(0);
  const [note, setNote] = useState("");
  const [selectedTriggers, setSelectedTriggers] = useState([]);

  const currentMood = moods[index];

  const handleTriggerToggle = (trigger) => {
    if (selectedTriggers.includes(trigger)) {
      setSelectedTriggers(selectedTriggers.filter((t) => t !== trigger));
    } else {
      setSelectedTriggers([...selectedTriggers, trigger]);
    }
  };

  const handleSubmit = () => {
    addMoodEntry({
      mood: currentMood,
      note,
      triggers: selectedTriggers,
    });
    setNote(""); // reset note
    setSelectedTriggers([]); // reset triggers
  };

  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md space-y-4">
      <div className="flex items-center space-x-4">
        <button onClick={() => setIndex((index - 1 + moods.length) % moods.length)} className="text-xl px-2">◀️</button>
        <span className="text-2xl font-semibold">{currentMood}</span>
        <button onClick={() => setIndex((index + 1) % moods.length)} className="text-xl px-2">▶️</button>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note about how you're feeling..."
        className="w-full p-2 border rounded-md"
        rows={2}
      />

      <div className="flex flex-wrap gap-2 justify-center">
        {triggerOptions.map((trigger) => (
          <button
            key={trigger}
            onClick={() => handleTriggerToggle(trigger)}
            className={`px-3 py-1 rounded-full border ${
              selectedTriggers.includes(trigger)
                ? "bg-pink-300 text-white"
                : "bg-gray-100"
            }`}
          >
            {trigger}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
      >
        Select Mood
      </button>
    </div>
  );
}

export default MoodSelector;
