import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Backdrop, Snackbar } from "@mui/material";
import { AccountCircle, School, Group } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userRelated/userHandle";
import Popup from "../components/Popup";

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(
    (state) => state.user
  );
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate("/Adminlogin");
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate("/Studentlogin");
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate("/Teacherlogin");
      }
    }
  };

  useEffect(() => {
    if (status === "success" || currentUser !== null) {
      if (currentRole === "Admin") {
        navigate("/Admin/dashboard");
      } else if (currentRole === "Student") {
        navigate("/Student/dashboard");
      } else if (currentRole === "Teacher") {
        navigate("/Teacher/dashboard");
      }
    } else if (status === "error") {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <div className="bg-gradient-to-b from-[#0364b0] to-[#98cc3b] h-screen flex justify-center p-8 ">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert}
        color="#0364b0"
        autoHideDuration={2000}
        onClose={() => setAlert(false)}
        message="To be added in future"
        // key={vertical + horizontal}
      />
      <div className="container flex justify-center items-center max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div
            onClick={() => navigateHandler("Admin")}
            className="bg-gray-800 text-white p-6 text-center rounded-2xl cursor-pointer hover:bg-[#0364b0]  duration-300"
          >
            <AccountCircle fontSize="large" />
            <h2 className="my-2 text-xl font-bold">Admin</h2>
            Login as an administrator to access the dashboard to manage app
            data.
          </div>
          <div
            onClick={() => setAlert(true)}
            className="bg-gray-800 text-white p-6 text-center rounded-2xl cursor-pointer hover:bg-[#0364b0] duration-300"
          >
            <School fontSize="large" />
            <h2 className="my-2 text-xl font-bold">Student</h2>
            Login as a student to explore course materials and assignments.
          </div>
          <div
            onClick={() => setAlert(true)}
            className="bg-gray-800 text-white p-6 text-center rounded-2xl cursor-pointer h hover:bg-[#0364b0] duration-300"
          >
            <Group fontSize="large" />
            <h2 className="my-2 text-xl font-bold">Teacher</h2>
            Login as a teacher to create courses, assignments, and track student
            progress.
          </div>
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
};

export default ChooseUser;
