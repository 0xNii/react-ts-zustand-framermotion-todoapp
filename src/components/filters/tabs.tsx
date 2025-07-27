import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useTodoStore from '../../store/todoStore';
import { useLocation } from 'react-router-dom';
import type { Routes } from './types.ts';
import { motion } from 'framer-motion';

const FilterTabs = () => {
  const { pathname } = useLocation();

  const todos = useTodoStore((state) => state.todos);
  const activeTodosCount = todos.filter((todo) => !todo.completed).length;
  const completedTodosCount = todos.filter((todo) => todo.completed).length;

  const tabs: Routes[] = [
    { name: 'All', path: '/' },
    { name: 'Active', path: '/active' },
    { name: 'Completed', path: '/completed' },
  ];

  const tags = (path: string): number => {
    switch (path) {
      case '/':
        return todos.length;
      case '/active':
        return activeTodosCount;
      case '/completed':
        return completedTodosCount;
      default:
        return 0;
    }
  };

  return (
    <Tabs>
      {tabs.map((tab) => (
        <li key={tab.path}>
          <div className="tab">
            {pathname === tab.path && (
              <motion.div className="selected" layoutId="tab" />
            )}
            <Link to={tab.path}>
              {tab.name}
              <span className="tag">{tags(tab.path)}</span>
            </Link>
          </div>
        </li>
      ))}
    </Tabs>
  );
};

export default FilterTabs;

const Tabs = styled.ul`
  display: flex;
  background-color: var(--primary-100);
  box-shadow:
    var(--primary-50) 0px 0px 0px 1px,
    var(--primary-100) 0px 0px 0px 3px;
  padding: 0.35rem;
  border-radius: 34px;

  .tab {
    position: relative;
    padding: 4px 14px;
    z-index: 0;
  }

  .tab:has(.selected) a {
    color: var(--primary-700);
  }

  .tab:has(.selected) .tag {
    border-color: var(--primary-300);
    background-color: var(--primary-50);
    color: var(--primary-700);
  }

  a {
    color: var(--primary-600);
    font-size: 14px;
  }

  .tag {
    margin-left: 6px;
    border: 1px dashed var(--primary-200);
    border-radius: 34px;
    padding: 1px 6px;
    color: var(--primary-600);
    font-size: 12px;
    align-content: center;
  }

  .selected {
    position: absolute;
    inset: 0;
    z-index: -10;
    width: 100%;
    transform-origin: 50% 50% 0px;
    background-color: var(--primary-300);
    border-radius: 34px;
  }
`;
