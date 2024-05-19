import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Register from "./Register";
import Selfie from "./Selfie";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showSelfie, setShowSelfie] = useState(false);
  const [response, setResponse] = useState("");

  // form stuff to check if azure works
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/pictures/",
        { name, email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  const handleStuff = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("name", nameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("phone", phoneRef.current.value);

    const response = await fetch("http://localhost:8000/register_img", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("Failed to send data");
    }
  };

  const handleEmail = async () => {
    const response = await fetch("http://localhost:8000/send_email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    });
    if (!response.ok) {
      console.error("Failed to send email");
    } else {
      console.log("Email sent successfully");
    }
  };

  return (
    <div className="app-container">
      <div>
        <button
          onClick={() => setShowRegister((prev) => !prev)}
          className="button"
        >
          Register
        </button>
        <button
          onClick={() => setShowSelfie((prev) => !prev)}
          className="button"
        >
          Selfie
        </button>
        <button onClick={() => handleEmail()} className="button">
          Send email
        </button>
        <button onClick={handleStuff} className="button">
          Clcik
        </button>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-postgres"
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-postgres"
            />
            <button type="submit" className="button submit-button">
              send to azure
            </button>
          </div>
          
        </form>
      </div>
      {showRegister && <Register />}
      {showSelfie && <Selfie />}
      {response && <p>{response}</p>}
    </div>
  );
}

export default App;
