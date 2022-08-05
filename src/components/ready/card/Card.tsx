import styled from 'styled-components';
import useRoom from '../../../hooks/useRoom';
import Header from './Header';
import Title from './Title';
import Tags from './Tags';

export default function Card({ room }) {
  const { isLoading, error, data } = useRoom(room);

  if (isLoading)
    return <div style={{ color: 'white', fontSize: '5rem' }}>loading....</div>;
  if (error) return <div>An error has occurred: </div>;

  return (
    <Container>
      <Header data={data} />
      <Detail>
        <Title data={data} />
        <Tags data={data} />
      </Detail>
    </Container>
  );
}

const Detail = styled.div`
  margin-top: 4rem;
`;

const Container = styled.div`
  height: 33.6rem;
  width: 100%;
  padding: 3.2rem 2rem;
`;
