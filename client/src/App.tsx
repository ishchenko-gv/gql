import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import SigninModal from "./components/SigninModal";
import { useUser, UserContext } from "./common/user";

function App() {
  const user = useUser();

  return (
    <UserContext.Provider value={user}>
      <div>
        <div className="bg-gray-800 py-8">
          <Header />
        </div>
        <div className="py-16">
          <div className="container h-full">
            <Outlet />
          </div>
        </div>
        <SigninModal />
      </div>
    </UserContext.Provider>
  );
}

export default App;
