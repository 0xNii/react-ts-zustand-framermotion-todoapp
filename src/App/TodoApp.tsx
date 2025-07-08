import { useRef } from 'react';
import Header from './Header';
import styled from 'styled-components';
import AddTodoDialog from './Dialog';
import TodoList from './TodoList';

const TodoApp = () => {
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
      <Layout>
        <AddTodoDialog dialogRef={dialogRef} toggleDialog={toggleDialog} />
        <Header toggleDialog={toggleDialog} />
        <TodoList />
      </Layout>
    </>
  );
};

export default TodoApp;

const Layout = styled.div`
  width: min(500px, 100vw);
  padding: 20px;
  margin: 0 auto 50px;
`;
