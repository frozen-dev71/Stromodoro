import classes from './Sidebar.module.scss';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  return (
    <nav className={classes.sidebar}>
      <ul className={classes.sidebar__list}>
        <SidebarItem label="Dashboard" route="/dashboard" icon="#icon-home" />
        <SidebarItem
          label="Pomodoro"
          route="/pomodoro"
          icon="#icon-stopwatch"
        />
        <SidebarItem label="Tasks" route="/tasks" icon="#icon-list-alt" />

        <SidebarItem
          label="Statistics"
          route="/statistics"
          icon="#icon-bar-graph"
        />
      </ul>
    </nav>
  );
};

export default Sidebar;
