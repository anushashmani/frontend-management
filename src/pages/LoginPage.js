import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Backdrop, IconButton, InputAdornment, TextField } from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const LoginPage = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, currentRole } = useSelector(state => state.user);

  const [toggle, setToggle] = useState(false);
  const [guestLoader, setGuestLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rollNumberError, setRollNumberError] = useState(false);
  const [studentNameError, setStudentNameError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (role === "Student") {
      const rollNum = event.target.rollNumber.value;
      const studentName = event.target.studentName.value;
      const password = event.target.password.value;

      if (!rollNum || !studentName || !password) {
        if (!rollNum) setRollNumberError(true);
        if (!studentName) setStudentNameError(true);
        if (!password) setPasswordError(true);
        return;
      }
      const fields = { rollNum, studentName, password };
      setLoader(true);
      dispatch(loginUser(fields, role));
    } else {
      const email = event.target.email.value;
      const password = event.target.password.value;

      if (!email || !password) {
        if (!email) setEmailError(true);
        if (!password) setPasswordError(true);
        return;
      }

      const fields = { email, password };
      setLoader(true);
      dispatch(loginUser(fields, role));
    }
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
    if (name === 'rollNumber') setRollNumberError(false);
    if (name === 'studentName') setStudentNameError(false);
  };

  const guestModeHandler = () => {
    const password = "zxc";

    if (role === "Admin") {
      const email = "yogendra@12";
      const fields = { email, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    } else if (role === "Student") {
      const rollNum = "1";
      const studentName = "Dipesh Awasthi";
      const fields = { rollNum, studentName, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    } else if (role === "Teacher") {
      const email = "tony@12";
      const fields = { email, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      } else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
      setGuestLoader(false);
    }
  }, [status, currentRole, navigate, response, currentUser]);

  return (
      <div className="flex flex-col justify-center items-center h-screen bg-cover">
        <Link to="/" className="text-[#0A73BE]">Back To Home</Link>
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-2xl mt-2">
        <h2 className="text-2xl font-bold text-center text-[#0A73BE] mb-4">{role} Login</h2>
        <p className="text-center mb-6">Welcome back! Please enter your details</p>
        <form noValidate onSubmit={handleSubmit} className="space-y-4">
          {role === "Student" ? (
           <>
           <TextField
             margin="normal"
             required
             fullWidth
             id="rollNumber"
             label="Enter your Roll Number"
             name="rollNumber"
             autoComplete="off"
             type="number"
             autoFocus
             error={rollNumberError}
             helperText={rollNumberError && 'Roll Number is required'}
             onChange={handleInputChange}
           />
           <TextField
             margin="normal"
             required
             fullWidth
             id="studentName"
             label="Enter your name"
             name="studentName"
             autoComplete="name"
             autoFocus
             error={studentNameError}
             helperText={studentNameError && 'Name is required'}
             onChange={handleInputChange}
           />
         </>
          ) : (
            <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Enter your email"
            name="email"
            autoComplete="email"
            autoFocus
            error={emailError}
            helperText={emailError && 'Email is required'}
            onChange={handleInputChange}
          />
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={toggle ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          error={passwordError}
          helperText={passwordError && 'Password is required'}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setToggle(!toggle)}>
                  {toggle ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link to="#" className="text-[#0A73BE]">Forgot password?</Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#0A73BE] text-white rounded mt-3"
          >
            {loader ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </button>
          <button
            type="button"
            onClick={guestModeHandler}
            className="w-full py-2 border border-[#0A73BE] text-[#0A73BE] rounded mt-3"
          >
            Login as Guest
          </button>
          {role === "Admin" && (
            <div className="flex justify-center mt-3">
              <span>Don't have an account?</span>
              <Link to="/Adminregister" className="text-[#0A73BE] ml-2">Sign up</Link>
            </div>
          )}
        </form>
      </div>
      <Backdrop open={guestLoader} className="z-10">
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  );
};

export default LoginPage;
