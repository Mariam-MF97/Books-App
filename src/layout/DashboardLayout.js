import React, { useRef, useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Popover,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import acoreLogo from "../assets/images/acore-logo.png";
import { useAuth } from "../context/AuthContext";
import { MenuBook } from "@mui/icons-material";

const drawerWidth = 300;

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const isHDOrBelow = window.innerWidth < 1920;
  const { user, logout } = useAuth();

  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
  };

  const anchorRef = useRef(null);

  return (
    <Grid container>
      <Grid item>
        {isHDOrBelow ? null : (
          <Drawer variant="permanent" style={{ width: drawerWidth }}>
            <Box textAlign="center" p={2}>
              <img src={acoreLogo} alt="logo" style={{ width: "70px" }} />
            </Box>
            <Divider />

            <List style={{ width: drawerWidth }}>
              <ListItemButton
                onClick={() => {
                  navigate("/books-list");
                }}
              >
                <ListItemIcon>
                  <MenuBook />
                </ListItemIcon>
                <ListItemText primary="Books" />
              </ListItemButton>
            </List>
          </Drawer>
        )}
      </Grid>
      <Grid item xs>
        <div style={{ flex: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <h2>Acore Admin Dashboard</h2>
              <div style={{ marginLeft: "auto", zIndex: "999999" }}>
                <Button
                  ref={anchorRef}
                  onClick={toggleUserDropdown}
                  style={{ fontWeight: "bold", color: "white" }}
                >
                  User: {user?.name}
                </Button>
                <Popover
                  open={isUserDropdownOpen}
                  onClose={toggleUserDropdown}
                  anchorEl={anchorRef.current}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Typography
                    style={{ padding: "16px", cursor: "pointer" }}
                    onClick={logout}
                  >
                    Logout
                  </Typography>
                </Popover>
              </div>
            </Toolbar>
          </AppBar>
          <div style={{ padding: "20px" }}>{children}</div>
        </div>
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;
