import React from "react";

function LogView({ entries }) {
  const getEmoji = (mood) => {
    const emojis = {
      Happy: "😊",
      Sad: "😢",
      Angry: "😠",
      Anxious: "😟",
      Excited: "🤩",
    };
    return emojis[mood] || "🫥";
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-xl font-bold text-center text-gray-700">Your Mood Logs 📋</h2>

      {entries.length === 0 ? (
        <p className="text-gray-400 text-center italic">No entries yet…</p>
      ) : (
        <div className="space-y-4 overflow-y-auto max-h-[70vh]">
          {entries
            .slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((entry) => (
              <div key={entry.id} className="bg-white/90 p-4 rounded-xl shadow space-y-2">
                <p className="text-sm text-gray-500 font-semibold">
                  {new Date(entry.date).toDateString()}
                </p>
                <p className="text-lg font-semibold text-gray-700">
                  {getEmoji(entry.mood)} {entry.mood}
                </p>
                {entry.note && (
                  <p className="text-gray-600 italic">“{entry.note}”</p>
                )}
                <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                  {entry.triggers.length > 0 ? (
                    entry.triggers.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 rounded-full bg-gray-100 border text-gray-600"
                      >
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="italic text-gray-400">No triggers</span>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default LogView;
