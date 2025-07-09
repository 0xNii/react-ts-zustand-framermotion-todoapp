import styled from 'styled-components';
import useTodoStore from '../../store/todoStore';
import { useLocation } from 'react-router-dom';
import Tooltip from '../tooltip';
import { ClearIcon, MarkIcon, ReaddIcon } from '../../utils/icons';

const FilterActions = () => {
  const { pathname } = useLocation();

  const todos = useTodoStore((state) => state.todos);
  const activeTodosCount = todos.filter((todo) => !todo.completed).length;
  const completedTodosCount = todos.filter((todo) => todo.completed).length;
  const setTodos = useTodoStore((state) => state.setTodos);

  /* Clear all completed todos */
  const clearCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  /* Mark all active todos as completed */
  const markAllTodos = () => {
    setTodos(todos.map((todo) => ({ ...todo, completed: true })));
  };

  /* Readd all completed todos to list as active */
  const readdTodos = () => {
    setTodos(todos.map((todo) => ({ ...todo, completed: false })));
  };

  return (
    <Layout>
      {pathname === '/' && completedTodosCount > 0 && (
        <Tooltip content="Clear completed todos">
          <button
            type="button"
            className="clear-btn"
            onClick={clearCompletedTodos}
          >
            <ClearIcon />
          </button>
        </Tooltip>
      )}

      {pathname === '/active' && activeTodosCount > 0 && (
        <Tooltip content="Mark all todos">
          <button type="button" className="mark-btn" onClick={markAllTodos}>
            <MarkIcon />
          </button>
        </Tooltip>
      )}

      {pathname === '/completed' && completedTodosCount > 0 && (
        <Tooltip content="Readd todos">
          <button type="button" className="add-btn" onClick={readdTodos}>
            <ReaddIcon />
          </button>
        </Tooltip>
      )}
    </Layout>
  );
};
export default FilterActions;

const Layout = styled.div`
  button {
    display: flex;
    align-items: center;
    border-radius: 8px;
    gap: 4px;

    &:hover {
      text-decoration: underline;
    }
  }

  .clear-btn {
    stroke: var(--text-destructive);
  }

  .mark-btn {
    stroke: #34b93d;
  }

  .add-btn {
    stroke: var(--primary-400);
  }
`;
