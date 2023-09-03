import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import LoginFormModal from "./components/LoginFormModal";
import { useSetupUserCtx, UserContext } from "./common/user";

function App() {
  const userCtx = useSetupUserCtx();

  return (
    <UserContext.Provider value={userCtx}>
      <div>
        <div className="bg-gray-800 py-8">
          <Header />
        </div>
        <div className="py-16">
          <div className="container h-full">
            <Outlet />
          </div>
        </div>
        <LoginFormModal />
      </div>
    </UserContext.Provider>
  );
}

export default App;
