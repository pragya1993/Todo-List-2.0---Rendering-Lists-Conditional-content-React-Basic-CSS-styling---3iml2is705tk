import React, { useState } from 'react';
import { ListRender } from './ListRender';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const handleAddTask = () => {
    const newTask = { text, date };
    setTasks([...tasks, newTask]);
    setText('');
    setDate('');
    setShowAddTaskForm(false);
  }

  const handleCancelAddTask = () => {
    setText('');
    setDate('');
    setShowAddTaskForm(false);
  }

  const handleShowAddTaskForm = () => {
    setShowAddTaskForm(true);
  }

  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const todayTasks = tasks.filter(task => task.date === today.toISOString().slice(0, 10));
  const nextWeekTasks = tasks.filter(task => task.date > today.toISOString().slice(0, 10) && task.date < nextWeek.toISOString().slice(0, 10));

  return (
    <div>
      <SideNav>
        <Inbox tasks={tasks} />
        <Today tasks={todayTasks} />
        <Next7Days tasks={nextWeekTasks} />
      </SideNav>
      {showAddTaskForm ? (
        <div>
          <input type="text" value={text} onChange={event => setText(event.target.value)} />
          <input type="date" value={date} onChange={event => setDate(event.target.value)} />
          <button onClick={handleAddTask}>Add Task</button>
          <button onClick={handleCancelAddTask}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleShowAddTaskForm}>Add New Task</button>
      )}
    </div>
  );
}

function Inbox(props) {
  return (
    <div id="code">
      <ListRender list={props.tasks} />
    </div>
  );
}

function Today(props) {
  return (
    <div id="today-list">
      <ListRender list={props.tasks} />
    </div>
  );
}

function Next7Days(props) {
  return (
    <div id="next-list">
      <ListRender list={props.tasks} />
    </div>
  );
}

function SideNav(props) {
  // Implement this component to only render one of its children at a time
  return props.children;
}

export default App;
