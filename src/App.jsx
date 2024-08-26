import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartGame from "./components/StartGame";
import GameWithUser from "./components/GameWithUser";
import GameWithCPU from "./components/GameWithCPU";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartGame />} />
        <Route path="/vsplayer" element={<GameWithUser />} />
        <Route path="/vscpu" element={<GameWithCPU />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
