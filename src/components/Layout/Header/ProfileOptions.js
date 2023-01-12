import React, { useState } from 'react';
import icons from '../../../assets/icons.svg';
import ProfileImg from '../../../assets/profile.svg';
import classes from './ProfileOptions.module.scss';

const ProfileOptions = () => {


  return (
    <ul className={classes.profile_options}>
      <li className={classes.option}>
        <button className={classes.option__btn}>
          <svg>
            <use href={`${icons}#icon-cog`}></use>
          </svg>
          <span> Settings </span>
        </button>
      
      </li>
      <li className={classes.profile_label}>
        <img src={ProfileImg} alt="Profile" />
        <span>Guest</span>
      </li>
    </ul>
  );
};

export default React.memo(ProfileOptions);
