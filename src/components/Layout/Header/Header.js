import classes from "./Header.module.scss";

import Logo from "./Logo";
import ProfileOptions from "./ProfileOptions";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <Logo />
      <ProfileOptions />
    </header>
  );
};

export default Header;
