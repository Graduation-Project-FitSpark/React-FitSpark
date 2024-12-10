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
import Coahhomepage from "./componentes/coach/homepage/homepagecoach";
import TraingPlan from "./componentes/coach/feature/TraingPlan";
import Traineeexercise from "./componentes/coach/feature/Traineeexercise";
import Requesttraining from "./componentes/coach/feature/Requesttraining";
import AnalyticsSection from "./componentes/coach/feature/AnalyticsSection";
import Homepagespecialist from "./componentes/Specialist/homepage/homepagespecialist";
import RequesttrainingSpecialist from "./componentes/Specialist/feature/RequesttrainingSpecialist";
import TraingPlanSpecialist from "./componentes/Specialist/feature/TraingPlanSpecialist";
import Traineefood from "./componentes/Specialist/feature/Traineefood";
import Inreotranineranalytics from "./componentes/Specialist/feature/Inreotranineranalytics";
import AnalyticsSectionSpecialist from "./componentes/Specialist/feature/AnalyticsSectionSpecialist";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepagespecialist />} />
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
          {/*coach */}
          <Route path="/Coahhomepage" element={<Coahhomepage />} />
          <Route path="/TraingPlan" element={<TraingPlan />} />
          <Route path="/Traineeexercise" element={<Traineeexercise />} />
          <Route path="/Requesttraining" element={<Requesttraining />} />
          <Route path="/AnalyticsSection" element={<AnalyticsSection />} />
          {/*Specialist */}
          <Route path="/Homepagespecialist" element={<Homepagespecialist />} />
          <Route
            path="/RequesttrainingSpecialist"
            element={<RequesttrainingSpecialist />}
          />
          <Route
            path="/TraingPlanSpecialist"
            element={<TraingPlanSpecialist />}
          />
          <Route path="/Traineefood" element={<Traineefood />} />
          <Route
            path="/Inreotranineranalytics"
            element={<Inreotranineranalytics />}
          />
          <Route
            path="/AnalyticsSectionSpecialist"
            element={<AnalyticsSectionSpecialist />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
