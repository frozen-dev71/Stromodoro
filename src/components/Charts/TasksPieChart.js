
import { getVariableFromRoot } from '../../helpers/helpers';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const getPercentageForCategory = (category, tasksArr) => {
  const numTasks = tasksArr.length;
  const numTasksOfCategory = tasksArr.filter(
    task => task.category === category
  ).length;
  return (numTasksOfCategory / numTasks) * 100;
};
const initialColors = [
  getVariableFromRoot('--color-pie-1'),
  getVariableFromRoot('--color-pie-2'),
  getVariableFromRoot('--color-pie-3'),
  getVariableFromRoot('--color-pie-4'),
  getVariableFromRoot('--color-pie-5'),
  getVariableFromRoot('--color-pie-6'),
];

