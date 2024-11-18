import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
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
=======
import Signin from "./componentes/signup-in/Signin";
import SignUp from "./componentes/signup-in/SignUp";
import Hello from "./componentes/Welcome_Screen/Hellofile";
import Authentication from "./componentes/signup-in/Authentication";
>>>>>>> a0df0e9d30a07f52719ba7ed6783b0e4154d53de

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route index element={<Homepage />} />
=======
          <Route index element={<Hello />} />
>>>>>>> a0df0e9d30a07f52719ba7ed6783b0e4154d53de
          <Route path="/firstpage" element={<Hello />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Authentication" element={<Authentication />} />
<<<<<<< HEAD
          <Route path="/Authentication" element={<Homepage />} />
          <Route path="/Authentication" element={<Homepage />} />
          <Route path="/body" element={<Body />} />
          <Route path="/Awards" element={<Awards />} />
          <Route path="/Workout" element={<Workout />} />
          <Route path="/Exercise" element={<Exercise />} />
          <Route path="/Counttostart" element={<Counttostart />} />
          <Route path="/StartExercise" element={<StartExercise />} />
=======
>>>>>>> a0df0e9d30a07f52719ba7ed6783b0e4154d53de
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
