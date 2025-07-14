import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/login', values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/');
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ background: 'linear-gradient(135deg, #845EC2 0%, #D65DB1 100%)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <div className="card shadow-lg border-0 rounded-lg overflow-hidden" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div className="avatar-circle mx-auto mb-4">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png" 
                      alt="User Icon" 
                      className="user-icon"
                    />
                  </div>
                  <h2 className="fw-bold text-accent">Welcome Back</h2>
                  <p className="text-muted">Sign in to continue to your account</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-dark mb-2">
                      <i className="fas fa-envelope me-2 text-accent"></i>
                      <strong>Email</strong>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      onChange={e => setValues({...values, email: e.target.value})}
                      className="form-control form-control-lg input-field"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label text-dark mb-2">
                      <i className="fas fa-lock me-2 text-accent"></i>
                      <strong>Password</strong>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      onChange={e => setValues({...values, password: e.target.value})}
                      className="form-control form-control-lg input-field"
                      required
                    />
                  </div>

                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input accent-checkbox" id="remember" />
                    <label className="form-check-label text-secondary" htmlFor="remember">
                      Remember me
                    </label>
                    <Link className="float-end text-accent text-decoration-none" to="#">
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="d-grid gap-3 mt-4">
                    <button type="submit" className="btn btn-accent btn-lg py-3 fw-bold shadow-sm transition-all">
                      <i className="fas fa-sign-in-alt me-2"></i> Login
                    </button>

                    <Link to="/register" className="btn btn-outline-accent btn-lg py-3 fw-bold shadow-sm transition-all">
                      <i className="fas fa-user-plus me-2"></i> Create Account
                    </Link>
                  </div>
                </form>
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
        .btn-outline-accent {
          background-color: transparent;
          border-color: #9B5DE5;
          color: #9B5DE5;
        }
        .btn-outline-accent:hover {
          background-color: #9B5DE5;
          color: white;
        }
        .transition-all {
          transition: all 0.3s ease;
        }
        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2) !important;
        }
        .input-field {
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          padding: 12px 15px;
          transition: all 0.3s ease;
        }
        .input-field:focus {
          border-color: #9B5DE5;
          box-shadow: 0 0 0 0.25rem rgba(155, 93, 229, 0.25);
        }
        .accent-checkbox:checked {
          background-color: #9B5DE5;
          border-color: #9B5DE5;
        }
      `}</style>
    </div>
  );
}

export default Login;
