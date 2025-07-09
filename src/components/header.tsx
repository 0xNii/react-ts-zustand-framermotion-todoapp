import { useRef } from 'react';
import TodoDialog from './dialog';
import { styled } from 'styled-components';
import { PlusIcon } from '../utils/icons';

const Header = () => {
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

  /* Format date */
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Layout>
        <div className="header">
          <h1>Today's Todos</h1>
          <span className="date">{date}</span>
        </div>

        <button type="button" className="addTodo" onClick={toggleDialog}>
          <PlusIcon />
          Add New Todo
        </button>
      </Layout>

      {/*Dialog component*/}
      <TodoDialog
        dialogRef={dialogRef}
        toggleDialog={toggleDialog}
        action="add"
      />
    </>
  );
};

export default Header;

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--bg);

  h1 {
    color: var(--primary);
  }

  .date {
    color: var(--text-muted);
  }

  .addTodo {
    display: flex;
    align-items: center;
    border-radius: 8px;
    background-color: var(--primary-foreground);
    color: var(--primary);
    transition: 0.3s ease-out;
    padding: 10px 20px;
    gap: 4px;

    svg {
      width: 15px;
    }

    &:hover {
      background-color: var(--primary-200);
      color: var(--primary-600);
    }
  }
`;
