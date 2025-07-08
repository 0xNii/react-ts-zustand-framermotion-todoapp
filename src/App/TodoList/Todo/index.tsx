import { useState } from 'react';
import styled from 'styled-components';
import useTodoStore from '../../../Store/todoStore';
import type { Todo } from '../../../Store/todoStore';
import EditTodo from './edit';

type Props = {
  todo: Todo;
};

const Item = ({ todo }: Props) => {
  const todos = useTodoStore((state) => state.todos);
  const setTodos = useTodoStore((state) => state.setTodos);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  const toggleTodoComplete = (id: Todo['id']) => {
    const toggledTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(toggledTodos);
  };

  /* Edit todo */
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  return (
    <TodoLayout>
      {!edit && (
        <>
          <Checkbox>
            <input
              type="checkbox"
              id={todo.id}
              onChange={() => toggleTodoComplete(todo.id)}
              checked={todo.completed}
            />
            <label htmlFor={todo.id} className="check-box" />
          </Checkbox>

          <h1>
            {todo.completed ? (
              <s style={{ color: 'var(--text-muted)' }}>{todo.text}</s>
            ) : (
              todo.text
            )}
          </h1>

          <div className="actions">
            {!todo.completed && (
              <button type="button" className="edit-btn" onClick={toggleEdit}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width="18px"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            )}
            <button
              type="button"
              className="delete-btn"
              onClick={() => removeTodo(todo.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                width="18px"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </>
      )}

      {edit && <EditTodo todo={todo} toggleEdit={toggleEdit} />}
    </TodoLayout>
  );
};

export default Item;

const TodoLayout = styled.div`
  border-radius: 8px;
  display: flex;
  gap: 14px;
  background: #fff;
  padding: 14px 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

  h1 {
    width: calc(100% - 114px);
    color: var(--primary);
  }

  .actions {
    position: absolute;
    top: 18px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .edit-btn:hover {
    color: var(--primary);
  }

  .delete-btn:hover {
    color: var(--text-destructive);
  }
`;

// From https://getcssscan.com/css-checkboxes-examples #19 by Jimmy Gillam
const Checkbox = styled.div`
  @-moz-keyframes dothabottomcheck-19 {
    0% {
      height: 0;
    }
    100% {
      height: calc(var(--checkbox-height) / 2);
    }
  }

  @-webkit-keyframes dothabottomcheck-19 {
    0% {
      height: 0;
    }
    100% {
      height: calc(var(--checkbox-height) / 2);
    }
  }

  @keyframes dothabottomcheck-19 {
    0% {
      height: 0;
    }
    100% {
      height: calc(var(--checkbox-height) / 2);
    }
  }

  @keyframes dothatopcheck-19 {
    0% {
      height: 0;
    }
    50% {
      height: 0;
    }
    100% {
      height: calc(var(--checkbox-height) * 1.2);
    }
  }

  @-webkit-keyframes dothatopcheck-19 {
    0% {
      height: 0;
    }
    50% {
      height: 0;
    }
    100% {
      height: calc(var(--checkbox-height) * 1.2);
    }
  }

  @-moz-keyframes dothatopcheck-19 {
    0% {
      height: 0;
    }
    50% {
      height: 0;
    }
    100% {
      height: calc(var(--checkbox-height) * 1.2);
    }
  }

  input[type='checkbox'] {
    display: none;
  }

  .check-box {
    height: var(--checkbox-height);
    width: var(--checkbox-height);
    background-color: transparent;
    border: calc(var(--checkbox-height) * 0.1) solid var(--primary);
    border-radius: 5px;
    position: relative;
    display: inline-block;
    margin-top: 3px;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -moz-transition: border-color ease 0.2s;
    -o-transition: border-color ease 0.2s;
    -webkit-transition: border-color ease 0.2s;
    transition: border-color ease 0.2s;
    cursor: pointer;
  }

  .check-box::before,
  .check-box::after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    height: 0;
    width: calc(var(--checkbox-height) * 0.2);
    background-color: #34b93d;
    display: inline-block;
    -moz-transform-origin: left top;
    -ms-transform-origin: left top;
    -o-transform-origin: left top;
    -webkit-transform-origin: left top;
    transform-origin: left top;
    border-radius: 5px;
    content: ' ';
    -webkit-transition: opacity ease 0.5;
    -moz-transition: opacity ease 0.5;
    transition: opacity ease 0.5;
  }

  .check-box::before {
    top: calc(var(--checkbox-height) * 0.72);
    left: calc(var(--checkbox-height) * 0.41);
    box-shadow: 0 0 0 calc(var(--checkbox-height) * 0.05) #fff;
    -moz-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }

  .check-box::after {
    top: calc(var(--checkbox-height) * 0.37);
    left: calc(var(--checkbox-height) * 0.05);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  input[type='checkbox']:checked + .check-box,
  .check-box.checked {
    border-color: #34b93d;
  }

  input[type='checkbox']:checked + .check-box::after,
  .check-box.checked::after {
    height: calc(var(--checkbox-height) / 2);
    -moz-animation: dothabottomcheck-19 0.2s ease 0s forwards;
    -o-animation: dothabottomcheck-19 0.2s ease 0s forwards;
    -webkit-animation: dothabottomcheck-19 0.2s ease 0s forwards;
    animation: dothabottomcheck-19 0.2s ease 0s forwards;
  }

  input[type='checkbox']:checked + .check-box::before,
  .check-box.checked::before {
    height: calc(var(--checkbox-height) * 1.2);
    -moz-animation: dothatopcheck-19 0.4s ease 0s forwards;
    -o-animation: dothatopcheck-19 0.4s ease 0s forwards;
    -webkit-animation: dothatopcheck-19 0.4s ease 0s forwards;
    animation: dothatopcheck-19 0.4s ease 0s forwards;
  }
`;
