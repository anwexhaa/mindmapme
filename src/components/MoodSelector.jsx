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
    <div className="h-full flex flex-col p-4">
      {/* Mood Selection */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <button 
          onClick={() => setIndex((index - 1 + moods.length) % moods.length)} 
          className="text-xl px-2"
        >
          ◀️
        </button>
        <span className="text-2xl font-semibold">{currentMood}</span>
        <button 
          onClick={() => setIndex((index + 1) % moods.length)} 
          className="text-xl px-2"
        >
          ▶️
        </button>
      </div>

      {/* Note Section */}
      <div className="flex-1 mb-4">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note about how you're feeling..."
          className="w-full h-full p-3 border rounded-lg resize-none"
          rows={4}
        />
      </div>

      {/* Triggers Section */}
      <div className="mb-4">
        <h3 className="text-center mb-2 font-medium">Triggers</h3>
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
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="px-4 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition w-full"
      >
        Select Mood
      </button>
    </div>
  );
}

export default MoodSelector;