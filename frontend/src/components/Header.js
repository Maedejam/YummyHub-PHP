// src/components/Header.js
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { Container } from "@mui/material";

const CustomAppBar = styled(AppBar)({
    backgroundColor: "white",
    color: "black",
    boxShadow: "none",
    borderBottom: "1px solid #e0e0e0",
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
    return (
        <Container maxWidth="lg">
            <CustomAppBar position="static">
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
                    </NavLinks>
                    <AuthButtons>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                    </AuthButtons>
                </Toolbar>
            </CustomAppBar>
        </Container>
    );
}

export default Header;
