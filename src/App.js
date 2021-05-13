import Store from "./context/Store";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import "antd/dist/antd.css";
import {BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return <Router>
    <Store>
      <Route path="/" exact component={Home}/>
      <Route path="/chat" exact component={Chat}/>
    </Store>
  </Router>
}

export default App;
