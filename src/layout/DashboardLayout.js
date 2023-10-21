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
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../localization/changeLanguage";
import i18n from "../localization/i18n";

const drawerWidth = 300;

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const isHDOrBelow = window.innerWidth < 1920;
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [languageAnchor, setLanguageAnchor] = useState();

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
  };

  const anchorRef = useRef();
  const isRtl = i18n.language === "ar";

  return (
    <Grid container>
      <Grid item>
        {isHDOrBelow ? null : (
          <Drawer
            variant="permanent"
            style={{
              width: drawerWidth,
            }}
            // anchor={isRtl ? "right" : "left"}
          >
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
                <ListItemText primary={t("books")} />
              </ListItemButton>
            </List>
          </Drawer>
        )}
      </Grid>
      <Grid item xs>
        <div style={{ flex: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <h2>{t("dashboard")}</h2>
              <div
                style={{
                  marginRight: isRtl ? "auto" : "initial",
                  marginLeft: isRtl ? "initial" : "auto",
                  zIndex: "999999",
                }}
              >
                <Button
                  ref={languageAnchor}
                  onClick={(event) => setLanguageAnchor(event.currentTarget)}
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: "10px",
                  }}
                >
                  {t("language")}
                </Button>
                <Popover
                  open={Boolean(languageAnchor)}
                  onClose={() => setLanguageAnchor(null)}
                  anchorEl={languageAnchor}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <ListItemButton
                    onClick={() => {
                      changeLanguage("en");
                      setLanguageAnchor(null);
                    }}
                  >
                    <ListItemText>{t("english")}</ListItemText>
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => {
                      changeLanguage("ar");
                      setLanguageAnchor(null);
                    }}
                  >
                    <ListItemText>{t("arabic")}</ListItemText>
                  </ListItemButton>
                </Popover>
                <Button
                  ref={anchorRef}
                  onClick={toggleUserDropdown}
                  style={{ fontWeight: "bold", color: "white" }}
                >
                  {user?.name}
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
                    {t("logout")}
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
