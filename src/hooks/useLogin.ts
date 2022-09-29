import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API } from '../config';
import mainModalStore from '../stores/mainModalStore';
import userStore from '../stores/userStore';

export default function useLogin() {
  const navigate = useNavigate();
  const { setNickname, setAvatar, setUid } = userStore();
  const { closeLoginModal, openLoginModal } = mainModalStore();
  const [inputs, setInputs] = useState({
    email: localStorage.getItem('email') ?? '',
    password: '',
  });
  const { email, password } = inputs;
  const [isError, setIsError] = useState(false);

  const onChange = (e) => {
    setIsError(false);
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const isDisable = () => {
    if (email === '' || password === '') return true;
    return false;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API.SESSION, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('email', inputs.email);
        axios
          .get(API.ME, {
            headers: {
              Authorization: `Bearer ${res.data.access_token}`,
            },
          })
          .then((res) => {
            setNickname(res.data.nickname);
            setAvatar(res.data.avatar);
            setUid(res.data.uid);
            toast.success('로그인이 완료되었습니다');
            navigate(`/main`);
          });
        closeLoginModal();
      })
      .catch((err) => {
        console.log('[error]', err.response.data.message);
        setIsError(true);
        openLoginModal();
      });
  };

  return {
    inputs,
    onChange,
    onSubmit,
    isDisable,
    isError,
  };
}
