import Pomodoro from '../components/Pomodoro/Pomodoro';
import Taskbar from '../components/Tasks/Taskbar';
import ManualLog from '../components/Pomodoro/ManualLog';

const PomodoroPage = () => {
  return (
    <div className="main-pomodoro">
      <Pomodoro />
      <ManualLog />
      <Taskbar />
    </div>
  );
};

export default PomodoroPage;
