import React, { Component } from "react";
import "./App.css";
import { SidebarContainer } from "./containers/SidebarContainer";
import { MessagesListContainer } from "./containers/MessagesListContainer";
import { AddMessageContainer } from "./containers/AddMessageContainer";

class App extends Component {
  render() {
    return (
      <div id="container">
        <SidebarContainer />
        <section id="main">
          <MessagesListContainer />
          <AddMessageContainer />
        </section>
      </div>
    );
  }
}

export default App;
