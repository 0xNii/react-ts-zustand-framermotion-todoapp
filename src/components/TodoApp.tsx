import { Navigate } from 'react-router-dom';
import useTodoStore from '../store/todoStore';
import styled from 'styled-components';
import Header from './header';
import Filters from './filters';
import TodoList from './todos';

const TodoApp = () => {
  const { todos } = useTodoStore();

  return (
    <Layout>
      <Header />
      {todos.length > 0 ? (
        <>
          <Filters />
          <TodoList />
        </>
      ) : (
        <>
          <div className="credits">
            <p style={{ textAlign: 'center' }}>
              <i>Todo App by</i>{' '}
              <a
                href="https://github.com/0xNii"
                target="_blank"
                style={{ color: 'var(--primary)' }}
              >
                0xNii
              </a>
            </p>
          </div>
          <Navigate to="/" />
        </>
      )}
    </Layout>
  );
};

export default TodoApp;

const Layout = styled.div`
  width: min(500px, 100vw);
  margin: 0 auto 50px;
  padding: 0 20px;

  .credits {
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
  }
`;
