import Tasks from "../components/Tasks/Tasks";
import Categories from "../components/Tasks/Categories";

const TasksPage = () => {
  return (
    <div className="main-grid">
      <Tasks />
      <Categories />
    </div>
  );
};

export default TasksPage;
