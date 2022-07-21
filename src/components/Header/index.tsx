import { Link, NavLink } from "react-router-dom";
import { HeaderContainer } from "./styles";
import Logo from '../../assets/Logo.svg'
import { Scroll, Timer } from "phosphor-react";
export const Header = () => {
  return (
    <HeaderContainer>
      <img src={Logo} />
      <nav>
        <NavLink to={'/'} title='Timer'> <Timer size={24}/> </NavLink>
        <NavLink to={'/history'} title='Hitórico'> <Scroll size={24} /> </NavLink>
      </nav>
    </HeaderContainer>
  );
};
