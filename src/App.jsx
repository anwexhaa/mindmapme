import GlassJar from "./components/GlassJar";
import MoodSelector from "./components/MoodSelector";
function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFCCE1] to-[#F2F1ED] flex flex-col items-center pt-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 h-20 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-center mb-4 justify-items-center">How are you feeling today?💭</h1>
        {/* here the mood entry component will go */}
        {/* <GlassJar/> */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <MoodSelector />
      </div>
      </div>
    </div>
  );
}

export default App;
