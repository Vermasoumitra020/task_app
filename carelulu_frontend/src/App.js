import logo from './logo.svg';
import './App.css';

import React from 'react';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Content from "./components/layout/Content";
import Layout from "./components/layout/Layout";
import Router from "./router/Router";
import {BrowserRouter} from "react-router-dom";
import AuthContext from "./store/auth-context";

function App() {
    const savedUser = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = React.useState(savedUser);

  return (
      <AuthContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
              <Layout>
                  <Header />
                  <Content>
                      <Router />
                      {/*<TaskScreen />*/}
                  </Content>
                  <Footer />
              </Layout>
          </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;
