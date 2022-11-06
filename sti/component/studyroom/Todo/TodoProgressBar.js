import { useState } from 'react';
// mui
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
// recoil
import { todosState } from '../../../lib/recoil/todo';
import { useRecoilState } from 'recoil';

const TodoProgressBar = () => {
  const [todos, setTodos] = useRecoilState(todosState);
  const [completed, setCompleted] = useState(0);

  const checkedTodos = () => {
    todos.map((todo) => {
      if (todos.completed == true) {
        setCompleted(completed + 1);
      }
    });
  };

  return (
    <Box sx={{ width: '80%' }}>
      <LinearProgress
        variant="determinate"
        value={(completed / todos.length) * 100}
        sx={{ height: 10, margin: 0.5 }}
      />
      {/* <div>
        {completed} / {todos.length}
      </div> */}
    </Box>
  );
};

export default TodoProgressBar;
