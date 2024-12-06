import React, { useContext } from "react";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Button,
  Typography,
} from "@mui/material";
import { QuizContext } from "./QuizContext";
import { useNavigate } from "react-router-dom";

const QuizForm_2 = () => {
  const {
    expectation,
    setExpectation,
    allergies,
    setAllergies,
    diet,
    setDiet,
    sugarFrequency,
    setSugarFrequency,
  } = useContext(QuizContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expectation || !allergies || !diet || !sugarFrequency)
      alert("Please Fill All Fields!");
    else navigate("/QuizForm_3");
  };
  const navigate = useNavigate();

  return (
    <div className="quiz-form">
      <form onSubmit={handleSubmit} className="quiz-container">
        <Typography variant="h4" gutterBottom>
          FitSpark
        </Typography>

        <FormControl component="fieldset" className="MuiFormControl-root">
          <Typography variant="h6" gutterBottom>
            1. In how many months do you expect to lose weight or improve your
            breast condition?
          </Typography>
          <RadioGroup
            value={expectation}
            onChange={(e) => setExpectation(e.target.value)}
          >
            <FormControlLabel
              value="1-3"
              control={<Radio />}
              label="1-3 months"
            />
            <FormControlLabel
              value="6-9"
              control={<Radio />}
              label="6-9 months"
            />
            <FormControlLabel
              value="moreThanOneYear"
              control={<Radio />}
              label="More than one year"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className="MuiFormControl-root">
          <Typography variant="h6" gutterBottom>
            2. Which of these foods are you allergic to or do not prefer to eat?
          </Typography>
          <RadioGroup
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          >
            <FormControlLabel
              value="legumes"
              control={<Radio />}
              label="Legumes"
            />
            <FormControlLabel
              value="fluids"
              control={<Radio />}
              label="Fluids"
            />
            <FormControlLabel
              value="starches"
              control={<Radio />}
              label="Starches"
            />
            <FormControlLabel value="meats" control={<Radio />} label="Meats" />
            <FormControlLabel value="none" control={<Radio />} label="None" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className="MuiFormControl-root">
          <Typography variant="h6" gutterBottom>
            3. Do you follow any of these diets?
          </Typography>
          <RadioGroup value={diet} onChange={(e) => setDiet(e.target.value)}>
            <FormControlLabel
              value="vegetarian"
              control={<Radio />}
              label="Vegetarian"
            />
            <FormControlLabel value="keto" control={<Radio />} label="Keto" />
            <FormControlLabel value="vegan" control={<Radio />} label="Vegan" />
            <FormControlLabel value="none" control={<Radio />} label="None" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className="MuiFormControl-root">
          <Typography variant="h6" gutterBottom>
            4. How often do you eat sugary foods?
          </Typography>
          <RadioGroup
            value={sugarFrequency}
            onChange={(e) => setSugarFrequency(e.target.value)}
          >
            <FormControlLabel value="never" control={<Radio />} label="Never" />
            <FormControlLabel
              value="1-2"
              control={<Radio />}
              label="1-2 times a week"
            />
            <FormControlLabel
              value="everyDay"
              control={<Radio />}
              label="Every day"
            />
            <FormControlLabel
              value="multiple"
              control={<Radio />}
              label="Multiple times a day"
            />
          </RadioGroup>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </form>
    </div>
  );
};

export default QuizForm_2;
