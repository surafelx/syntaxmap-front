import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: orangered;
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
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
  
  &.active, &:hover {
    color: black;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
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
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavDropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: orangered;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`;

export const NavMenuDropDown = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  position: relative;
  
  &.active, &:hover {
    color: black;
  }
  
  &:hover ${NavDropDownContent} {
    display: block;
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
  color: #fff;
  outline: none;
  border: 1px solid #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  font-weight: bold;
  
  &:hover {
    background: #fff;
    color: orangered;
  }
`;