// src/components/Header.js
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomAppBar = styled(AppBar)({
    backgroundColor: "white",
    color: "black",
    boxShadow: "none",
    borderBottom: "1px solid #e0e0e0",
    width: "100vw",
    left: "50%",
    transform: "translateX(-50%)",
});

const NavLinks = styled("div")({
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    alignItems: "center",
});

const NavLink = styled(Link)({
    textDecoration: "none",
    marginLeft: "16px",
    marginRight: "16px",
});

const AuthButtons = styled("div")({
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
});

function Header() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    return (
        <CustomAppBar>
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography variant="h6">
                        <Link to="/" style={{ textDecoration: "none" }}>
                            YummyHub
                        </Link>
                    </Typography>
                    <NavLinks>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                        {token && <NavLink to="/profile">Dashboard</NavLink>}
                    </NavLinks>
                    <AuthButtons>
                        {!token ? (
                            <>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/login"
                                >
                                    Login
                                </Button>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/register"
                                >
                                    Register
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    navigate("/");
                                }}
                            >
                                Logout
                            </Button>
                        )}
                    </AuthButtons>
                </Toolbar>
            </Container>
        </CustomAppBar>
    );
}

export default Header;
