import React, { useState, useEffect } from "react";
import { sendMessage, useMessages } from "../../firebase";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import URL from "../../enum/enum";
function ChatTrainerSpecialist() {
  const { state } = useLocation();
  const [input, setInput] = useState("");
  const [trainerId, setTrainerId] = useState(null);
  const [coachId, setCoachId] = useState(null);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getIds = async () => {
      try {
        const trainer = localStorage.getItem("ID");
        if (trainer !== null) {
          setTrainerId(trainer);
        }

        const response = await fetch(`${URL}/getTrainerSignedSpecialist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ID_Trainer: trainer }),
        });

        if (response.ok) {
          const data = await response.json();
          const { ID_Specialist, Name, ImageUrl } = data;
          setCoachId(ID_Specialist);
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
    <div style={styles.background}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => navigate(-1)} style={styles.backButton}>
            &lt; Back
          </button>
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
  );
}

const styles = {
  background: {
    backgroundImage: "url('../../assets/bg.jpg')",
    backgroundSize: "cover",
    minHeight: "100vh",
    padding: "20px",
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8)",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
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
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "15px",
  },
  trainerInfo: {
    flex: 1,
  },
  trainerName: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333",
    width: 50,
  },
  chatArea: {
    maxHeight: "400px",
    overflowY: "scroll",
    marginBottom: "20px",
    flexGrow: 1,
    scrollbarWidth: "thin",
  },
  messageRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
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
    maxWidth: "60%",
    padding: "10px",
    borderRadius: "12px",
    margin: "5px 0",
  },
  traineeBubble: {
    backgroundColor: "#e0e0e0",
    alignSelf: "flex-end",
    marginLeft: "auto",
    marginRight: 10,
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
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    padding: "12px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "10px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  },
  sendButton: {
    padding: "12px 18px",
    backgroundColor: "#009688",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
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

export default ChatTrainerSpecialist;
