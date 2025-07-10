import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import MoodSelector from "./components/MoodSelector";
import MoodCalendar from "./components/MoodCalendar";

import CalendarView from "./views/CalendarView";
import LogView from "./views/LogView";
import SettingsView from "./views/SettingsView";
import LoginView from "./views/LogInView";
import SignUpView from "./views/SignUpView";

import { auth, db } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

import {
  CalendarDays,
  Settings,
  MessageCircleHeart,
  ScrollText,
  Clover,
} from "lucide-react";

function App() {
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() =>
    new Date().toLocaleDateString("en-CA")
  );
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const quotes = [
    "You're not your thoughts. You're the awareness behind them.",
    "Even the darkest night will end and the sun will rise.",
    "Be gentle with yourself. You're doing the best you can.",
    "The mind is everything. What you think you become.",
    "Nothing can dim the light that shines from within.",
  ];
  const todayQuote = quotes[new Date().getDate() % quotes.length];

  // Auth state listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  // Firestore real-time listener
  useEffect(() => {
    if (!isLoggedIn) return;
    const userId = auth.currentUser.uid;
    const userEntriesRef = collection(db, "users", userId, "entries");

    const unsubscribe = onSnapshot(userEntriesRef, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => doc.data());
      setEntries(fetched);
    });

    return () => unsubscribe();
  }, [isLoggedIn]);

  // ✅ Add mood to Firestore and update local state immediately
  const addMoodEntry = async ({ mood, note, triggers }) => {
    const userId = auth.currentUser.uid;
    const entryId = selectedDate;

    const entry = {
      id: entryId,
      mood,
      note,
      triggers,
      date: selectedDate,
    };

    await setDoc(doc(db, "users", userId, "entries", entryId), entry);

    setEntries((prev) => [
      ...prev.filter((e) => e.date !== selectedDate),
      entry,
    ]);
  };

  // Clear all data from Firestore
  const handleClearData = async () => {
    const confirmed = window.confirm("Clear all mood logs?");
    if (!confirmed) return;

    const userId = auth.currentUser.uid;
    const entriesRef = collection(db, "users", userId, "entries");
    const snapshot = await getDocs(entriesRef);
    const deletions = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
    await Promise.all(deletions);

    setEntries([]);
  };

  const PageWrapper = ({ children }) => (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FDFBF8] via-[#FAF9F6] to-[#F5F3EF] flex flex-col items-center pt-12 px-4 pb-24">
      <div className="flex justify-between items-center w-full max-w-5xl mb-4 px-4">
        <button onClick={() => navigate("/calendar")} className="flex-none">
          <CalendarDays className="w-6 h-6 text-black" />
        </button>

        <h1 className="text-xl font-bold text-gray-700 mx-auto px-4">
          MindMapMe
        </h1>

        <button onClick={() => navigate("/settings")} className="flex-none">
          <Settings className="w-6 h-6 text-black" />
        </button>
      </div>

      {children}

      {isLoggedIn && (
        <div className="fixed bottom-4 w-full max-w-md flex justify-around items-center bg-white/70 backdrop-blur-md p-3 rounded-full shadow-lg mx-auto">
          <button onClick={() => navigate("/")}>
            <MessageCircleHeart className="w-6 h-6 text-black" />
          </button>
          <button onClick={() => navigate("/log")}>
            <ScrollText className="w-6 h-6 text-black" />
          </button>
          <button onClick={() => navigate("/quote")}>
            <Clover className="w-6 h-6 text-black" />
          </button>
        </div>
      )}
    </div>
  );

  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Checking login status...
      </div>
    );
  }

  return (
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignUpView />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          <Route
            path="/"
            element={
              <PageWrapper>
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  <div className="bg-white/90 rounded-xl shadow-md p-4 h-full min-h-[500px] flex flex-col">
                    <div className="flex-1">
                      <MoodSelector
                      addMoodEntry={addMoodEntry}
                      currentEntry={entries.find((e) => e.date === selectedDate)}
                       />

                    </div>
                  </div>
                  <div className="bg-white/90 rounded-xl shadow-md p-4 h-full min-h-[500px]">
                    <MoodCalendar
                      entries={entries}
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                    />
                  </div>
                </div>
              </PageWrapper>
            }
          />
          <Route
            path="/calendar"
            element={
              <PageWrapper>
                <CalendarView entries={entries} />
              </PageWrapper>
            }
          />
          <Route
            path="/log"
            element={
              <PageWrapper>
                <LogView entries={entries} />
              </PageWrapper>
            }
          />
          <Route
            path="/quote"
            element={
              <PageWrapper>
                <div className="w-full max-w-md bg-white/90 p-6 rounded-xl shadow text-center space-y-4">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Thought of the Day 🌱
                  </h2>
                  <p className="italic text-gray-600">"{todayQuote}"</p>
                </div>
              </PageWrapper>
            }
          />
          <Route
            path="/settings"
            element={
              <PageWrapper>
                <SettingsView
                  onClearData={handleClearData}
                  onLogout={() => auth.signOut()}
                />
              </PageWrapper>
            }
          />
        </>
      )}
    </Routes>
  );
}

export default App;
