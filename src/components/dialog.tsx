import type React from 'react';
import { useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import type { Todo } from '../store/todoStore';
import useTodoStore from '../store/todoStore';
import { UUID } from '../helpers/uuid';
import TodoInput from './input';
import { CloseIcon } from '../utils/icons';

type Props = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  toggleDialog: () => void;
  action: 'add' | 'edit';
  todo?: Todo;
};

const TodoDialog = ({ dialogRef, toggleDialog, action, todo }: Props) => {
  const todoInput = useRef<HTMLInputElement>(null);

  /* Set todo text as input value when editing todo */
  useEffect(() => {
    if (!todoInput.current) return;

    if (action === 'edit') {
      todoInput.current.value = todo!!!.text;
    }
  }, []);

  const todos = useTodoStore((state) => state.todos);
  const setTodos = useTodoStore((state) => state.setTodos);
  const addNewTodo = useTodoStore((state) => state.addNewTodo);

  const addNewTodoHandler: React.KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (!todoInput.current) return;

    if (e.key === 'Enter' && todoInput.current.value.trim().length > 0) {
      /* Create new todo */
      const todo: Todo = {
        id: UUID(),
        text: todoInput.current.value,
        completed: false,
      };

      /* Add new todo to TODOS state */
      addNewTodo(todo);

      /* Close dialog */
      toggleDialog();

      /* Reset input */
      todoInput.current.value = '';
    }
  };

  const updateTodo = (e: React.KeyboardEvent, id: Todo['id']) => {
    if (!todoInput.current) return;

    if (e.key === 'Enter' && todoInput.current.value.trim().length > 0) {
      /* The Non-Null assertion operator(!) tells TypeScript that todoInput.current is not null */
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, text: todoInput.current!!!.value } : todo
      );

      setTodos(updatedTodos);

      /* Close Dialog */
      toggleDialog();
    }
  };

  /* Close dialog on modal click */
  const lightDismiss = (e: React.MouseEvent) => {
    if (!dialogRef.current) return;

    const dialogDimensions = dialogRef.current.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialogRef.current.close();
    }
  };

  return (
    <Dialog ref={dialogRef} onClick={lightDismiss}>
      <span className="close-btn" onClick={toggleDialog}>
        <CloseIcon />
      </span>

      <div className="content">
        <h1>
          {action === 'add' ? 'Type' : 'Edit'} your todo and hit <i>Enter</i>
        </h1>
        <TodoInput
          ref={todoInput}
          onKeyUp={(e) =>
            action === 'add' ? addNewTodoHandler(e) : updateTodo(e, todo!!!.id)
          }
          placeholder="eg. Take a course in JS"
        />
      </div>
    </Dialog>
  );
};

export default TodoDialog;

const Dialog = styled.dialog`
  display: grid;
  width: min(100vw, 400px);
  overflow: hidden;
  position: fixed;
  padding: 10px 20px 20px;
  inset: 0;
  z-index: 99;
  border-radius: 8px;
  transition: opacity 0.5s cubic-bezier(0.25, 0, 0.3, 1);
  box-shadow: 0 0 12px rgba(57, 73, 76, 0.45);
  max-block-size: 100vw;
  margin-block-end: 0;
  border-end-end-radius: 0;
  border-end-start-radius: 0;
  animation: slide-out-down 0.5s cubic-bezier(0.25, 0, 0.3, 1) forwards;

  &:not([open]) {
    pointer-events: none;
    opacity: 0;
  }

  &[open] {
    animation: slide-in-up 0.5s cubic-bezier(0.25, 0, 0.3, 1) forwards;
  }

  @keyframes slide-in-up {
    0% {
      transform: translateY(100%);
    }
  }

  @keyframes slide-out-down {
    to {
      transform: translateY(100%);
    }
  }

  &::backdrop {
    background: var(--bg-backdrop);
    backdrop-filter: blur(4px);
  }

  .close-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    height: 24px;
    width: 24px;
    cursor: pointer;
    border-radius: 50%;
    padding: 4px;
    background: var(--bg-destructive);
    color: var(--text-destructive);
  }

  .content {
    h1 {
      margin-block-end: 14px;
    }
  }
`;
