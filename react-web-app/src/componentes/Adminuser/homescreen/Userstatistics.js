import React, { useEffect, useState } from "react";
import "./Userstatistics.css";
import {
  IoBarbell,
  IoPersonAdd,
  IoFastFood,
  IoPeople,
  IoBasket,
  IoCheckmarkDoneOutline,
  IoMedal,
} from "react-icons/io5";
import URL from "../../../enum/enum";
import axios from "axios";

function Userstatistics() {
  const [lengthCoach, setLengthCoach] = useState(0);
  const [lengthSpecialist, setLengthSpecialist] = useState(0);
  const [lengthTrainees, setLengthTrainees] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalWatchedVideos, setTotalWatchedVideos] = useState(0);
  const [maxPointCoach, setMaxPointCoach] = useState(null);
  const [maxPointSpecialist, setMaxPointSpecialist] = useState(null);
  const [valueMaxPointCoach, setValueMaxPointCoach] = useState(0);
  const [valueMaxPointSpecialist, setValueMaxPointSpecialist] = useState(0);
  const [sale, setSale] = useState(0);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [coach, setCoach] = useState([]);

  const [specialist, setSpecialist] = useState([]);

  const [trainees, setTrainees] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${URL}/getTrainerSpecificDetails`);

        if (!response.ok) {
          throw new Error("Failed to fetch trainer details");
        }
        const data = await response.json();
        setTrainees(data);

        const response2 = await fetch(`${URL}/getAllCoachesAdmin`);

        if (!response2.ok) {
          throw new Error("Failed to fetch coach details");
        }
        const data2 = await response2.json();
        setCoach(data2);

        const response3 = await fetch(`${URL}/getAllSepcialistsAdmin`);

        if (!response3.ok) {
          throw new Error("Failed to fetch specialist details");
        }
        const data3 = await response3.json();
        setSpecialist(data3);
      } catch (err) {
        console.error("Error fetching trainer details:", err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const countCoach = coach.filter((user) => {
      const [year, month] = user.Dateenter.split("T")[0].split("-");

      return (
        user.AcceptedDescription === "A" &&
        parseInt(year) === currentYear &&
        parseInt(month) === currentMonth
      );
    }).length;
    setLengthCoach(countCoach);

    const countSpecialist = specialist.filter((user) => {
      const [year, month] = user.Dateenter.split("T")[0].split("-");

      return (
        user.AcceptedDescription === "A" &&
        parseInt(year) === currentYear &&
        parseInt(month) === currentMonth
      );
    }).length;
    setLengthSpecialist(countSpecialist);

    const countTrainees = trainees.filter((user) => {
      const [year, month] = user.Dateenter.split("T")[0].split("-");
      return parseInt(year) === currentYear && parseInt(month) === currentMonth;
    }).length;
    setLengthTrainees(countTrainees);
    const acceptedCoaches = coach.filter(
      (user) => user.AcceptedDescription === "A"
    ).length;
    const acceptedSpecialists = specialist.filter(
      (user) => user.AcceptedDescription === "A"
    ).length;

    setTotalUsers(acceptedCoaches + acceptedSpecialists + trainees.length);

    const watchedVideos = trainees.reduce(
      (sum, user) => sum + user.WatchedVideos,
      0
    );
    setTotalWatchedVideos(watchedVideos);

    let maxCoachPoints = 0;
    let topCoach = null;
    coach.forEach((user) => {
      if (user.Points > maxCoachPoints && user.AcceptedDescription === "A") {
        maxCoachPoints = user.Points;
        topCoach = user.ID_Coach;
      }
    });
    setMaxPointCoach(topCoach);
    setValueMaxPointCoach(maxCoachPoints);

    let maxSpecialistPoints = 0;
    let topSpecialist = null;
    specialist.forEach((user) => {
      if (
        user.Points > maxSpecialistPoints &&
        user.AcceptedDescription === "A"
      ) {
        maxSpecialistPoints = user.Points;
        topSpecialist = user.ID_Specialist;
      }
    });
    setMaxPointSpecialist(topSpecialist);
    setValueMaxPointSpecialist(maxSpecialistPoints);
  }, [currentMonth, currentYear, coach, trainees, specialist]);

  return (
    <div className="Userstatistics">
      <div className="row">
        <div className="card">
          <div className="title-sata">
            <p className="label-sata">Total Trainees This Month</p>
            <div className="icondiv" style={{ backgroundColor: "#94E075" }}>
              <IoBarbell size={16} color="#fff" />
            </div>
          </div>
          <div className="valueV">{lengthTrainees}</div>
        </div>
        <div className="card">
          <div className="title-sata">
            <p className="labe-sata">Total Coaches This Month</p>
            <div className="icondiv" style={{ backgroundColor: "#E19083" }}>
              <IoPersonAdd size={16} color="#fff" />
            </div>
          </div>
          <div className="valueV">{lengthCoach}</div>
        </div>
        <div className="card">
          <div className="title-sata">
            <p className="label-sata">Total Nutrations This Month</p>
            <div className="icondiv" style={{ backgroundColor: "#E0DB87" }}>
              <IoPersonAdd size={16} color="#fff" />
            </div>
          </div>
          <div className="valueV">{lengthSpecialist}</div>
        </div>
        <div className="card">
          <div className="title-sata">
            <p className="label-sata">Total Users</p>
            <div className="icondiv" style={{ backgroundColor: "#8FBEE0" }}>
              <IoPeople size={16} color="#fff" />
            </div>
          </div>
          <div className="valueV">{totalUsers}</div>
        </div>
      </div>
      <div className="row">
        <div className="card">
          <div className="title-sata">
            <p className="label-sata">Active Users</p>
            <div className="icondiv" style={{ backgroundColor: "#44FC83" }}>
              <IoCheckmarkDoneOutline size={16} color="#fff" />
            </div>
          </div>
          <div className="value-value">{totalWatchedVideos}</div>
        </div>
        <div className="card">
          <div className="title-sata">
            <p className="label-sata">Best Coach</p>
            <div className="icondiv" style={{ backgroundColor: "#FF6209" }}>
              <IoMedal size={16} color="#fff" />
            </div>
          </div>
          <div className="valueV">
            {coach.find((user) => user.ID_Coach === maxPointCoach)?.Username ||
              "Not found"}
          </div>
          <div>
            <p>With Total Points: {valueMaxPointCoach}</p>
          </div>
        </div>
        <div className="card">
          <div className="title-sata">
            <p className="label-sata">Best Nutration Expert</p>
            <div className="icondiv" style={{ backgroundColor: "#FC4488" }}>
              <IoMedal size={16} color="#fff" />
            </div>
          </div>
          <div className="valueV">
            {specialist.find(
              (user) => user.ID_Specialist === maxPointSpecialist
            )?.Username || "Not found"}
          </div>
          <div>
            <p>With Total Points: {valueMaxPointSpecialist}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userstatistics;
