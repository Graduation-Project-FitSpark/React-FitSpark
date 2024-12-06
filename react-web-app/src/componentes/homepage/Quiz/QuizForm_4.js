import React, { useContext } from "react";
import {
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";
import { QuizContext } from "./QuizContext";
import { useNavigate } from "react-router-dom";
import "./QuizForm.css";
import axios from "axios";
import URL from "../../../enum/enum";
const QuizForm_4 = () => {
  const {
    goal,
    bodyType,
    problemArea,
    expectation,
    allergies,
    diet,
    sugarFrequency,
    waterIntake,
    targetWeight,
    additionalGoals,
    pushUps,
    pullUps,
    workoutTime,
    mealPrepTime,
    physicalLimitations,
    supplements,
    sleepPattern,
    setGoal,
    setBodyType,
    setProblemArea,
    setExpectation,
    setAllergies,
    setDiet,
    setSugarFrequency,
    setTargetWeight,
    setAdditionalGoals,
    setPushUps,
    setPullUps,
    setWorkoutTime,
    setMealPrepTime,
    setPhysicalLimitations,
    setSupplements,
    setSleepPattern,
  } = useContext(QuizContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Final Submission:");
    console.log("Goal:", goal);
    console.log("Body Type:", bodyType);
    console.log("Problem Area:", problemArea);
    console.log("Expectation:", expectation);
    console.log("Allergies:", allergies);
    console.log("Diet Preference:", diet);
    console.log("Sugar Frequency:", sugarFrequency);
    console.log("Water Intake:", waterIntake);
    console.log("Target Weight:", targetWeight);
    console.log("Additional Goals:", additionalGoals);
    console.log("Push-ups:", pushUps);
    console.log("Pull-ups:", pullUps);
    console.log("Workout Time:", workoutTime);
    console.log("Meal Prep Time:", mealPrepTime);
    console.log("Physical Limitations:", physicalLimitations);
    console.log("Supplements:", supplements);
    console.log("Sleep Pattern:", sleepPattern);
    if (
      !workoutTime ||
      !mealPrepTime ||
      !physicalLimitations ||
      !supplements ||
      !sleepPattern
    )
      alert("Please Fill All Fields!");
    else {
      let Foods = [];
      let Trains = [];
      let userDetails = {};
      const username = localStorage.getItem("username");
      try {
        const foodsResponse = await fetch(`${URL}/getFoods`);
        const foodsData = await foodsResponse.json();
        Foods = foodsData.foods;
        const trainsResponse = await fetch(`${URL}/getTrains`);
        const trainsData = await trainsResponse.json();
        Trains = trainsData.trains;
        const userResponse = await fetch(`${URL}/getTrainerDetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });
        const userData = await userResponse.json();
        userDetails = userData.trainer;

        const trainerId = userDetails.ID_Trainer;
        const openAiPrompt = `
As a fitness trainer, I'm working with a client who has provided answers to several questions related to their fitness and dietary goals. Based on their answers, I would like you to help organize their 'Foods' and 'Trains' into specific recommendations for each day of the week.

### Important:
1. I am sending you three arrays:
    - 'Foods': A list of possible food options with their corresponding IDs.
    - 'Trains': A list of possible workouts and exercises with their corresponding IDs.
    - 'userDetails': The client's detailed information based on their answers to the quiz.
    
2. Based on the 'userDetails', select appropriate items from the 'Foods' and 'Trains' arrays for each day of the week.

3. For the 'Foods' array:
    - Each day of the week (Saturday to Friday) should contain **three** entries for food (one for Breakfast, one for Lunch, one for Dinner).
    - You will need to return the food recommendations in JSON format, with each food being selected by its ID from the 'Foods' array.
    - Along with the food ID, you need to specify the meal time: either 'Breakfast', 'Lunch', or 'Dinner'.

4. For the 'Trains' array:
    - Each day of the week (Saturday to Friday) should contain 2 or 3 separate workout recommendations for each ID_Trainer.
    - Each recommendation should be listed as a separate JSON object with fields: ID_Trainer, ID_Train, Day_Of_Week, and Steps.
    - The Steps field should be an integer representing the number of steps, repetitions, or sets for the workout.
  
### Output Format:
The result should be returned in the following JSON format:

{
    "Foods": {
        "Saturday": [
            {"ID": ..., "Time": "Breakfast"},
            {"ID": ..., "Time": "Lunch"},
            {"ID": ..., "Time": "Dinner"}
        ],
        "Sunday": [
            {"ID": ..., "Time": "Breakfast"},
            {"ID": ..., "Time": "Lunch"},
            {"ID": ..., "Time": "Dinner"}
        ],
        "Monday": [
            {"ID": ..., "Time": "Breakfast"},
            {"ID": ..., "Time": "Lunch"},
            {"ID": ..., "Time": "Dinner"}
        ],
        "Tuesday": [
            {"ID": ..., "Time": "Breakfast"},
            {"ID": ..., "Time": "Lunch"},
            {"ID": ..., "Time": "Dinner"}
        ],
        "Wednesday": [
            {"ID": ..., "Time": "Breakfast"},
            {"ID": ..., "Time": "Lunch"},
            {"ID": ..., "Time": "Dinner"}
        ],
        "Thursday": [
            {"ID": ..., "Time": "Breakfast"},
            {"ID": ..., "Time": "Lunch"},
            {"ID": ..., "Time": "Dinner"}
        ],
        "Friday": [
            {"ID": ..., "Time": "Breakfast"},
            {"ID": ..., "Time": "Lunch"},
            {"ID": ..., "Time": "Dinner"}
        ]
    },
    "Trains": {
        "Saturday": [
            {"ID_Trainer": ..., "ID_Train": ..., "Day_Of_Week": "Saturday", "Steps": ...},
            {"ID_Trainer": ..., "ID_Train": ..., "Day_Of_Week": "Saturday", "Steps": ...}
        ],
        "Sunday": [
            {"ID_Trainer": ..., "ID_Train": ..., "Day_Of_Week": "Sunday", "Steps": ...},
            {"ID_Trainer": ..., "ID_Train": ..., "Day_Of_Week": "Sunday", "Steps": ...}
        ],
        "Monday": [
            {"ID_Trainer": ..., "ID_Train": ..., "Day_Of_Week": "Monday", "Steps": ...},
            {"ID_Trainer": ..., "ID_Train": ..., "Day_Of_Week": "Monday", "Steps": ...}
        ],
        "Tuesday": [
            {"ID_Trainer": ..., "ID_Train": ..., "Day_Of_Week": "Tuesday", "Steps": ...},
            {"ID_Trainer": ..., "ID_Train": ..., "Day_Of_Week": "Tuesday", "Steps": ...}
        ],
        "Wednesday": [
            {"ID_Trainer": ..., "ID_Train": ..., "Day_Of_Week": "Wednesday", "Steps": ...},
            {"ID_Trainer": ..., "ID_Train": ..., "Day_Of_Week": "Wednesday", "Steps": ...}
        ],
        "Thursday": [
            {"ID_Trainer": ..., "ID_Train": ..., "Day_Of_Week": "Thursday", "Steps": ...},
            {"ID_Trainer": ..., "ID_Train": ..., "Day_Of_Week": "Thursday", "Steps": ...}
        ],
        "Friday": [
            {"ID_Trainer": ..., "ID_Train": ..., "Day_Of_Week": "Friday", "Steps": ...},
            {"ID_Trainer": ..., "ID_Train": ..., "Day_Of_Week": "Friday", "Steps": ...}
        ]
    }
}

### Client Information:
- Foods: ${JSON.stringify(Foods)}
- Trains: ${JSON.stringify(Trains)}
- userDetails: ${JSON.stringify(userDetails)}

Here are the client's answers to the questions:

Q1 - Goal: ${goal}
Q2 - Body Type: ${bodyType}
Q3 - Problem Area: ${problemArea}
Q4 - Expectation (time to achieve goal): ${expectation}
Q5 - Allergies (foods to avoid): ${allergies}
Q6 - Diet (any specific diet): ${diet}
Q7 - Sugar Frequency (how often they eat sugary foods): ${sugarFrequency}
Q8 - Water Intake (daily water intake): ${waterIntake}
Q9 - Target Weight: ${targetWeight}
Q10 - Additional Goals (if any): ${additionalGoals}
Q11 - Push Ups (how many they can do in a round): ${pushUps}
Q12 - Pull Ups (how many they can do in a round): ${pullUps}
Q13 - Workout Time (how much time they are willing to spend on workouts): ${workoutTime}
Q14 - Meal Prep Time (how much time they are ready to spend on meal prep): ${mealPrepTime}
Q15 - Physical Limitations (any past injuries or physical limitations): ${physicalLimitations}
Q16 - Supplements (whether they take any supplements): ${supplements}
Q17 - Sleep Pattern (current sleep pattern): ${sleepPattern}

Please take these answers into account and provide **7 days' worth** of food and workout recommendations using the 'Foods' and 'Trains' arrays.

Ensure that:
- Foods are assigned by their ID with the correct meal time (Breakfast, Lunch, Dinner).
- Trains are selected by their ID from the 'Trains' array.
- The Steps field in the Trains array is an integer.

Don't give me any justification—just provide the JSON result so I can use it in my code.
`;

        const openAiResponse = await fetch(`${URL}/sendQuizResult`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: openAiPrompt }),
        });

        const openAiData = await openAiResponse.json();
        console.log(openAiData);

        await fetch(`${URL}/sendingFinalResponse`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            response: openAiData,
            trainerId: trainerId,
          }),
        });

        console.log("Success Sending and finishing!");
        navigate("/SuccessScreen");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div className="quiz-form">
      <form onSubmit={handleSubmit} className="quiz-container">
        <Typography variant="h4" gutterBottom>
          FitSpark
        </Typography>

        <FormControl component="fieldset" className="MuiFormControl-root">
          <Typography variant="h6" gutterBottom>
            1. How much time are you willing to spend on a workout?
          </Typography>
          <RadioGroup
            value={workoutTime}
            onChange={(e) => setWorkoutTime(e.target.value)}
          >
            <FormControlLabel
              value="30Min"
              control={<Radio />}
              label="30 minutes"
            />
            <FormControlLabel
              value="45Min"
              control={<Radio />}
              label="45 minutes"
            />
            <FormControlLabel
              value="1Hour"
              control={<Radio />}
              label="1 hour"
            />
            <FormControlLabel
              value="moreThan1Hour"
              control={<Radio />}
              label="More than 1 hour"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className="MuiFormControl-root">
          <Typography variant="h6" gutterBottom>
            2. How much time are you ready to spend per meal prep?
          </Typography>
          <RadioGroup
            value={mealPrepTime}
            onChange={(e) => setMealPrepTime(e.target.value)}
          >
            <FormControlLabel
              value="lessThan30Min"
              control={<Radio />}
              label="Less than 30 minutes"
            />
            <FormControlLabel
              value="30To60Min"
              control={<Radio />}
              label="30-60 minutes"
            />
            <FormControlLabel
              value="moreThan1HourMealPrep"
              control={<Radio />}
              label="More than 1 hour"
            />
            <FormControlLabel
              value="orderMeals"
              control={<Radio />}
              label="Just ordering meals"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className="MuiFormControl-root">
          <Typography variant="h6" gutterBottom>
            3. Do you have any past injuries or physical limitations?
          </Typography>
          <RadioGroup
            value={physicalLimitations}
            onChange={(e) => setPhysicalLimitations(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className="MuiFormControl-root">
          <Typography variant="h6" gutterBottom>
            4. Do you take any supplements?{" "}
          </Typography>
          <RadioGroup
            value={supplements}
            onChange={(e) => setSupplements(e.target.value)}
          >
            <FormControlLabel
              value="proteinPowder"
              control={<Radio />}
              label="Protein powder"
            />
            <FormControlLabel
              value="multivitamins"
              control={<Radio />}
              label="Multivitamins"
            />
            <FormControlLabel
              value="creatine"
              control={<Radio />}
              label="Creatine"
            />
            <FormControlLabel value="none" control={<Radio />} label="None" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className="MuiFormControl-root">
          <Typography variant="h6" gutterBottom>
            5. What is your current sleep pattern like?
          </Typography>
          <RadioGroup
            value={sleepPattern}
            onChange={(e) => setSleepPattern(e.target.value)}
          >
            <FormControlLabel
              value="lessThan6Hours"
              control={<Radio />}
              label="Less than 6 hours"
            />
            <FormControlLabel
              value="6To7Hours"
              control={<Radio />}
              label="6-7 hours"
            />
            <FormControlLabel
              value="7To8Hours"
              control={<Radio />}
              label="7-8 hours"
            />
            <FormControlLabel
              value="moreThan8Hours"
              control={<Radio />}
              label="More than 8 hours"
            />
          </RadioGroup>
        </FormControl>

        <Box display="flex" justifyContent="center">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default QuizForm_4;
