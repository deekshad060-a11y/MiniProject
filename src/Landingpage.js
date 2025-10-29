import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "Brington@123") {
      navigate("/home");
    } else {
      setError("Please enter the correct password."); // Red error
    }
  };

  const handleCloseClick = () => {
    window.location.href = "https://www.brington.in/";
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#fff',
    }}>
      <div
        onClick={handleCloseClick}
        style={{
          position: 'absolute',
          top: 24,
          right: 36,
          fontSize: '30px',
          color: '#626262',
          cursor: 'pointer',
          fontWeight: 400,
          userSelect: 'none',
        }}
        aria-label="Close"
        role="button"
        tabIndex={0}
        onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleCloseClick(); }}
      >
        &#10005;
      </div>
      <h1 style={{
        fontSize: '2.8rem',
        fontWeight: 500,
        marginBottom: '0.5rem',
        color: '#222',
        letterSpacing: '0.02em',
        textAlign: 'center',
      }}>Guest Area</h1>

      <p style={{
        color: '#212121',
        fontSize: '18px',
        marginBottom: '2.5rem',
        textAlign: 'center',
      }}>
        Please enter the password below.
      </p>

      <form onSubmit={handleSubmit} style={{
        width: '100%',
        maxWidth: '350px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          placeholder="Password"
          style={{
            width: '100%',
            padding: '15px 12px',
            border: error ? '2px solid #ef4444' : '2px solid #e0e0e0',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontSize: '17px',
            textAlign: 'left',
            outline: 'none',
            background: '#fafafa',
          }}
        />
        {error && (
          <div style={{
            color: '#ef4444',
            marginBottom: '1rem',
            fontSize: '15px',
            fontWeight: 450,
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        <button
          type="submit"
          style={{
            backgroundColor: '#10b981',
            color: '#fff',
            padding: '13px 0',
            borderRadius: '6px',
            border: 'none',
            fontWeight: 500,
            fontSize: '18px',
            cursor: 'pointer',
            width: '100%',
            marginTop: '8px',
            maxWidth: '180px',
          }}
          onMouseOver={e => e.target.style.backgroundColor = '#059669'}
          onMouseOut={e => e.target.style.backgroundColor = '#10b981'}
        >
          Go
        </button>
      </form>
    </div>
  );
}
