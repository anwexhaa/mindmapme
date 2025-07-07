import React from "react";

function SettingsView({ onClearData }) {
  return (
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-xl font-bold text-gray-700 text-center">Settings ⚙️</h2>

      <div className="bg-white/90 p-4 rounded-xl shadow space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-600">👤 User</h3>
          <p className="text-gray-500">Not logged in</p>
          {/* In future: add login with Google/etc */}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-600">🔐 Account</h3>
          <button className="text-pink-500 font-medium hover:underline">
            Log In
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-600">🧹 Data</h3>
          <button
            onClick={onClearData}
            className="text-red-500 font-medium hover:underline"
          >
            Clear all mood logs
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsView;
