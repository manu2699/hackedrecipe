import React, { lazy, Suspense } from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import Loader from "react-loader-spinner";
import "./styles/main.css";

const HomePage = lazy(() => import("./pages/home"));
const DetailsPage = lazy(() => import("./pages/details"));

function App() {
  return (
    <Suspense fallback={
      <Loader className="centerPage" type="Oval" color="#000000" height={150} width={150} />
    }>
      <BrowserRouter>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/:id" component={DetailsPage} />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
