import React from 'react';
import styled from 'styled-components';
import Block from './Block';
import useRooms from '../../hooks/useRooms';
import CreateRoom from './CreateRoom';
import { filterData } from './filterData';
import searchInputStore from '../../stores/searchInputStore';
import EmptyBlock from './EmptyBlock';

export default function RoomCards({
  openCreateRoom,
}: {
  openCreateRoom: () => void;
}) {
  const { searchInput } = searchInputStore();
  const { isLoading, error, data } = useRooms();

  if (error) return <div>An error has occurred: </div>;

  const newData = filterData(data, searchInput);

  return (
    <Container>
      <CreateRoom openCreateRoom={openCreateRoom} />
      {isLoading
        ? [...Array(3)].map((no, index) => (
            <EmptyBlock key={Symbol(index).toString()} isMain={false} />
          ))
        : newData.map((data) => {
            return <Block key={data.itemId} isMain data={data} />;
          })}
    </Container>
  );
}

const Container = styled.div`
  /* width: calc(100% - 10rem); */
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-right: 10%;
  margin: 10rem 0 0 20%;
  row-gap: 7.6rem;
`;
