import React, { useState, useEffect } from "react";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";

const moods = ["Happy", "Sad", "Angry", "Anxious", "Excited"];
const triggerOptions = ["Work", "Friends", "Weather", "Music", "Sleep"];

function MoodSelector({ addMoodEntry, currentEntry }) {
  const initialIndex = currentEntry ? moods.indexOf(currentEntry.mood) : 0;
  const [index, setIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [note, setNote] = useState(currentEntry?.note || "");
  const [selectedTriggers, setSelectedTriggers] = useState(currentEntry?.triggers || []);

  useEffect(() => {
    setIndex(currentEntry ? moods.indexOf(currentEntry.mood) : 0);
    setNote(currentEntry?.note || "");
    setSelectedTriggers(currentEntry?.triggers || []);
  }, [currentEntry]);

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
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Mood Selector */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <button onClick={() => setIndex((index - 1 + moods.length) % moods.length)}>
          <SquareChevronLeft className="w-6 h-6 text-black" />
        </button>
        <span className="text-2xl font-semibold">{currentMood}</span>
        <button onClick={() => setIndex((index + 1) % moods.length)}>
          <SquareChevronRight className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Notes */}
      <div className="flex-1 mb-4">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note about how you're feeling..."
          className="w-full h-full p-3 border rounded-lg resize-none"
        />
      </div>

      {/* Triggers */}
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

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="px-4 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition w-full"
      >
        {currentEntry ? "Update Mood" : "Select Mood"}
      </button>
    </div>
  );
}

export default MoodSelector;
