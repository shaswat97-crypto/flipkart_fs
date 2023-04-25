import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../media/logo.PNG";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navTo = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, mb: 10 }}>
      <AppBar position="fixed" sx={{ pl: 2, pr: 2 }}>
        <Toolbar>
          <img
            style={{ width: "100px", cursor: "pointer" }}
            onClick={() => {
              navTo("/admin");
            }}
            src={logo}
            alt="logo"
          />
          <Box
            onClick={() => navTo("/admin")}
            sx={{
              "&:hover": {
                transform: "scale(1.05)",
                color: "black",
              },
              cursor: "pointer",
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            Admin Console
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
