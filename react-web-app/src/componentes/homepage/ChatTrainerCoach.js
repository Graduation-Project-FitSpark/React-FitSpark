import React, { useState, useEffect } from "react";
import { sendMessage, useMessages } from "../../firebase";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import URL from "../../enum/enum";
import Navbarhomepage from "./Navbarhomepage";
function ChatTrainerCoach() {
  const { state } = useLocation();
  const [input, setInput] = useState("");
  const [trainerId, setTrainerId] = useState(null);
  const [coachId, setCoachId] = useState(null);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const insertNotification = async () => {
    const username = localStorage.getItem("username");
    const currentDate = new Date().toISOString().split("T")[0];

    try {
      const notificationData = {
        Description: "Check Out Your Messages!",
        Date: currentDate,
        Msg_To: username,
      };

      const response = await axios.post(
        `${URL}/insertNotification`,
        notificationData
      );

      console.log(response.data.message);
      return response.data.message;
    } catch (error) {
      console.error("Error inserting notification:", error);
      return "Failed to insert notification";
    }
  };
  useEffect(() => {
    insertNotification();
    const getIds = async () => {
      try {
        const trainer = localStorage.getItem("ID");
        if (trainer !== null) {
          setTrainerId(trainer);
        }

        const response = await fetch(`${URL}/getTrainerSignedCoach`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ID_Trainer: trainer }),
        });

        if (response.ok) {
          const data = await response.json();
          const { ID_Coach, Name, ImageUrl } = data;
          setCoachId(ID_Coach);
          setName(Name);
          setImg(ImageUrl);
        }
      } catch (e) {
        console.error("Failed to fetch IDs from AsyncStorage", e);
      }
    };

    getIds();
  }, []);

  const { messages } = useMessages(trainerId, coachId);
  console.log("messages");
  console.log(messages);

  const sortedMessages = Array.isArray(messages)
    ? messages.sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis())
    : [];

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    if (coachId) {
      sendMessage(input, trainerId, coachId);
      setInput("");
    }
  };

  return (
    <div>
      <Navbarhomepage />
      <div style={styles.background}>
        <div style={styles.container}>
          <div style={styles.header}>
            <img src={img} alt="trainer" style={styles.trainerImage} />
            <div style={styles.trainerInfo}>
              <h2 style={styles.trainerName}>{name}</h2>
            </div>
          </div>
          <div style={styles.chatArea}>
            {sortedMessages.map((item, index) => {
              const isLastMessage =
                index === sortedMessages.length - 1 ||
                sortedMessages[index + 1]?.senderId !== item.senderId;

              return (
                <div style={styles.messageRow} key={item.id}>
                  {item.senderId == coachId && (
                    <div style={styles.leftImageContainer}>
                      {isLastMessage && (
                        <img
                          src={img}
                          alt="profile"
                          style={styles.profileImage}
                        />
                      )}
                    </div>
                  )}
                  <div
                    style={{
                      ...styles.messageBubble,
                      ...(item.senderId === coachId
                        ? styles.coachBubble
                        : styles.traineeBubble),
                    }}
                  >
                    <p style={styles.messageText}>{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={styles.inputArea}>
            <input
              type="text"
              style={styles.input}
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button style={styles.sendButton} onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  background: {
    backgroundImage: "url('../../assets/bg.jpg')",
    backgroundSize: "cover",
    height: "100vh",
    padding: "0",
    margin: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    paddingTop: "150px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    padding: "10px 0",
    borderBottom: "1px solid #ddd",
  },
  backButton: {
    fontSize: "18px",
    marginRight: "15px",
    cursor: "pointer",
    background: "transparent",
    border: "none",
    color: "#333",
  },
  trainerImage: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    marginRight: "15px",
  },
  trainerInfo: {
    flex: 1,
  },
  trainerName: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  chatArea: {
    flexGrow: 1,
    overflowY: "auto",
    padding: "10px",
    marginBottom: "10px",
    borderBottom: "1px solid #ddd",
  },
  messageRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: "10px",
  },
  leftImageContainer: {
    width: 50,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  profileImage: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    marginRight: 10,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: "10px",
    borderRadius: "15px",
    margin: "5px 0",
    wordWrap: "break-word",
  },
  traineeBubble: {
    backgroundColor: "#e0e0e0",
    alignSelf: "flex-end",
    marginLeft: "auto",
    color: "#333",
  },
  coachBubble: {
    backgroundColor: "#009688",
    color: "white",
    alignSelf: "flex-start",
  },
  messageText: {
    margin: 0,
  },
  inputArea: {
    display: "flex",
    alignItems: "center",
    padding: "10px 0",
    borderTop: "1px solid #ddd",
  },
  input: {
    flex: 1,
    padding: "12px",
    fontSize: "16px",
    borderRadius: "25px",
    border: "1px solid #ccc",
    marginRight: "10px",
    backgroundColor: "#f1f1f1",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  },
  sendButton: {
    padding: "12px 18px",
    backgroundColor: "#009688",
    border: "none",
    borderRadius: "25px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
    fontSize: "16px",
  },
  sendButtonHover: {
    backgroundColor: "#e0e0e0",
  },

  chatAreaScrollbar: {
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#0fe842",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f1f1",
    },
  },
};

export default ChatTrainerCoach;
