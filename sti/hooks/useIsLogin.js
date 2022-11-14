import { createContext, useState } from 'react';

const IsLoginContext = createContext();

const IsLoginContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <IsLoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </IsLoginContext.Provider>
  );
};

export { IsLoginContext, IsLoginContextProvider };
