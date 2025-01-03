import React, { useState, useEffect } from "react";
import EnumURL from "../../enum/enum.js";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

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
  const [description, setDescription] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [gender, setGender] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [classType, setClassType] = useState("");
  const [activityLevel, setActivityLevel] = useState("Normal");
  const [image, setImage] = useState("");
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const navigate = useNavigate();
  const activityLabels = ["Normal", "Fat", "Very Fat"];
  const handleSliderChange = (e) => {
    const value = e.target.value;
    setActivityLevel(activityLabels[value]);
  };
  const pickImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const tempUrl = URL.createObjectURL(file);
    setUploadedImageUrl(tempUrl);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = 300;
        canvas.height = 300;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const base64 = canvas.toDataURL("image/jpeg", 0.5);
        const base64WithoutPrefix = base64.split(",")[1];

        setImage(base64WithoutPrefix);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const newLocation = {
          latitude: lat,
          longitude: lng,
        };
        setLocation(newLocation);
      },
    });
    return null;
  };
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
        const response = await fetch(`${EnumURL}/ifUserExsistsRouter`, {
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
  const uploadImage = async (imageBase64, username) => {
    try {
      const response = await fetch(`${EnumURL}/uploadProfileImgRouter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          img: imageBase64,
          username: username,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Image uploaded successfully:", data);
      } else {
        console.error("Error uploading image:", data.error);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleSubmit = async () => {
    const newLocation = `[${location.latitude},${location.longitude}]`;
    const commonData = {
      Username: username,
      Email: email,
      Password: password,
      First_Name: firstName,
      Last_Name: lastName,
      Phone_Number: phoneNumber,
      Age: age,
      Location: newLocation,
      Gender: gender,
      Card_Number: cardNumber,
      Expression_Date: expirationDate,
      CVC: cvc,
    };

    let additionalData = {};
    let endpoint = "";

    if (type === "Trainee") {
      additionalData = {
        Weight: weight,
        Height: height,
        Class_Type: classType,
        Activity_Level: activityLevel,
        Image: image,
      };
      endpoint = `${EnumURL}/signUpTrainer`;
    } else if (type === "Coach") {
      additionalData = {
        YearsOfExperience: yearsOfExperience,
        Description: description,
      };
      endpoint = `${EnumURL}/signUpCoach`;
    } else if (type === "Nutrition expert") {
      additionalData = {
        YearsOfExperience: yearsOfExperience,
        Description: description,
      };
      endpoint = `${EnumURL}/signUpSpecialist`;
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
    await uploadImage(image, username);
    navigate("/Signin");
  };
  const renderStep1 = () => (
    <div className="step">
      <img src={logo} alt="Logo" className="auth-logo" />

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input"
      />
      <label>Type</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="select"
      >
        <option value="">Select Type</option>
        <option value="Trainee">Trainee</option>
        <option value="Coach">Coach</option>
        <option value="Nutrition expert">Nutrition expert</option>
      </select>

      <button onClick={handleNextStep} className="button-next">
        Next
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="step">
      <img src={logo} alt="Logo" className="auth-logo" />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="input"
      />
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="select"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <div className="image-upload-container">
        <label className="label">Upload Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={pickImage}
          className="file-input"
        />
        {uploadedImageUrl && (
          <img
            src={uploadedImageUrl}
            alt="Profile Preview"
            className="profile-image"
          />
        )}
      </div>
      <div className="map-location" style={{ height: "250px", width: "100%" }}>
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler />
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>
              Latitude: {location.latitude.toFixed(6)}, Longitude:{" "}
              {location.longitude.toFixed(6)}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      {type === "Coach" || type === "Nutrition expert"
        ? ((
            <input
              type="number"
              placeholder="Years of Experience"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              className="input"
            />
          ),
          (
            <input
              type="text"
              placeholder="Description (Write why you want to sign for this site)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input"
            />
          ))
        : null}
      <input
        type="text"
        placeholder="Credit Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="CVC"
        value={cvc}
        onChange={(e) => setCvc(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Expiration Date"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
        className="input"
      />
      {type === "Trainee" && (
        <>
          <input
            type="number"
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="Height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="input"
          />
          <select
            value={classType}
            onChange={(e) => setClassType(e.target.value)}
            className="select"
          >
            <option value="">Select Type</option>
            <option value="Cardio">Cardio</option>
            <option value="Strength">Strength</option>
          </select>
          <label htmlFor="activitySlider" className="label">
            Activity Level
          </label>
          <input
            id="activitySlider"
            type="range"
            min="0"
            max="2"
            step="1"
            value={activityLabels.indexOf(activityLevel)}
            onChange={handleSliderChange}
            className="slider"
          />
          <p>Selected Activity Level: {activityLevel}</p>
        </>
      )}
      <button onClick={handleNextStep} className="button-next">
        Submit
      </button>
    </div>
  );

  return (
    <div className="auth-container_su">
      <div className="auth-left_su">
        {step === 1 ? renderStep1() : renderStep2()}
      </div>
    </div>
  );
};

export default SignUp;
