
import { useState } from 'react';
import './App.css';

function App() {

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const handleSendOtp = async () => {

    if (phone.length !== 10) {
      alert("Enter valid Phone Number");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        console.log("Generated OTP:", data.otp);
        alert("Your OTP is: " + data.otp);
        setShowOtp(true);
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
      alert("Server Connection Failed");
    }
  };

  const handleVerifyOtp = async () => {

    try {
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone, otp })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
      alert("Server Connection Failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {!showOtp ? (

        <>
          <input
            type="tel"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button onClick={handleSendOtp}>
            Send OTP
          </button>
        </>

      ) : (

        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button onClick={handleVerifyOtp}>
            Verify OTP
          </button>
        </>

      )}

    </div>
  );
}

export default App;
