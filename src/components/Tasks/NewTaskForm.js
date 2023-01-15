import classes from './NewTaskForm.module.scss';
import icons from '../../assets/icons.svg';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tasksActions } from '../../store/tasks';

const NewTaskForm = () => {
  const isEditing = useSelector(state => state.tasks.isEditing);
  const categoryRef = useRef();
  const taskRef = useRef();
  const dispatch = useDispatch();

  const enterFormHandler = () => {
    dispatch(tasksActions.setIsEditing(true));
  };
  const exitFormHandler = () => {
    dispatch(tasksActions.setIsEditing(false));
  };

  const submitTaskHandler = event => {
    event.preventDefault();

    const selectedCategory = categoryRef.current.value;
    const enteredTaskText = taskRef.current.value;

    if (selectedCategory === 'Category' && enteredTaskText.trim() === '') {
      alert('Please enter valid data');
      return;
    }
    if (selectedCategory === 'Category') {
      alert('Please enter a valid category');
      return;
    }
    if (enteredTaskText.trim() === '') {
      alert('Please enter a valid category');
      return;
    }

    const task = {
      id: Date.now(),
      text: enteredTaskText,
      category: selectedCategory,
      completed: false,
      dateCompleted: null,
    };

    dispatch(tasksActions.addTask(task));
    categoryRef.current.value = 'Category';
    taskRef.current.value = '';
  };

  useEffect(() => {
    return () => {
      if (isEditing) dispatch(tasksActions.setIsEditing(false));
    };
  }, [dispatch, isEditing]);

  let content;
  if (!isEditing)
    content = (
      <Fragment>
        <div className={`${classes.icon} ${classes['icon--not-editing']}`}>
          <svg>
            <use href={`${icons}#icon-pencil`}></use>
          </svg>
        </div>
        <button
          onClick={enterFormHandler}
          className={classes['new-task__add-btn']}
          type="button"
        >
          Add or delete tasks
        </button>
      </Fragment>
    );
  else
    content = (
      <Fragment>
        <div
          className={classes.icon}
          style={{ cursor: 'pointer' }}
          onClick={exitFormHandler}
        >
          <svg>
            <use href={`${icons}#icon-arrow-left2`}></use>
          </svg>
        </div>
        <div className={classes['new-task__form-group']}>
          <select ref={categoryRef} defaultValue="Category" required>
            <option disabled hidden value="Category">
              Category
            </option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Exercise">Exercise</option>
            <option value="Health">Health</option>
            <option value="Wellness">Wellness</option>
            <option value="Chores">Chores</option>
          </select>
          <input type="text" ref={taskRef} required placeholder="Task" />
        </div>
        <button type="submit" className={classes['new-task__submit-btn']}>
          <svg>
            <use href={`${icons}#icon-checkmark`}></use>
          </svg>
        </button>
      </Fragment>
    );

  return (
    <form onSubmit={submitTaskHandler} className={classes['new-task']}>
      {content}
    </form>
  );
};

export default NewTaskForm;
