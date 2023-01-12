import { NavLink } from 'react-router-dom';
import LogoImg from '../../../assets/logo.png';
import classes from './Logo.module.scss';
import React from 'react';

const Logo = () => {
  return (
    <NavLink to="/dashboard">
      <figure className={classes.logo}>
        <img src={LogoImg} alt="Logo" />
        <figcaption>Stromodoro</figcaption>
      </figure>
    </NavLink>
  );
};
export default React.memo(Logo);
