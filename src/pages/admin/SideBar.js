import * as React from "react";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import ReportIcon from "@mui/icons-material/Report";
import AssignmentIcon from "@mui/icons-material/Assignment";

const SideBar = () => {
  const location = useLocation();
  return (
    <>
      <React.Fragment>
        <ListItemButton component={Link} to="/" className="gap-8 !pr-0 ">
          <ListItemIcon className="!min-w-fit">
            <HomeIcon
              color={
                location.pathname === ("/" || "/Admin/dashboard")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/classes" className="gap-8 !pr-0">
          <ListItemIcon className="!min-w-fit">
            <ClassOutlinedIcon
              color={
                location.pathname.startsWith("/Admin/classes")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Batches" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/subjects" className="gap-8 !pr-0">
          <ListItemIcon className="!min-w-fit">
            <AssignmentIcon
              color={
                location.pathname.startsWith("/Admin/subjects")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/teachers" className="gap-8 !pr-0">
          <ListItemIcon className="!min-w-fit">
            <SupervisorAccountOutlinedIcon
              color={
                location.pathname.startsWith("/Admin/teachers")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Teachers" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/students" className="gap-8 !pr-0">
          <ListItemIcon className="!min-w-fit">
            <PersonOutlineIcon
              color={
                location.pathname.startsWith("/Admin/students")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/notices" className="gap-8 !pr-0">
          <ListItemIcon className="!min-w-fit">
            <AnnouncementOutlinedIcon
              color={
                location.pathname.startsWith("/Admin/notices")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Notices" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/complains" className="gap-8 !pr-0">
          <ListItemIcon className="!min-w-fit">
            <ReportIcon
              color={
                location.pathname.startsWith("/Admin/complains")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Complains" />
        </ListItemButton>
      </React.Fragment>
      <Divider sx={{ my: 1 }} />
      <React.Fragment>
        <ListSubheader component="div" inset>
          User
        </ListSubheader>
        <ListItemButton component={Link} to="/Admin/profile">
          <ListItemIcon>
            <AccountCircleOutlinedIcon
              color={
                location.pathname.startsWith("/Admin/profile")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton component={Link} to="/logout">
          <ListItemIcon>
            <ExitToAppIcon
              color={
                location.pathname.startsWith("/logout") ? "primary" : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </React.Fragment>
    </>
  );
};

export default SideBar;
