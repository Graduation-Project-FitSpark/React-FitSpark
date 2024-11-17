import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./signup-in/Signin";
import SignUp from "./signup-in/SignUp";
import Hello from "./componentes/Hellofile";
import Homepage from "./componentes/homepage/Homepagetrinier";
import Authentication from "./signup-in/Authentication";
import Body from "./componentes/homepage/Body";
import Awards from "./componentes/homepage/feature/Awards";
import Workout from "./componentes/homepage/feature/Workout";
import Exercise from "./componentes/homepage/feature/Exercise";
import Counttostart from "./componentes/homepage/feature/Counttostart";
import StartExercise from "./componentes/homepage/feature/StartExercise";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/firstpage" element={<Hello />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Authentication" element={<Authentication />} />
          <Route path="/Authentication" element={<Homepage />} />
          <Route path="/Authentication" element={<Homepage />} />
          <Route path="/body" element={<Body />} />
          <Route path="/Awards" element={<Awards />} />
          <Route path="/Workout" element={<Workout />} />
          <Route path="/Exercise" element={<Exercise />} />
          <Route path="/Counttostart" element={<Counttostart />} />
          <Route path="/StartExercise" element={<StartExercise />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
