import { OnboardingForm } from "./components/OnboardingForm";

function App() {
  return (
    <div style={{ padding: "2rem" }} className="bg-gray-100 min-h-screen">
      <h2 className="text-center text-xl">Step 1 of 5</h2>
      <OnboardingForm />
    </div>
  );
}

export default App;
