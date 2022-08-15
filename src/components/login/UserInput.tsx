import React, { useRef } from 'react';
import styled from 'styled-components';
import useLogin from '../../hooks/useLogin';

export default function UserInput() {
  const { inputs, onChange, onSubmit, isDisable, isError } = useLogin();
  const { email, password } = inputs;
  const errorMsg = useRef(null);

  const onBlur = () => {
    if (!email) {
      errorMsg.current.style.display = 'block';
      errorMsg.current.innerText = '이메일을 입력해주세요.';
    } else if (!password) {
      errorMsg.current.innerText = '비밀번호를 입력해주세요.';
    } else {
      errorMsg.current.style.display = 'none';
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        placeholder="이메일"
        name="email"
        value={email}
        autoComplete="on"
        onChange={onChange}
        onBlur={onBlur}
      />
      <Input
        type="password"
        name="password"
        autoComplete="on"
        placeholder="비밀번호"
        value={password}
        onChange={onChange}
        onBlur={onBlur}
      />
      <Error ref={errorMsg} />
      {isError && (
        <Error style={{ display: 'block' }}>
          이메일과 비밀번호를 확인해주세요
        </Error>
      )}
      <Button disabled={isDisable()}>로그인</Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  input:first-child {
    border-radius: 1rem 1rem 0 0;
    margin-top: 1rem;
  }

  input:nth-child(2) {
    border-radius: 0 0 1rem 1rem;
  }

  input:focus {
    border: 1px solid lightblue;
  }
`;

const Input = styled.input`
  font-size: 1.5rem;
  width: 100%;
  height: 4.9rem;
  background: transparent;
  outline: none;
  color: white;
  font-family: IBMPlexSansKRRegular;
  background-color: #191f28;
  padding-left: 1.6rem;
`;

const Button = styled.button`
  font-family: IBMPlexSansKRRegular;
  font-size: 1.5rem;
  background-color: #f3f4f6;
  cursor: pointer;
  width: 100%;
  margin-top: 2.6rem;
  height: 5.5rem;
  border-radius: 1rem;
  :disabled {
    cursor: default;
    background-color: #a9afb8;
  }
`;

const Error = styled.span`
  color: #ed8e8e;
  margin-top: 0.7rem;
  display: none;
`;
