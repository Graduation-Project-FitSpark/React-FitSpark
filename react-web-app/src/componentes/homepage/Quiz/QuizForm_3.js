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

const QuizForm_3 = () => {
  const {
    additionalGoals,
    setAdditionalGoals,
    pushUps,
    setPushUps,
    pullUps,
    setPullUps,
    waterIntake,
    setWaterIntake,
  } = useContext(QuizContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!additionalGoals || !pushUps || !pullUps || !waterIntake)
      alert("Please Fill All Fields!");
    else navigate("/QuizForm_4");
  };

  return (
    <div className="quiz-form">
      <form onSubmit={handleSubmit} className="quiz-container">
        <Typography variant="h4" gutterBottom>
          FitSpark
        </Typography>

        <FormControl component="fieldset" className="MuiFormControl-root">
          <Typography variant="h6" gutterBottom>
            1. Is there another additional goal?
          </Typography>
          <RadioGroup
            value={additionalGoals}
            onChange={(e) => setAdditionalGoals(e.target.value)}
          >
            <FormControlLabel
              value="improveSleep"
              control={<Radio />}
              label="Improve sleep"
            />
            <FormControlLabel
              value="formHabit"
              control={<Radio />}
              label="Form a physical habit"
            />
            <FormControlLabel
              value="selfDiscipline"
              control={<Radio />}
              label="Self-discipline"
            />
            <FormControlLabel
              value="feelHealthier"
              control={<Radio />}
              label="Feel healthier"
            />
            <FormControlLabel value="none" control={<Radio />} label="None" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className="MuiFormControl-root">
          <Typography variant="h6" gutterBottom>
            2. How many push-ups can you do in a round?
          </Typography>
          <RadioGroup
            value={pushUps}
            onChange={(e) => setPushUps(e.target.value)}
          >
            <FormControlLabel
              value="lessThan10"
              control={<Radio />}
              label="Less than 10"
            />
            <FormControlLabel value="10-20" control={<Radio />} label="10-20" />
            <FormControlLabel value="20-30" control={<Radio />} label="20-30" />
            <FormControlLabel
              value="moreThan30"
              control={<Radio />}
              label="More than 30"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className="MuiFormControl-root">
          <Typography variant="h6" gutterBottom>
            3. How many pull-ups can you do in a round?
          </Typography>
          <RadioGroup
            value={pullUps}
            onChange={(e) => setPullUps(e.target.value)}
          >
            <FormControlLabel
              value="nothing"
              control={<Radio />}
              label="Nothing"
            />
            <FormControlLabel
              value="lessThan5"
              control={<Radio />}
              label="Less than 5"
            />
            <FormControlLabel value="5-10" control={<Radio />} label="5-10" />
            <FormControlLabel
              value="moreThan10"
              control={<Radio />}
              label="More than 10"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className="MuiFormControl-root">
          <Typography variant="h6" gutterBottom>
            4. How much water do you drink daily?
          </Typography>
          <RadioGroup
            value={waterIntake}
            onChange={(e) => setWaterIntake(e.target.value)}
          >
            <FormControlLabel
              value="lessThan1L"
              control={<Radio />}
              label="Less than 1 liter"
            />
            <FormControlLabel
              value="1-2L"
              control={<Radio />}
              label="1-2 liters"
            />
            <FormControlLabel
              value="2-3L"
              control={<Radio />}
              label="2-3 liters"
            />
            <FormControlLabel
              value="moreThan3L"
              control={<Radio />}
              label="More than 3 liters"
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

export default QuizForm_3;
