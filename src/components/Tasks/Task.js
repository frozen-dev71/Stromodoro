import classes from './Task.module.scss';
import icons from '../../assets/icons.svg';
import { taskCategories as categories } from '../../helpers/config';
import { useDispatch, useSelector } from 'react-redux';
import { tasksActions } from '../../store/tasks';
import { useState } from 'react';
import ConfirmAction from '../UserFeedBack/ConfirmAction';
import { activityActions } from '../../store/activity';
import { dateIsToday } from '../../helpers/helpers';

const Task = props => {
  const dispatch = useDispatch();
  const isEditing = useSelector(state => state.tasks.isEditing);
  const [isConfirming, setIsConfirming] = useState(false);
  const tasks = useSelector(state => state.tasks.tasks);

  const CSSclasses = props.dateCompleted
    ? `${classes.task} ${classes['task--done']}`
    : classes.task;

  const checkTaskHandler = () => {
    if (!props.completed) {
      dispatch(tasksActions.markAsCompleted(props.id));
      dispatch(activityActions.updateNumberOfCompletedTasks('add'));
      setTimeout(() => {
        dispatch(tasksActions.removeCompletedFromActive(props.id));
      }, 500);
    } else {
      const dateCompleted = tasks.find(
        task => task.id === props.id
      ).dateCompleted;

      if (dateIsToday(dateCompleted)) {
        dispatch(tasksActions.cancelCompletion(props.id));
        dispatch(activityActions.updateNumberOfCompletedTasks('subtract'));
      }
    }
  };
  const abortDeletionHandler = () => {
    setIsConfirming(false);
  };
  const deleteTaskHandler = () => {
    setIsConfirming(true);
  };

  const confirmDeletionHandler = () => {
    dispatch(tasksActions.deleteTask(props.id));
    setIsConfirming(false);
  };

  const category = categories.find(
    category => category.name === props.category
  );

  return (
    <li
      className={CSSclasses}
      draggable={props.draggable}
      onDragStart={props.onDragStart || null}
      onDragEnter={props.onDragEnter || null}
      onDragEnd={props.onDragEnd || null}
      onDragOver={e => e.preventDefault()}
    >
      <div className={classes.task__icon}>
        <svg>
          <use href={`${icons}${category.icon}`}></use>
        </svg>
      </div>
      <div className={classes.task__details}>
        <span className={classes.task__title}>{props.children}</span>
        <span className={classes.task__category}>{category.name}</span>
      </div>
      {isEditing && (
        <button
          className={classes['task__delete-btn']}
          onClick={deleteTaskHandler}
        >
          <svg>
            <use href={`${icons}#icon-bin`}></use>
          </svg>
        </button>
      )}
      {isConfirming && (
        <ConfirmAction
          onClose={abortDeletionHandler}
          onConfirm={confirmDeletionHandler}
        >
          Your task will be deleted
        </ConfirmAction>
      )}
      {!isEditing && (
        <button className={classes.task__checkbtn} onClick={checkTaskHandler}>
          &#10003;
        </button>
      )}
    </li>
  );
};

export default Task;
