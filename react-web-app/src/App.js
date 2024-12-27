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
import "bootstrap/dist/css/bootstrap.min.css";
import Uploading from "./componentes/coach/homepage/Uploading";
import Friends from "./componentes/coach/homepage/Friends";
import ChatCoach from "./componentes/coach/homepage/ChatCoach";
import FriendsSpecialist from "./componentes/Specialist/homepage/FriendsSpecialist";
import ChatSpecialist from "./componentes/Specialist/homepage/ChatSpecialist";
import ChatTrainerCoach from "./componentes/homepage/ChatTrainerCoach";
import ChatTrainerSpecialist from "./componentes/homepage/ChatTrainerSpecialist";
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
            <Route path="/ChatTrainerCoach" element={<ChatTrainerCoach />} />
            <Route
              path="/ChatTrainerSpecialist"
              element={<ChatTrainerSpecialist />}
            />

            {/*coach */}
            <Route path="/Coahhomepage" element={<Coahhomepage />} />
            <Route path="/TraingPlan" element={<TraingPlan />} />
            <Route path="/Traineeexercise" element={<Traineeexercise />} />
            <Route path="/Requesttraining" element={<Requesttraining />} />
            <Route path="/AnalyticsSection" element={<AnalyticsSection />} />
            <Route path="/Uploading" element={<Uploading />} />
            <Route path="/Friends" element={<Friends />} />
            <Route path="/ChatCoach" element={<ChatCoach />} />

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
            <Route path="/FriendsSpecialist" element={<FriendsSpecialist />} />
            <Route path="/ChatSpecialist" element={<ChatSpecialist />} />
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
      </QuizProvider>
    </div>
  );
}

export default App;
