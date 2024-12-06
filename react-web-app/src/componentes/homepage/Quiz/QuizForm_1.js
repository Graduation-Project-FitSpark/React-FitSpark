import React, { useContext } from "react";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { QuizContext } from "./QuizContext";
import { useNavigate } from "react-router-dom";

import "./QuizForm.css";

const QuizForm_1 = () => {
  const {
    goal,
    setGoal,
    bodyType,
    setBodyType,
    problemArea,
    setProblemArea,
    targetWeight,
    setTargetWeight,
  } = useContext(QuizContext);

  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (!goal || !bodyType || !problemArea || !targetWeight)
      alert("Please Fill All Fields!");
    else navigate("/QuizForm_2");
  };

  return (
    <form onSubmit={handleNext} className="quiz-form">
      <div className="quiz-container">
        <Typography variant="h4" gutterBottom>
          FitSpark
        </Typography>
        <FormControl component="fieldset" className="MuiFormControl-root">
          <Typography variant="h6" gutterBottom>
            1. Choose your goal?
          </Typography>
          <RadioGroup value={goal} onChange={(e) => setGoal(e.target.value)}>
            <FormControlLabel
              value="Lose weight"
              control={<Radio />}
              label="Lose weight"
            />
            <FormControlLabel
              value="Get shredded"
              control={<Radio />}
              label="Get shredded"
            />
            <FormControlLabel
              value="Gain muscle mass"
              control={<Radio />}
              label="Gain muscle mass"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className="MuiFormControl-root">
          <Typography variant="h6" gutterBottom>
            2. Choose the body you want:{" "}
          </Typography>
          <RadioGroup
            value={bodyType}
            onChange={(e) => setBodyType(e.target.value)}
          >
            <FormControlLabel
              value="Slim body"
              control={<Radio />}
              label="Slim body"
            />
            <FormControlLabel
              value="Hero body"
              control={<Radio />}
              label="Hero body"
            />
            <FormControlLabel
              value="Bodybuilder"
              control={<Radio />}
              label="Bodybuilder"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className="MuiFormControl-root">
          <Typography variant="h6" gutterBottom>
            3. Select problem areas:
          </Typography>
          <RadioGroup
            value={problemArea}
            onChange={(e) => setProblemArea(e.target.value)}
          >
            <FormControlLabel
              value="Slim arms"
              control={<Radio />}
              label="Slim arms"
            />
            <FormControlLabel
              value="Weak chest"
              control={<Radio />}
              label="Weak chest"
            />
            <FormControlLabel
              value="Slim legs"
              control={<Radio />}
              label="Slim legs"
            />
            <FormControlLabel
              value="Beer belly"
              control={<Radio />}
              label="Beer belly"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Target Weight"
          variant="outlined"
          fullWidth
          value={targetWeight}
          onChange={(e) => setTargetWeight(e.target.value)}
        />

        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </div>
    </form>
  );
};

export default QuizForm_1;
