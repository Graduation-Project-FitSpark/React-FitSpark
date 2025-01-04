import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CoachVideos.css";
import URL from "../../../enum/enum";
import Navbaradmin from "./Navbaradmin";
const CoachVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCoachVideos = async () => {
    try {
      const response = await axios.get(`${URL}/getCoachVideos`);
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching coach videos:", error);
      alert("Failed to fetch coach videos.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCoachVideo = async (trainName, fileName) => {
    try {
      const response = await axios.post(
        `${URL}/deleteCoachVideo`,
        {
          Train_Name: trainName,
          File_Name: fileName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Video deleted successfully!");
        fetchCoachVideos();
      } else {
        alert("Failed to delete video.");
      }
    } catch (error) {
      console.error("Error deleting coach video:", error);
      alert("Failed to delete video.");
    }
  };

  useEffect(() => {
    fetchCoachVideos();
  }, []);

  return (
    <div>
      <Navbaradmin />
      <div className="containerDADA">
        {loading ? (
          <p className="loading-textDADA">Loading trains and videos...</p>
        ) : (
          videos.map((item) => (
            <div key={item.Train_Name} className="train-cardDADA">
              <div className="train-headerDADA">
                <h3 className="train-nameDADA">{item.Train_Name}</h3>
              </div>
              <div className="video-gridDADA">
                {item.Videos.map((video) => (
                  <div key={video.File_Name} className="video-itemDADA">
                    {video.Coach_Image && (
                      <img
                        src={video.Coach_Image}
                        alt="Coach"
                        className="coach-imageDADA"
                      />
                    )}
                    <p className="usernameDADA">{video.Username}</p>
                    <div className="video-wrapperDADA">
                      <video
                        controls
                        src={video.Video_URL}
                        className="videoDADA"
                      />
                    </div>
                    <p className="file-nameDADA">{video.File_Name}</p>
                    <button
                      className="delete-buttonDADA"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete the video: ${video.File_Name}?`
                          )
                        ) {
                          deleteCoachVideo(item.Train_Name, video.File_Name);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CoachVideos;
