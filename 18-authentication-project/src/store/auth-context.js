import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

// 초기 데이터 설정 (초기화)
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adgExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adgExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  // 남은 시간이 있어서 유호한 토큰이 있다면 저장된 토큰과 남은 시간을 리턴
  return {
    token: storedToken,
    duration: remainingTime,
  };
};

// 인증 관련 상태를 관리하는 컴포넌트
export const AuthContextProvider = (props) => {
  // 초키 토큰 value 설정
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);

  // 토큰이 있는지 확인하는 결과 (!!를 사용하여 참 또는 거짓 값을 부울 값으로 바꿔줌)
  const userIsLoggedIn = !!token; // 토큰을 가진 상태면 true, 토큰이 null 이면 false

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    // 사용자가 로그인하면 토큰 로컬 저장소에 저장
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    // 이 컴포넌트를 다른컴포넌트의 래퍼로 활용하면 다른 컴포넌트가 이 컨텍스트에 접근할 수 있다.
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

// Context API 는 초기화 한 상수를 기본값으로 내보낸다.
export default AuthContext;
