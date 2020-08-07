import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import './App.css';
import Login from "./Login"
import { getTokenFromResponse } from "./spotify"; 


const s = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useStateValue();


  useEffect(() => {
    // Set token
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      s.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      s.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });
    }
    }, [token, dispatch]);



  return (
    <div className="app">
     
      <Login />
    </div>
  );
}

export default App;
