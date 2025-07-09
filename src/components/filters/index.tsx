import styled from 'styled-components';
import FilterTabs from './tabs';
import FilterActions from './actions';

const Filters = () => {
  return (
    <Layout>
      <FilterTabs />
      <FilterActions />
    </Layout>
  );
};

export default Filters;

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 10px;
  position: sticky;
  top: 65px;
  z-index: 1;
  background-color: var(--bg);
`;
