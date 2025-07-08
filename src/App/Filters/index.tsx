import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useTodoStore from '../../Store/todoStore';
import { useLocation } from 'react-router-dom';

const Filters = () => {
  const todos = useTodoStore((state) => state.todos);
  const setTodos = useTodoStore((state) => state.setTodos);
  const activeTodosCount = todos.filter((todo) => !todo.completed).length;
  const completedTodosCount = todos.filter((todo) => todo.completed).length;

  const { pathname } = useLocation();

  const clearCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const markAllTodos = () => {
    setTodos(todos.map((todo) => ({ ...todo, completed: true })));
  };

  const readdTodos = () => {
    setTodos(todos.map((todo) => ({ ...todo, completed: false })));
  };

  return (
    <FiltersContainer>
      <ul className="filter-links">
        <li>
          <Link to="/" className={pathname === '/' ? 'selected' : ''}>
            All<span className="tag">{todos.length}</span>
          </Link>
        </li>
        <li>
          <Link
            to="/active"
            className={pathname === '/active' ? 'selected' : ''}
          >
            Active<span className="tag">{activeTodosCount}</span>
          </Link>
        </li>
        <li>
          <Link
            to="/completed"
            className={pathname === '/completed' ? 'selected' : ''}
          >
            Completed<span className="tag">{completedTodosCount}</span>
          </Link>
        </li>
      </ul>

      <div className="filter-actions">
        {pathname === '/' && completedTodosCount > 0 && (
          <button
            type="button"
            className="clear-btn"
            onClick={clearCompletedTodos}
            title="Clear all completed todos"
          >
            Clear
          </button>
        )}

        {pathname === '/active' && activeTodosCount > 0 && (
          <button
            type="button"
            className="mark-btn"
            onClick={markAllTodos}
            title="Mark all todos as completed"
          >
            Mark all
          </button>
        )}

        {pathname === '/completed' && completedTodosCount > 0 && (
          <button
            type="button"
            className="add-btn"
            onClick={readdTodos}
            title="Readd completed todos to list"
          >
            Readd
          </button>
        )}
      </div>
    </FiltersContainer>
  );
};

export default Filters;

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;

  .filter-links {
    display: flex;
    gap: 20px;
  }

  li:first-child {
    border-right: 1px solid #ddd;
    padding-right: 10px;
  }

  a {
    color: var(--text-color);
    font-size: 14px;
  }

  .tag {
    margin-left: 6px;
    background-color: var(--gray-300);
    border-radius: 34px;
    padding: 1px 6px;
    color: #fff;
    font-size: 12px;
    align-content: center;
  }

  .selected {
    color: var(--primary);
  }

  .selected .tag {
    background-color: var(--primary-light);
    color: #fff;
  }

  .filter-actions button {
    display: flex;
    align-items: center;
    border-radius: 8px;
    gap: 4px;

    &:hover {
      text-decoration: underline;
    }
  }

  .clear-btn {
    color: var(--text-destructive);
  }

  .mark-btn {
    color: #34b93d;
  }

  .add-btn {
    color: var(--primary);
  }
`;
