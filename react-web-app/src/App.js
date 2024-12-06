import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./componentes/signup-in/Signin";
import SignUp from "./componentes/signup-in/SignUp";
import Hello from "./componentes/Welcome_Screen/Hellofile";
import Homepage from "./componentes/homepage/Homepagetrinier";
import Authentication from "./componentes/signup-in/Authentication";
import Body from "./componentes/homepage/Body";
import Awards from "./componentes/homepage/feature/Awards";
import Workout from "./componentes/homepage/feature/Workout";
import Exercise from "./componentes/homepage/feature/Exercise";
import Counttostart from "./componentes/homepage/feature/Counttostart";
import StartExercise from "./componentes/homepage/feature/StartExercise";
import Foodplan from "./componentes/homepage/feature/Foodplan";
import Detelsfoode from "./componentes/homepage/feature/Detelsfoode";
import QuizForm_1 from "./componentes/homepage/Quiz/QuizForm_1";
import QuizForm_2 from "./componentes/homepage/Quiz/QuizForm_2";
import QuizForm_3 from "./componentes/homepage/Quiz/QuizForm_3";
import QuizForm_4 from "./componentes/homepage/Quiz/QuizForm_4";
import { QuizProvider } from "./componentes/homepage/Quiz/QuizContext";
import SuccessScreen from "./componentes/homepage/Quiz/SuccessScreen";
import SelectCoach from "./componentes/homepage/Coaches_Specialist_Selecting/SelectCoach";
import SelectSpecialist from "./componentes/homepage/Coaches_Specialist_Selecting/SelectSpecialist";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <QuizProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Hello />} />
            <Route path="/Homepage" element={<Homepage />} />
            <Route path="/firstpage" element={<Hello />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Authentication" element={<Authentication />} />
            <Route path="/body" element={<Body />} />
            <Route path="/Awards" element={<Awards />} />
            <Route path="/Workout" element={<Workout />} />
            <Route path="/Exercise" element={<Exercise />} />
            <Route path="/Counttostart" element={<Counttostart />} />
            <Route path="/StartExercise" element={<StartExercise />} />
            <Route path="/Foodplan" element={<Foodplan />} />
            <Route path="/Detelsfoode" element={<Detelsfoode />} />
            <Route path="/QuizForm_1" element={<QuizForm_1 />} />
            <Route path="/QuizForm_2" element={<QuizForm_2 />} />
            <Route path="/QuizForm_3" element={<QuizForm_3 />} />
            <Route path="/QuizForm_4" element={<QuizForm_4 />} />
            <Route path="/SuccessScreen" element={<SuccessScreen />} />
            <Route path="/SelectCoach" element={<SelectCoach />} />
            <Route path="/SelectSpecialist" element={<SelectSpecialist />} />
          </Routes>
        </BrowserRouter>
      </QuizProvider>
    </div>
  );
}

export default App;
