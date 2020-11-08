import React from 'react';
import styled from 'styled-components';

const LoginFormContainer = styled.div`
  margin-top: 30px;
  text-align: center;
  background-color: #fff;
  width: 300px;
  margin-bottom: 15vh;
  border: 2px solid #eeeeee;
  border-radius: 8px;
  box-shadow: 0px 0px 1px 1px rgba(204, 204, 204, 1);
`;

const LoginText = styled.div`
  width: 100%;
  margin: 0 15px;
  margin-top: 15px;
  margin-bottom: 5px;
  text-align: left;
  font-size: 15px;
  font-weight: 800;
`;

const LoginInput = styled.input`
  width: 250px;
  line-height: normal;
  padding: 0.5em 0.5em;
  border: 1px solid #cccccc;
  border-radius: 5px;
  height: auto;
  font-family: inherit;
  box-shadow: 0px 0px 1px 1px rgba(240, 240, 240, 1);
`;

const LoginButtonDiv = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
`;
const LoginButton = styled.button`
  background-color: white;
  border: none;
  color: #2299ff;
  font-weight: 800;
`;
const GithubLoginDiv = styled.a`
  width: 250px;
  margin: 0 auto;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  background-color: black;
  color: white;
  font-size: 15px;
  font-weight: 500;
  padding: 5px 0.5em;
  border-radius: 5px;
  text-decoration: none;
  &:hover {
    background-color: #333333;
  }
`;
const GithubLoginText = styled.div`
  padding-left: 15px;
`;
const GithubLoginLogo = styled.svg`
  margin: 0 10px;
  fill: white;
`;

const LoginForm = () => {
  return (
    <LoginFormContainer>
      <form action="">
        <LoginText>아이디</LoginText>
        <LoginInput type="text" name="id" placeholder="미구현" />
        <LoginText>비밀번호</LoginText>
        <LoginInput type="password" name="password" placeholder="미구현" />
      </form>
      <LoginButtonDiv>
        <LoginButton>로그인</LoginButton>
        <LoginButton>회원가입</LoginButton>
      </LoginButtonDiv>
      <GithubLoginDiv href="http://localhost:3000/user/login">
        <GithubLoginText>Sign in with Github</GithubLoginText>
        <GithubLoginLogo
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </GithubLoginLogo>
      </GithubLoginDiv>
    </LoginFormContainer>
  );
};

export default LoginForm;
