import { BrowserRouter, Routes, Route } from "react-router-dom";
import SessionProvider from "./context/SessionProvider";
import Navbar from "./components/Navbar";
import { routes } from "./router/routes";

function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <Navbar />
        <main className="container">
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </main>
      </SessionProvider>
    </BrowserRouter>
  );
}

export default App;