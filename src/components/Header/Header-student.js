import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.gif";
import makeService from "../../services/user";
import { useNavigate } from "react-router-dom";
import "./header.css";
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
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  Alert,
  Avatar,
  Tooltip,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  Divider,
  List,
} from "@mui/material";

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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = ({
  onNotifyClick,
  onSearch,
  onDelete,
  allDiseases,
  profile,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [drawerState, setDrawerState] = useState({
    left: false,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const drawerList = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 1500); // 2 seconds
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (value.length > 0) {
      const filteredSuggestions = allDiseases.filter((disease) =>
        disease.label.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      if (filteredSuggestions.length === 0)
        setErrorMessage("Không thể tìm thấy bệnh này");
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.label);
    setSuggestions([]);
    onSearch(suggestion); // Gửi tên bệnh tới component cha
  };

  const onDeleteClick = () => {
    setSuggestions("");
    setSearchQuery("");
    onDelete();
  };

  const PopupBox = styled(Box)(({ theme }) => ({
    position: "fixed",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    paddingTop: theme.spacing(2),
    zIndex: 1000, // đảm bảo nó nằm trên các thành phần khác
    width: 275,
  }));

  const SuggestionItem = styled(Typography)(({ theme }) => ({
    cursor: "pointer",
    transition: "background-color 0.3s ease, color 0.3s ease",
    "&:hover": {
      backgroundColor: theme.palette.action.selected,
      color: theme.palette.primary.light,
    },
  }));

  const [popupPosition] = useState({ top: 59, left: 118 });

  async function onProfileClick() {
    const res = await makeService.get_current_user();
    handleCloseUserMenu();
    profile(res);
  }

  const navigator = useNavigate();
  async function onLogout() {
    const res = await makeService.logout();
    if (res.success) {
      navigator("/login");
    }
  }

  return (
    <header className="header">
      {/* <div className="header-1">
        <div className="flex">
          <img className="logo" src={logo} alt="Logo" />
          <div className="header-text">HỆ THỐNG NHẬN DIỆN HÌNH ẢNH Y KHOA</div>
          <button className="button-40" onClick={onLogout}>
            Đăng xuất
          </button>
        </div>
      </div> */}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton> */}
            <img className="logo" src={logo} alt="Logo" />
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={handleSearchChange}
                // onKeyDown={handleSearchKeyDown}
              />
              <IconButton color="inherit" onClick={onDeleteClick}>
                <DeleteIcon />
              </IconButton>
            </Search>
            {/* <Box sx={{ flexGrow: 1 }} /> */}
            <div className="header-text">
              HỆ THỐNG NHẬN DIỆN HÌNH ẢNH Y KHOA
            </div>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={onNotifyClick}
                id="icon-notify"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Box>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={onProfileClick}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center">Account</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              <MenuItem onClick={onLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
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
        <SwipeableDrawer
          anchor="left"
          open={drawerState.left}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {drawerList("left")}
        </SwipeableDrawer>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {suggestions.length > 0 && (
          <PopupBox
            style={{ top: popupPosition.top, left: popupPosition.left }}
          >
            <ul>
              {suggestions.map((suggestion) => (
                <SuggestionItem>
                  <Typography
                    paragraph
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.label}
                  </Typography>
                </SuggestionItem>
              ))}
            </ul>
          </PopupBox>
        )}
      </Box>
    </header>
  );
};

export default Header;
