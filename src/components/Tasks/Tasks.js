import Task from './Task';
import classes from './Tasks.module.scss';
import icons from '../../assets/icons.svg';
import Card from '../UI/Card';
import NewTaskForm from './NewTaskForm';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Fragment, useRef, useState } from 'react';
import { tasksActions } from '../../store/tasks';
import ConfirmAction from '../UserFeedBack/ConfirmAction';

const Tasks = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const isEditing = useSelector(state => state.tasks.isEditing);
  const [infoCardIsShown, setInfoCardIsShown] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStartHandler = (event, index) => {
    //We use index to identify the position of dragged in list
    dragItem.current = index;
    event.target.closest('li').style.opacity = 0.5;
  };
  const dragEnterHandler = (event, index) => {
    event.preventDefault();
    dragOverItem.current = index;
  };
  const dropHandler = event => {
    event.target.closest('li').style.opacity = 1;
    const draggedAndDraggedOverIndexes = {
      dragItemIndex: dragItem.current,
      dragOverIndex: dragOverItem.current,
    };
    dispatch(tasksActions.replaceListOnDrop(draggedAndDraggedOverIndexes));
  };

  const toggleInfoCardHandler = () => {
    setInfoCardIsShown(prevState => !prevState);
  };
  const cancelDeletionHandler = () => {
    setIsConfirming(false);
  };
  const deleteCompletedHandler = () => {
    setIsConfirming(true);
  };
  const confirmDeletionHandler = () => {
    dispatch(tasksActions.deleteAllCompleted());
  };

  const queryParams = new URLSearchParams(location.search);
  const sortCriteria = queryParams.get('sort');

  let computedTasks = tasks;
  let tasksList;
  if (sortCriteria) {
    if (sortCriteria === 'Show All') {
      computedTasks = tasks;
    } else if (sortCriteria === 'Completed') {
      computedTasks = tasks.filter(task => task.completed);
    } else {
      computedTasks = tasks.filter(task => task.category === sortCriteria);
    }
    tasksList = computedTasks.map(task => (
      <Task
        key={task.id}
        id={task.id}
        completed={task.completed}
        category={task.category}
        draggable={false}
        dateCompleted={task.dateCompleted}
      >
        {task.text}
      </Task>
    ));
  } else {
    computedTasks = tasks.filter(task => !task.completed);
    if (isEditing) {
      tasksList = computedTasks.map((task, index) => (
        <Task
          key={task.id}
          id={task.id}
          completed={task.completed}
          category={task.category}
          dateCompleted={task.dateCompleted}
          draggable
          onDragStart={e => dragStartHandler(e, index)}
          onDragEnter={e => dragEnterHandler(e, index)}
          onDragEnd={dropHandler}
        >
          {task.text}
        </Task>
      ));
    } else
      tasksList = computedTasks.map(task => (
        <Task
          key={task.id}
          id={task.id}
          completed={task.completed}
          dateCompleted={task.dateCompleted}
          category={task.category}
          draggable={false}
        >
          {task.text}
        </Task>
      ));
  }

  return (
    <Card className={classes.tasks}>
      <h2>
        {!sortCriteria
          ? 'Active Tasks'
          : sortCriteria === 'Show All'
          ? 'All tasks'
          : sortCriteria}
      </h2>
      {sortCriteria === 'Completed' && tasksList.length !== 0 && (
        <Fragment>
          <button
            onClick={deleteCompletedHandler}
            className={`btn-link ${classes['tasks__btn--delete']}`}
          >
            <span className={classes['tasks__btn-text--regular']}>
              Delete all
            </span>
            <span className={classes['tasks__btn-text--small']}>
              <svg>
                <use href={`${icons}#icon-bin`}></use>
              </svg>
            </span>
          </button>
          {isConfirming && (
            <ConfirmAction
              onClose={cancelDeletionHandler}
              onConfirm={confirmDeletionHandler}
            >
              All the completed tasks will be deleted
            </ConfirmAction>
          )}
        </Fragment>
      )}
      {sortCriteria && (
        <Link to="/tasks" className={`btn-link ${classes.tasks__btn}`}>
          <span className={classes['tasks__btn-text--regular']}>
            Back to active
          </span>
          <span className={classes['tasks__btn-text--small']}>To Active</span>
        </Link>
      )}
      {!sortCriteria && (
        <Fragment>
          {isEditing && !sortCriteria && (
            <button
              onClick={toggleInfoCardHandler}
              className={`${classes.info} ${classes.tasks__btn}`}
            >
              i
            </button>
          )}
          {infoCardIsShown && (
            <div className={classes.info__message}>
              <p>Drag and drop tasks to arrange by priority</p>
            </div>
          )}
        </Fragment>
      )}
      <ul>{tasksList.length === 0 ? <p>No tasks found</p> : tasksList}</ul>
      <NewTaskForm />
    </Card>
  );
};

export default Tasks;
