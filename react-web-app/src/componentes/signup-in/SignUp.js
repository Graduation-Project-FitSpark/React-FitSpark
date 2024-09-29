import React, { useState, useEffect } from "react";
import URL from "../../enum/enum";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import img from "../../img/wemon-2.png";
import "./Supplement-sginup.css";
import logo from "../../img/logo.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const SignUp = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [gender, setGender] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [classType, setClassType] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [image, setImage] = useState("");
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const navigate = useNavigate();

  const nav = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  };

  useEffect(() => {
    nav();
  }, []);

  function LocationSelector() {
    useMapEvents({
      click(e) {
        setCoordinates({ latitude: e.latlng.lat, longitude: e.latlng.lng });
        console.log("Selected Location: ", e.latlng);
        setLocation(`${e.latlng.lat}, ${e.latlng.lng}`);
      },
    });
    return coordinates.latitude && coordinates.longitude ? (
      <Marker position={[coordinates.latitude, coordinates.longitude]}>
        <Popup>You selected this location!</Popup>
      </Marker>
    ) : null;
  }

  const handleNextStep = async () => {
    if (step === 1) {
      if (!username || !password || !confirmPassword || !type) {
        alert("All fields are required");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        const response = await fetch(`${URL}/ifUserExsistsRouter`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        });
        const data = await response.json();
        if (data.message === "T") {
          alert("Username already exists, please choose another");
          return;
        } else {
          setStep(step + 1);
        }
      } catch (error) {
        console.error("Error checking username:", error);
        alert("Something went wrong");
      }
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const commonData = {
      Username: username,
      Email: email,
      Password: password,
      First_Name: firstName,
      Last_Name: lastName,
      Phone_Number: phoneNumber,
      Age: age,
      Location: location,
      Gender: gender,
      Card_Number: cardNumber,
      Expression_Date: expirationDate,
      CVC: cvc,
    };

    let additionalData = {};
    let endpoint = "";

    if (type === "Trainer") {
      additionalData = {
        Weight: weight,
        Height: height,
        Class_Type: classType,
        Activity_Level: activityLevel,
        Image: image,
      };
      endpoint = `${URL}/signUpTrainer`;
    } else if (type === "Coach") {
      additionalData = {
        YearsOfExperience: yearsOfExperience,
      };
      endpoint = `${URL}/signUpCoach`;
    } else if (type === "Specialist") {
      additionalData = {
        YearsOfExperience: yearsOfExperience,
      };
      endpoint = `${URL}/signUpSpecialist`;
    }

    const finalData = {
      ...commonData,
      ...additionalData,
      role: type,
      Points: 0,
    };

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Registration successful");
          navigate("/signin");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error registering:", error);
        alert("Something went wrong during registration");
      });
  };

  const renderStep1 = () => (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={styles.input}
      />
      <div className="map-location">
        <MapContainer
          center={[coordinates.latitude, coordinates.longitude]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationSelector />
        </MapContainer>
      </div>
      <label>Type</label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Select Type</option>
        <option value="Trainer">Trainer</option>
        <option value="Coach">Coach</option>
        <option value="Specialist">Specialist</option>
      </select>
      <button onClick={handleNextStep}>Next</button>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={styles.input}
      />
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        style={styles.input}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      {type === "Coach" || type === "Specialist" ? (
        <input
          type="number"
          placeholder="Years of Experience"
          value={yearsOfExperience}
          onChange={(e) => setYearsOfExperience(e.target.value)}
          style={styles.input}
        />
      ) : null}

      <input
        type="text"
        placeholder="Credit Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="CVC"
        value={cvc}
        onChange={(e) => setCvc(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Expiration Date"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
        style={styles.input}
      />

      {type === "Trainer" && (
        <>
          <input
            type="number"
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Class Type"
            value={classType}
            onChange={(e) => setClassType(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Activity Level"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            style={styles.input}
          />
        </>
      )}

      <button onClick={handleNextStep}>Submit</button>
    </div>
  );

  return <div>{step === 1 ? renderStep1() : renderStep2()}</div>;
};

const styles = {
  input: {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
    width: "100%",
    maxWidth: "400px",
  },
};

export default SignUp;
