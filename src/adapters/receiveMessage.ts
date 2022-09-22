/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import moment from 'moment';
import connectedUsersStore from '../stores/room/connectedUsersStore';
import messageStore from '../stores/room/messagesStore';
import lobbyMessageStore from '../stores/lobbyMessageStore';
import connectedLobbyUsers from '../stores/connectedLobbyUsers';
import roomSocket from './roomSocket';
import lobbySocket from './lobbySocket';
import userStore from '../stores/userStore';
import receiveNewMessageStore from '../stores/room/receiveNewMessageStore';

const onChatMessage = (roomId: string) => {
  const { connectedUsers: roomConnected } = connectedUsersStore();
  const { connectedUsers: lobbyConnected } = connectedLobbyUsers();
  const connectedUsers = roomId === 'lobby' ? lobbyConnected : roomConnected;

  const { setIsReceiveNewMessage, setIsAlarmToggle } = receiveNewMessageStore();

  const { messages: roomMessages, setMessages: setRoomMessages } =
    messageStore();
  const { messages: lobbyMessages, setMessages: setLobbyMessages } =
    lobbyMessageStore();
  const messages = roomId === 'lobby' ? lobbyMessages : roomMessages;
  const setMessages = roomId === 'lobby' ? setLobbyMessages : setRoomMessages;

  const { uid, nickname, avatar } = userStore();
  const newSocket = roomId === 'lobby' ? lobbySocket.socket : roomSocket.socket;

  useEffect(() => {
    console.log('ready to get message');
    const receiveMessage = (receiveMsg) => {
      const isMe = receiveMsg.sender === uid;
      const userInfo = isMe
        ? {
            uid: receiveMsg.sender,
            nickname,
            avatar,
          }
        : connectedUsers.filter((user) => user.uid === receiveMsg.sender)[0];

      setMessages([
        ...messages.map((m, index) => {
          if (
            index === messages.length - 1 &&
            m.uid === receiveMsg.sender &&
            moment(m.createdAt).format('LT') ===
              moment(receiveMsg.createdAt).format('LT')
          ) {
            return {
              uid: m.uid,
              nickname: m.nickname,
              avatar: m.avatar,
              message: m.message,
              createdAt: m.createdAt,
              type: 'message',
              isHideTime: true,
              isHideNicknameAndAvatar: m.isHideNicknameAndAvatar,
            };
          }
          return m;
        }),
        {
          uid: userInfo.uid,
          nickname: userInfo.nickname,
          avatar: userInfo.avatar,
          message: receiveMsg.message,
          createdAt: receiveMsg.createdAt,
          type: 'message',
          isHideTime: false,
          isHideNicknameAndAvatar: isHide(messages, receiveMsg),
        },
      ]);
    };

    newSocket.off('chatMessage').on('chatMessage', (message) => {
      console.log('got message');
      if (roomId !== 'lobby') {
        setIsReceiveNewMessage(true);
        setIsAlarmToggle();
      }
      receiveMessage(message);
    });

    const isHide = (msg, receiveMsg) => {
      let isHideNicknameAndAvatar = true;

      if (msg.length !== 0) {
        if (
          moment(msg[msg.length - 1].createdAt).format('LT') !==
          moment(receiveMsg.createdAt).format('LT')
        ) {
          isHideNicknameAndAvatar = false;
        } else if (msg[msg.length - 1].uid !== receiveMsg.sender) {
          isHideNicknameAndAvatar = false;
        }
      } else isHideNicknameAndAvatar = false;
      return isHideNicknameAndAvatar;
    };
  }, [connectedUsers, messages]);
};

export default onChatMessage;
