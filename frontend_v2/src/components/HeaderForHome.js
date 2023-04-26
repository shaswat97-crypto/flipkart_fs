import { CartStore } from "./CartContext";
import * as React from "react";
import { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import logo from "../media/logo.PNG";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductCard from "./Card";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import DiamondIcon from "@mui/icons-material/Diamond";
import SpeakerIcon from "@mui/icons-material/Speaker";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header({ data }) {
  const util = useContext(CartStore);
  console.log(util.rows);
  const navTo = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  // const [text, setText] = React.useState('');
  const handleSearch = (e) => {
    const inp = e.target.value;
    util.setText(inp);
    let obj = data.filter((d) => {
      return d.title.toLowerCase().includes(inp.toLowerCase());
    });
    // console.log(obj);
    let home = (
      <div className="productCont">
        {obj.length > 0 ? (
          obj.map((d) => (
            <ProductCard key={d.id} d={d} />
          ))
        ) : (
          <h1>No product found</h1>
        )}
      </div>
    );
    util.setHomeCont(home);
  };
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleLogout = () => {
    localStorage.removeItem("flipkartToken");
    navTo("/login");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>
        {localStorage.getItem("flipkartToken") ? "Logout" : "Login/SignUp"}
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>

      <MenuItem
        onClick={() => {
          navTo("/cart");
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ShoppingCartIcon />
        </IconButton>
        <p>Cart</p>
      </MenuItem>

      <MenuItem
        onClick={() => {
          navTo("/men");
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ManIcon />
        </IconButton>
        <p>Men</p>
      </MenuItem>

      <MenuItem
        onClick={() => {
          navTo("/women");
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <WomanIcon />
        </IconButton>
        <p>Women</p>
      </MenuItem>

      <MenuItem
        onClick={() => {
          navTo("/electronics");
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <SpeakerIcon />
        </IconButton>
        <p>Electronics</p>
      </MenuItem>

      <MenuItem
        onClick={() => {
          navTo("/jewelery");
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <DiamondIcon />
        </IconButton>
        <p>jewelery</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <AppBar position="fixed" sx={{ pl: 2, pr: 2 }}>
        <Toolbar>
          <img
            style={{ width: "100px", cursor: "pointer" }}
            src={logo}
            alt="logo"
            onClick={() => {
              navTo("/");
            }}
          />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "30px" }}>
            <Link to="/men">
              <Button color="inherit" sx={{ color: "white" }}>
                Men
              </Button>
            </Link>
            <Link to="/women">
              <Button sx={{ color: "white" }} color="inherit">
                Women
              </Button>
            </Link>
            <Link to="/electronics">
              <Button sx={{ color: "white" }} color="inherit">
                Electronics
              </Button>
            </Link>
            <Link to="/jewelery">
              <Button sx={{ color: "white" }} color="inherit">
                Jewelery
              </Button>
            </Link>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => {
                navTo("/cart");
              }}
            >
              <Badge badgeContent={util.rows.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
