import classes from './Layout.module.scss';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

const Layout = props => {
  return (
    <div className={classes.container}>
      <Header />
      <Sidebar />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};
export default Layout;
