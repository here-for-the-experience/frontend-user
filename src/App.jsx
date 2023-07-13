import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import auth from "./auth";
import { useGlobalState } from "./Context";
import { useEffect, useState } from "react";

let didInit = false;

function App() {
  const [user, setUser] = useGlobalState("user");
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
  const [loading, setLoading] = useState(true);
  const getData = (counter) => {
    if (counter > 2) setLoading(false);
    if (counter < 2) {
      auth
        .get("/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((profileResponse) => {
          console.log(profileResponse);
          let toUpdateKeys = [
            "id",
            "name",
            "email",
            "address",
            "phone",
            "role_id",
            "verified",
          ];
          let profile = profileResponse.data;
          Object.keys(user).forEach((k) => {
            if (toUpdateKeys.includes(k)) {
              user[k] = profile[k];
            }
          });
          setUser(user);
          setIsLoggedIn(true);
          setLoading(false);
        })
        .catch((err) => {
          try {
            if (err.response.status === 401) {
              getData(counter + 1);
            }
          } catch {
            console.log("Error loading profile", err);
            setLoading(false);
          }
          setLoading(false);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      getData(0);
    }
  }, []);

  if (loading) return <br />;
  else
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="verify" element={<Verify />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;
