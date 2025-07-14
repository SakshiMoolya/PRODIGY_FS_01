import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
      .then(res => {
        window.location.reload(true);
      })
      .catch(err => console.log(err));
  };

  // Function to get initials from name
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ background: 'linear-gradient(135deg, #845EC2 0%, #D65DB1 100%)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0 rounded-lg overflow-hidden" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
              <div className="card-body p-5">
                {auth ? (
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="user-avatar mx-auto mb-4">
                        <span className="user-initial">{getInitials(name)}</span>
                      </div>
                      <h2 className="fw-bold text-accent mb-3">Welcome, {name}!</h2>
                      <p className="text-muted mb-4">You've successfully logged in to your account.</p>
                    </div>
                    <button 
                      className="btn btn-danger btn-lg w-100 py-3 fw-bold shadow-sm transition-all"
                      onClick={handleLogout}
                      style={{ borderRadius: '10px' }}
                    >
                      <i className="fas fa-sign-out-alt me-2"></i> Logout
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="avatar-circle mx-auto mb-4">
                        <img 
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png" 
                          alt="User Icon" 
                          className="user-icon"
                        />
                      </div>
                      <h2 className="fw-bold text-accent mb-3">{message || "Welcome Back!"}</h2>
                      <p className="text-muted mb-4">Please log in to access your account</p>
                    </div>
                    <Link 
                      to="/login" 
                      className="btn btn-accent btn-lg w-100 py-3 fw-bold shadow-sm transition-all"
                      style={{ borderRadius: '10px' }}
                    >
                      <i className="fas fa-lock me-2"></i> Login Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .avatar-circle {
          width: 90px;
          height: 90px;
          background: linear-gradient(45deg, #D65DB1, #845EC2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          padding: 0;
        }
        .user-icon {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(1.1);
        }
        .user-avatar {
          width: 100px;
          height: 100px;
          background: linear-gradient(45deg, #D65DB1, #845EC2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          position: relative;
          border: 4px solid white;
        }
        .user-initial {
          color: white;
          font-size: 36px;
          font-weight: bold;
        }
        .text-accent {
          color: #9B5DE5;
        }
        .btn-accent {
          background-color: #9B5DE5;
          border-color: #9B5DE5;
          color: white;
        }
        .btn-accent:hover {
          background-color: #8A4BD5;
          border-color: #8A4BD5;
          color: white;
        }
        .transition-all {
          transition: all 0.3s ease;
        }
        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2) !important;
        }
      `}</style>
    </div>
  );
}

export default Home;
