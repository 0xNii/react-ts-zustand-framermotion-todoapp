import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useTodoStore from '../../../Store/todoStore';
import type { Todo } from '../../../Store/todoStore';
import TodoInput from '../../TodoInput';

type Props = {
  todo: Todo;
  toggleEdit: () => void;
};

const EditTodo = ({ todo, toggleEdit }: Props) => {
  const todos = useTodoStore((state) => state.todos);
  const setTodos = useTodoStore((state) => state.setTodos);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const todoInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoInput.current) {
      todoInput.current.value = todo.text;
    }
  }, []);

  const updateTodo = (id: Todo['id']) => {
    if (!todoInput.current) return;

    if (todoInput.current.value.trim().length > 0) {
      /* The Non-Null assertion operator(!) tells TypeScript that todoInput.current is not null */
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, text: todoInput.current!!!.value } : todo
      );

      setTodos(updatedTodos);
    } else {
      removeTodo(id);
    }

    //
    toggleEdit();
  };

  return (
    <EditOverlay>
      <div className="field">
        <TodoInput ref={todoInput} />
      </div>

      <div className="actions">
        <button
          type="button"
          className="approve-btn"
          onClick={() => updateTodo(todo.id)}
        >
          <svg
            width="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round"></g>
            <g>
              <path
                d="M16.5163 8.93451L11.0597 14.7023L8.0959 11.8984"
                stroke="#34b93d"
                strokeWidth="2"
              ></path>
              <path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                stroke="#34b93d"
                strokeWidth="2"
              ></path>
            </g>
          </svg>
        </button>
        <button type="button" className="cancel-btn" onClick={toggleEdit}>
          <svg
            width="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round"></g>
            <g>
              <path
                d="M7.95206 16.048L16.0769 7.92297"
                stroke="#ef4343"
                strokeWidth="2"
              ></path>
              <path
                d="M16.0914 16.0336L7.90884 7.85101"
                stroke="#ef4343"
                strokeWidth="2"
              ></path>
              <path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                stroke="#ef4343"
                strokeWidth="2"
              ></path>
            </g>
          </svg>
        </button>
      </div>
    </EditOverlay>
  );
};

export default EditTodo;

const EditOverlay = styled.div`
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;

  .field {
    flex: 0 1 calc(100% - 90px);
  }
`;
