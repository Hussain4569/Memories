
import React from "react";
import { Container } from "@mui/material";

import { BrowserRouter, Route, Routes } from "react-router-dom";


import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Auth from "./components/Auth";
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {

  
  return (
    <GoogleOAuthProvider clientId="397462577916-cff0hltbiskngsdd20tai3n9kiihafdf.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth='lg'>
          <Navbar />

          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/auth" exact element={<Auth />} />
          </Routes>
          
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
