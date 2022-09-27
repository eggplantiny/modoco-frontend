import React from 'react';
import styled from 'styled-components';
import SingleParticipant from './SingleParticipant';
import connectedUsersStore from '../../../stores/room/connectedUsersStore';
import UserStore from '../../../stores/userStore';
import userMediaStreamStore from '../../../stores/room/userMediaStreamStore';

export default function Participants({ moderator }: { moderator: number }) {
  const { connectedUsers, userStream, setVolumeByUid } = connectedUsersStore(
    (state) => state,
  );
  const { userMediaStream } = userMediaStreamStore((state) => state);
  const { uid, nickname, avatar } = UserStore((state) => state);

  const getAudioTrack = (stream: MediaStream) => {
    return stream?.getAudioTracks().length > 0;
  };

  return (
    <Component>
      <Title>참여자 목록</Title>
      <UserList>
        <SingleParticipant
          isMe
          nickname={nickname}
          uid={uid}
          avatar={avatar}
          isAudioEnabled={
            getAudioTrack(userMediaStream)
              ? userMediaStream.getAudioTracks()[0].enabled
              : false
          }
          moderator={moderator}
          volume={0.5}
          setVolumeByUid={setVolumeByUid}
        />
        {connectedUsers.map((user) => (
          <SingleParticipant
            key={user.uid}
            isMe={false}
            nickname={user.nickname}
            uid={user.uid}
            avatar={user.avatar}
            isAudioEnabled={
              getAudioTrack(userStream[user?.socketId])
                ? user.enabledAudio
                : false
            }
            moderator={moderator}
            volume={user.volume}
            setVolumeByUid={setVolumeByUid}
          />
        ))}
      </UserList>
    </Component>
  );
}

const Component = styled.div`
  font-family: IBMPlexSansKRRegular;
  font-size: 1.3rem;
  border-bottom: 1px solid rgba(55, 65, 81, 1);
  padding-bottom: 2.2rem;
  color: #9ca3af;
  max-height: 12.8rem;
  /* flex-shrink: 1; */
`;

const Title = styled.div``;

const UserList = styled.div`
  margin-top: 0.8rem;
  margin-right: 1.9rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 3.3rem;
`;
