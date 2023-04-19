import { CartStore } from "./CartContext";
import * as React from 'react';
import {useContext} from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from '../media/logo.PNG'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";

export default function Header() {
  const navTo = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, mb:10 }}>
      <AppBar position="fixed" sx={{pl:2, pr:2}}>
        <Toolbar>
            <img onClick={()=>{navTo('/')}} src={logo} alt="logo" />
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}