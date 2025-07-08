import type React from 'react';
import { useRef } from 'react';
import { styled } from 'styled-components';
import TodoInput from '../TodoInput';
import type { Todo } from '../../Store/todoStore';
import { UUID } from '../../Helpers/uuid';
import useTodoStore from '../../Store/todoStore';

type Props = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  toggleDialog: () => void;
};

const AddTodoDialog = ({ dialogRef, toggleDialog }: Props) => {
  const todoInput = useRef<HTMLInputElement>(null);
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

      /* Close Dialog */
      toggleDialog();

      /* Reset input */
      todoInput.current.value = '';
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
    <Dialog className="dialog" ref={dialogRef} onClick={lightDismiss}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="close-btn"
        onClick={toggleDialog}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>

      <div className="content">
        <h1>
          Type your todo and hit <i>Enter</i>
        </h1>
        <TodoInput
          ref={todoInput}
          onKeyUp={addNewTodoHandler}
          placeholder="eg. Review code & debug"
        />
      </div>
    </Dialog>
  );
};

export default AddTodoDialog;

const Dialog = styled.dialog`
  display: grid;
  width: min(100vw, 380px);
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
    padding: 2px 4px;
    background: var(--bg-destructive);
    color: var(--text-destructive);
  }

  .content {
    h1 {
      margin-block-end: 14px;
    }
  }
`;
