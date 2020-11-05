import React from 'react';

const LoginForm = () => {
  return (
    <div className="login__form">
      <form action="">
        <div className="login__id-span">아이디</div>
        <input type="text" name="id" />
        <div className="login__password-span">비밀번호</div>
        <input type="password" name="password" />
        <button>할일추가</button>
      </form>
      <div className="login__buttons">
        <button>로그인</button>
        <button>회원가입</button>
      </div>
      <div className="login__github">
        <div className="login__github-span">Sign in with Github</div>
        <img src="" />
      </div>
    </div>
  );
};

export default LoginForm;
