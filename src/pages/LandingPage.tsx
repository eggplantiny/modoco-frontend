import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Scrolls from '../components/main/Scrolls';
import Header from '../components/main/Header';
import Title from '../components/main/TitleContainer';
import Modal from '../components/layout/Modal';
import LoginModal from '../components/login/LoginModal';
import useSetSelf from '../hooks/useSetSelf';
import UserStore from '../stores/userStore';
import LandingPage from '../components/main/landingPage/LandingPage';

export default function Main() {
  const [isModal, setIsModal] = useState(false);
  const { nickname } = UserStore();
  const navigate = useNavigate();
  useSetSelf();
  useEffect(() => {
    if (nickname) {
      navigate('/main');
    }
  });

  const closeModalHandler = () => {
    setIsModal(false);
  };
  const openModalHandler = () => {
    setIsModal(true);
  };

  return (
    <>
      <Container>
        <Header modalHandler={openModalHandler} />
        <Title />
        <Scrolls />
        <LandingPage />
      </Container>
      {isModal && (
        <Modal modalHandler={closeModalHandler}>
          <LoginModal modalHandler={closeModalHandler} />
        </Modal>
      )}
    </>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #18181b;
`;
