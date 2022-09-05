/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import Kakao from '../../assets/img/oauth/kakao.png';
import Github from '../../assets/img/oauth/github.png';
import Google from '../../assets/img/oauth/google.png';

export default function OAuthBox({ auth }: { auth: string }) {
  const GithubURI = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
  const KakaoURI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  const GoogleURI = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;

  const handleLogin = () => {
    window.location.href =
      auth === 'kakao' ? KakaoURI : auth === 'github' ? GithubURI : GoogleURI;
  };

  return (
    <Button onClick={handleLogin}>
      <Img
        src={auth === 'kakao' ? Kakao : auth === 'github' ? Github : Google}
        alt={auth}
      />
      {auth}로 계속하기
    </Button>
  );
}

const Img = styled.img`
  width: 2rem;
  height: 2rem;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.3rem;
  background-color: #f3f4f6;
  cursor: pointer;
  width: 100%;
  margin-top: 1.6rem;
  height: 5.5rem;
  border-radius: 1rem;
  :disabled {
    cursor: default;
    background-color: #a9afb8;
  }
`;
