import { useRef, useState } from 'react';
import TodoDialog from './dialog';
import { styled } from 'styled-components';
import { PlusIcon } from '../utils/icons';

const Header = () => {
  // State to control dialog rendering
  const [isDialogRendered, setIsDialogRendered] = useState(false);
  // Reference to the dialog element
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Function to open the dialog (render and show)
  const openDialog = (): void => {
    setIsDialogRendered(true); // Render the dialog
    // Use setTimeout to ensure the dialog is in the DOM before calling showModal
    setTimeout(() => {
      dialogRef.current?.showModal();
    }, 0);
  };

  // Function to close the dialog (close and unmount)
  const closeDialog = (): void => {
    dialogRef.current?.close();

    setTimeout(() => {
      setIsDialogRendered(false); // Unmount the dialog
    }, 300);
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
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
          <span className="date" aria-label="date">
            {formattedDate}
          </span>
        </div>

        <button type="button" className="addTodo" onClick={openDialog}>
          <PlusIcon />
          Add New Todo
        </button>
      </Layout>

      {isDialogRendered && (
        <TodoDialog
          dialogRef={dialogRef}
          closeDialog={closeDialog}
          action="add"
        />
      )}
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
