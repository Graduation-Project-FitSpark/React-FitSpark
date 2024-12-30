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
import AdminHomeScreen from "./componentes/Adminuser/homescreen/Homescreen";
import Chosseuser from "./componentes/Adminuser/AdminActivities/Chosseuser";
import EditTrainees from "./componentes/Adminuser/AdminActivities/Editeuser/EditTrainees";
import EditCoach from "./componentes/Adminuser/AdminActivities/Editeuser/EditCoach";
import EditSpecialist from "./componentes/Adminuser/AdminActivities/Editeuser/EditSpecialist";
import AddAwards from "./componentes/Adminuser/AdminActivities/AddAwards";
import Requestcoachspecialist from "./componentes/Adminuser/AdminActivities/Requestcoachspecialist";
import Applicantscoach from "./componentes/Adminuser/AdminActivities/Applicantscoach";
import ApplicantsSpecialist from "./componentes/Adminuser/AdminActivities/ApplicantsSpecialist";
import Aerobicexercises from "./componentes/homepage/feature/Aerobicexercises";
import Firstexercises from "./componentes/homepage/feature/AerobicExercises/Firstexercises";
import Shop from "./componentes/homepage/Shop";
import Iteamshop from "./componentes/homepage/Iteamshop";
import Cart from "./componentes/homepage/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import MyProvider from "./MyProvider";
function App() {
  return (
    <div className="App">
      <MyProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
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
            <Route path="/Aerobicexercises" element={<Aerobicexercises />} />
            <Route path="/Firstexercises" element={<Firstexercises />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/Iteamshop" element={<Iteamshop />} />
            <Route path="/Cart" element={<Cart />} />
            {/*coach */}
            <Route path="/Coahhomepage" element={<Coahhomepage />} />
            <Route path="/TraingPlan" element={<TraingPlan />} />
            <Route path="/Traineeexercise" element={<Traineeexercise />} />
            <Route path="/Requesttraining" element={<Requesttraining />} />
            <Route path="/AnalyticsSection" element={<AnalyticsSection />} />
            {/*Specialist */}
            <Route
              path="/Homepagespecialist"
              element={<Homepagespecialist />}
            />
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
            {/*Admin */}
            <Route path="/AdminHomeScreen" element={<AdminHomeScreen />} />
            <Route path="/Chosseuser" element={<Chosseuser />} />
            <Route path="/EditTrainees" element={<EditTrainees />} />
            <Route path="/EditCoach" element={<EditCoach />} />
            <Route path="/EditSpecialist" element={<EditSpecialist />} />
            <Route path="/AddAwards" element={<AddAwards />} />
            <Route
              path="/Requestcoachspecialist"
              element={<Requestcoachspecialist />}
            />
            <Route path="/Applicantscoach" element={<Applicantscoach />} />
            <Route
              path="/ApplicantsSpecialist"
              element={<ApplicantsSpecialist />}
            />
          </Routes>
        </BrowserRouter>
      </MyProvider>
    </div>
  );
}

export default App;
