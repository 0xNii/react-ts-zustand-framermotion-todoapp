import { styled } from 'styled-components';

type Props = {
  toggleDialog: () => void;
};

const Header = ({ toggleDialog }: Props) => {
  const date = new Date().toDateString();

  return (
    <Layout>
      <div className="header">
        <h1>Today's Todos</h1>
        <span className="date">{date}</span>
      </div>

      <button type="button" className="addTodo" onClick={toggleDialog}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
        </svg>
        Add New Todo
      </button>
    </Layout>
  );
};

export default Header;

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

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
    padding: 10px 20px;
    gap: 4px;

    svg {
      width: 15px;
    }
  }
`;
