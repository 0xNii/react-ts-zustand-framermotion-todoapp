import { styled } from 'styled-components';
import useTodoStore from '../../Store/todoStore';
import Item from './Todo';
import { useLocation } from 'react-router-dom';
import Filters from '../Filters';

const TodoList = () => {
  const todos = useTodoStore((state) => state.todos);
  const { pathname } = useLocation();

  return (
    <>
      {todos.length > 0 ? (
        <>
          <Filters />
          <List>
            {todos
              .filter((todo) => {
                switch (pathname) {
                  case '/':
                    return true;
                  case '/active':
                    return !todo.completed;
                  case '/completed':
                    return todo.completed;
                }
              })
              .map((todo) => (
                <Item key={todo.id} todo={todo} />
              ))}
          </List>
        </>
      ) : (
        <>
          <img
            src="images/encontrar-objetivos.png"
            alt="todo list illustration"
            width="100%"
          />
          <div className="credits">
            <p style={{ textAlign: 'center' }}>
              <i>TodoApp by</i>{' '}
              <a
                href="https://github.com/0xNii"
                target="_blank"
                style={{ color: 'var(--primary)' }}
              >
                0xNii
              </a>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default TodoList;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
