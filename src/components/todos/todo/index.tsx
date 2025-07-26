import { useRef } from 'react';
import styled from 'styled-components';
import type { Todo } from '../../../store/todoStore';
import useTodoStore from '../../../store/todoStore';
import { Reorder, useDragControls } from 'framer-motion';
import TodoDialog from '../../dialog';
import Tooltip from '../../tooltip';
import { DeleteIcon, DragHandleIcon, EditIcon } from '../../../utils/icons';

type Props = {
  todo: Todo;
};

const Item = ({ todo }: Props) => {
  const { todos, setTodos, removeTodo } = useTodoStore();

  const toggleTodoComplete = (id: Todo['id']) => {
    const toggledTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(toggledTodos);
  };

  /* Framer motion drag controls hook */
  const dragControls = useDragControls();

  /* Dialog */
  const dialogRef = useRef<HTMLDialogElement>(null);

  const toggleDialog = () => {
    if (!dialogRef.current) {
      return;
    }

    dialogRef.current.hasAttribute('open')
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  return (
    <>
      <TodoItem
        value={todo}
        data-testid="todo-item"
        dragListener={false}
        dragControls={dragControls}
      >
        <div className="text">
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
        </div>

        <div className="actions">
          {!todo.completed && (
            <Tooltip content="Edit">
              <button type="button" className="edit-btn" onClick={toggleDialog}>
                <EditIcon />
              </button>
            </Tooltip>
          )}

          <Tooltip content="Delete">
            <button
              type="button"
              className="delete-btn"
              onClick={() => removeTodo(todo.id)}
            >
              <DeleteIcon />
            </button>
          </Tooltip>

          <button
            type="button"
            style={{ cursor: 'grab' }}
            onPointerDown={(event) => dragControls.start(event)}
          >
            <DragHandleIcon />
          </button>
        </div>
      </TodoItem>

      <TodoDialog
        dialogRef={dialogRef}
        toggleDialog={toggleDialog}
        action="edit"
        todo={todo}
      />
    </>
  );
};

export default Item;

const TodoItem = styled(Reorder.Item)`
  display: flex;
  border-radius: 8px;
  background: #fff;
  padding: 14px 20px;
  cursor: pointer;
  position: relative;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 8px;
  user-select: none;
  height: max-content;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  .text {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  h1 {
    color: var(--primary);
    text-wrap: pretty;
  }

  .actions {
    display: flex;
    align-items: center;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #aaa;
    padding: 6px;
    border-radius: 8px;
    transition: 0.4s ease-out;
  }

  .edit-btn:hover {
    background: var(--primary-foreground);
    color: var(--primary-500);
  }

  .delete-btn:hover {
    background: var(--bg-destructive);
    color: var(--text-destructive);
  }
`;

// From https://getcssscan.com/css-checkboxes-examples #19 by Jimmy Gillam
const Checkbox = styled.span`
  @-moz-keyframes checkbox-19 {
    0% {
      height: 0;
    }
    100% {
      height: calc(var(--checkbox-height) / 2);
    }
  }

  @-webkit-keyframes checkbox-19 {
    0% {
      height: 0;
    }
    100% {
      height: calc(var(--checkbox-height) / 2);
    }
  }

  @keyframes checkbox-19 {
    0% {
      height: 0;
    }
    100% {
      height: calc(var(--checkbox-height) / 2);
    }
  }

  @keyframes check-19 {
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

  @-webkit-keyframes check-19 {
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

  @-moz-keyframes check-19 {
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
    border: calc(var(--checkbox-height) * 0.1) solid var(--primary-300);
    border-radius: 5px;
    position: relative;
    display: inline-block;
    margin-top: 5px;
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
    background-color: var(--primary-400);
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

  input[type='checkbox']:checked + .check-box::after,
  .check-box.checked::after {
    height: calc(var(--checkbox-height) / 2);
    -moz-animation: checkbox-19 0.2s ease 0s forwards;
    -o-animation: checkbox-19 0.2s ease 0s forwards;
    -webkit-animation: checkbox-19 0.2s ease 0s forwards;
    animation: checkbox-19 0.2s ease 0s forwards;
  }

  input[type='checkbox']:checked + .check-box::before,
  .check-box.checked::before {
    height: calc(var(--checkbox-height) * 1.2);
    -moz-animation: check-19 0.4s ease 0s forwards;
    -o-animation: check-19 0.4s ease 0s forwards;
    -webkit-animation: check-19 0.4s ease 0s forwards;
    animation: check-19 0.4s ease 0s forwards;
  }
`;
