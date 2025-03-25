import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Home } from "./pages/Home/Home";
import { Vehicles } from "./pages/Vehicles/Vehicles";
import { Navbar } from "./Components/Navbar/Navbar";
import { Login } from "./pages/Login/Login";
import { User } from "./pages/User/User";
import { About } from "./pages/About/About";
import { Footer } from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="480018039218-9urqijehdp4pb99g27ejvc4ro42q2a60.apps.googleusercontent.com">
        <Provider store={store}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="/veiculos" element={<Vehicles />} />
              <Route path="/login" element={<Login />} />;
              <Route path="/perfil" element={<User />} />
              <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
          </Router>
        </Provider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
