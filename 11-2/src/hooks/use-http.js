import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requstConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requstConfig.url, {
        method: requstConfig.method ? requstConfig.method : "GET",
        headers: requstConfig.headers ? requstConfig.headers : {},
        body: requstConfig.body ? JSON.stringify(requstConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    // 우측의 속성명과 좌측의 변수명을 같은 이름으로 사용하여 js기능을 사용
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
