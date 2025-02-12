import React from "react";
import {
  Nav,
  NavLogo,
  NavLink,
  Bars,
  NavMenu,
  NavMenuDropDown,
  NavDropDownContent,
} from "./NavbarElements";
import logo from "../../img/LC-1.jpg";
import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isNotHome = location.pathname !== "/";

  return (
    <div>
      <Nav isNotHome={isNotHome}>
        <NavLogo to="/">
          <img
            src={logo}
            style={{
              height: "auto",
              maxWidth: "100%",
              verticalAlign: "middle",
            }}
          />
        </NavLogo>
        <Bars />

        <NavMenu>
          <NavLink isNotHome={isNotHome} to="/">
            Home
          </NavLink>
          <NavLink isNotHome={isNotHome} to="/tensemap">
            Tenses Map
          </NavLink>

          {localStorage.getItem("jstoken") && (
            <>
              <NavMenuDropDown isNotHome={isNotHome}>
                Admin
                <NavDropDownContent isNotHome={isNotHome}>
                  <NavLink
                    style={{
                      color: `${!isNotHome ? "white" : "#333"}`,
                    }}
                    isNotHome={isNotHome}
                    to="/addquestion"
                  >
                    Add Question
                  </NavLink>
                  <NavLink
                     style={{
                      color: `${!isNotHome ? "white" : "#333"}`,
                    }}
                    isNotHome={isNotHome}
                    to="/admincourse"
                  >
                    Admin course
                  </NavLink>
                </NavDropDownContent>
              </NavMenuDropDown>
              <NavLink isNotHome={isNotHome} to="/notepad">
                Notepad
              </NavLink>
            </>
          )}

          {!localStorage.getItem("jstoken") && (
            <Link style={{ textDecoration: "none" }} to="/login_register">
              <div
                style={{
                  color: `${!isNotHome ? "white" : "white"}`,
                  backgroundColor: `${!isNotHome ? "#2575fc" : "#2575fc"}`,
                  border: `2px solid ${!isNotHome ? "#2575fc" : "white"}`,
                  padding: "10px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                }}
              >
                Get Started
              </div>
            </Link>
          )}
        </NavMenu>
      </Nav>
    </div>
  );
};

export default Navbar;
