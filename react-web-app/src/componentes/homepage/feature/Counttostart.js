import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CounterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { videolink, cal, goal } = location.state || {};
  const ss = "rrrr";
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Video data in CounterPage:", videolink);

    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount < 3 ? prevCount + 1 : 0));
    }, 1100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count === 3) {
      const timeout = setTimeout(() => {
        console.log("Video data in CounterPage:", videolink);
        navigate("/StartExercise", { state: { videolink, cal, goal } });
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [count, navigate, videolink, cal]);

  return (
    <div style={styles.container}>
      <p style={styles.counterText}>{count}</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#1a1a2e",
  },
  counterText: {
    color: "#fff",
    fontSize: "300px",
    margin: 0,
  },
};

export default CounterPage;
