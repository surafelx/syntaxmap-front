import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: ${({ isNotHome }) => (!isNotHome ? "white" : "#2575fc")};
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  z-index: 12;
  position: relative;
`;

export const NavLogo = styled(Link)`
  cursor: pointer;
  color: #fff;
  font-size: 2rem;
  text-decoration: none;
  font-weight: bold;
  width: 150px;
`;

export const NavLink = styled(Link)`
  cursor: pointer;
  font-weight: bold;
   color: ${({ isNotHome }) => (!isNotHome ? "#333" : "white")};
  text-decoration: none;
  padding: 10px;
  transition: color 0.3s ease-in-out;
  &:hover {
     color: ${({ isNotHome }) => (!isNotHome ? "#2575fc" : "#333 ")};
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #000;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NavDropDownContent = styled.div`
  display: none;
  position: absolute;
  background: ${({ isNotHome }) => (!isNotHome ? "#2575fc" : "white")};
   color: ${({ isNotHome }) => (!isNotHome ? "white" : "#2575fc")};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

   &:hover {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
   color: #333
  }
`;

export const NavMenuDropDown = styled.div`
  display: block;
  align-items: center;
  flex-direction: column;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  position: relative;
  font-weight: bold;
    color: ${({ isNotHome }) => (!isNotHome ? "#333" : "white")};

  &.active,
  &:hover {
     color: ${({ isNotHome }) => (!isNotHome ? "#2575fc" : "#333 ")};
  }

  &:hover ${NavDropDownContent} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    color: #333
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: transparent;
  padding: 10px 22px;
  color: black;
  outline: none;
  border: 1px solid black;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  font-weight: bold;

  &:hover {
    background: black;
    color: orangered;
  }
`;
