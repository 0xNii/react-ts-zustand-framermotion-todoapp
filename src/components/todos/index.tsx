import { useLocation } from 'react-router-dom';
import { type ReactElement, useEffect, useState } from 'react';
import type { Todo } from '../../store/todoStore';
import useTodoStore from '../../store/todoStore';
import { Reorder } from 'framer-motion';
import Item from './todo';
import { styled } from 'styled-components';

const TodoList = () => {
  const { pathname } = useLocation();

  const { todos, setTodos } = useTodoStore();
  const activeTodosCount = todos.filter((todo) => !todo.completed).length;
  const completedTodosCount = todos.filter((todo) => todo.completed).length;

  const [items, setItems] = useState<Todo[]>(todos);

  /* Updates items to reflect todo changes. e.g a todo has been completed */
  useEffect(() => {
    if (!todos) return;

    setItems(todos);
  }, [todos]);

  /* When order of items change, set todos to save changes */
  useEffect(() => {
    setTodos(items);
  }, [items]);

  if (pathname === '/active' && !activeTodosCount) {
    return (
      <div>
        <img
          src="images/encontrar-objetivos.png"
          alt="todo list illustration"
          width="100%"
        />
        <p style={{ textAlign: 'center' }}>
          <span
            style={{
              color: 'var(--primary-400)',
            }}
          >
            Great job! get some rest 😊
          </span>
        </p>
      </div>
    );
  }

  if (pathname === '/completed' && !completedTodosCount) {
    return (
      <Blockquote>
        <p>
          Preparing to do the thing isn't doing the thing. Scheduling time to do
          the thing isn't doing the thing. Making a to-do list for the thing
          isn't doing the thing. The only thing that is doing the thing is doing
          the thing.
        </p>
        <p> ~ Strangest Loop</p>
      </Blockquote>
    );
  }

  return (
    <Reorder.Group
      data-testid="todo-list"
      axis="y"
      onReorder={setItems}
      values={items}
      style={listStyle}
      as="ul"
    >
      {items
        .filter((todo): boolean => {
          switch (pathname) {
            case '/':
              return true;
            case '/active':
              return !todo.completed;
            case '/completed':
              return todo.completed;
            default:
              return true;
          }
        })
        .map(
          (item): ReactElement => (
            <Item key={item.id} todo={item} />
          )
        )}
    </Reorder.Group>
  );
};

export default TodoList;

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  overflow: 'hidden',
  padding: 8,
};

const Blockquote = styled.blockquote`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: max-content;
  margin: 50px 0;
  background: var(--primary-50);
  color: var(--primary-600);
  position: relative;
  padding: 20px;
  padding-top: 50px;
  border-radius: 0 24px 24px 0;

  &:before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--primary-300);
    border-radius: 4px;
  }

  &:after {
    font-family: sans-serif;
    position: absolute;
    content: '“';
    top: 0;
    left: -16px;
    font-size: 200px;
    line-height: 130px;
    color: var(--primary-300);
  }
`;
