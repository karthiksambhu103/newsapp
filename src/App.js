import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 8;
  const apiKey = process.env.REACT_APP_NEWS_API || "510d451fc3abcc656464aca3d734ee957174ebf6"; // Fetch API key from .env

  // const [progress, setProgress] = useState(0);

  return (
    <Router>
      <NavBar />
      {/* <LoadingBar height={3} color="#f11946" progress={progress} /> */}
      <Routes>
        <Route exact path="/" element={<News apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />} />
        <Route exact path="/business" element={<News apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" />} />
        <Route exact path="/entertainment" element={<News apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
        <Route exact path="/general" element={<News apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />} />
        <Route exact path="/health" element={<News apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" />} />
        <Route exact path="/science" element={<News apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" />} />
        <Route exact path="/sports" element={<News apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" />} />
        <Route exact path="/technology" element={<News apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" />} />
      </Routes>
    </Router>
  );
};

export default App;
