import { useEffect, useState } from 'react';
// mui
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
// recoil
import { todosState } from '../../../lib/recoil/todo';
import { useRecoilState } from 'recoil';
import { UpdateTodoState } from '../../../lib/recoil/todoTimerState';

const TodoProgressBar = () => {
  const [todos, setTodos] = useRecoilState(todosState);
  const [completed, setCompleted] = useState(0);
  const [updateTodo, setUpdateTodo] = useRecoilState(UpdateTodoState);

  useEffect(() => {
    checkedTodos();
  }, [todos]);

  const checkedTodos = () => {
    let completeCount = 0;
    todos.map((todo) => {
      if (todo.complete === true) {
        completeCount += 1;
      }
    });
    setCompleted(completeCount);
  };

  return (
    <Box sx={{ width: '80%' }}>
      <LinearProgress
        variant="determinate"
        value={(completed / todos.length) * 100}
        sx={{ height: 10, margin: 0.5, borderRadius: '10px' }}
      />
      <div style={{ textAlign: 'center' }}>
        {todos.length === 0 ? (
          <div>오늘의 목표를 작성해주세요!</div>
        ) : (
          <>
            {todos.length === completed ? (
              <div>오늘 목표 끝! 🥳</div>
            ) : (
              <div>{todos.length - completed}개 남았어요! 💪</div>
            )}
          </>
        )}
      </div>
    </Box>
  );
};

export default TodoProgressBar;
