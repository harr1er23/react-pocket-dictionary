import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../components/Sidebar";

const AppLayout: React.FC = () => {

    return (
      <div>
        <Sidebar />
        <div>
          <Outlet/>
        </div>
      </div>
    );
};

export default AppLayout;
