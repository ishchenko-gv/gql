import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <div className="bg-gray-800 py-8">
        <Header />
      </div>

      <div className="py-16">
        <div className="container h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
