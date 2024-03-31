import React from "react";

import styles from "./Auth.module.scss";

import Login from "../../components/Login";
import Registration from "../../components/Registration";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState(true);

  return (
    <div>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Registration setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default Auth;
