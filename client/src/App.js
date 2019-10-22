import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Header from "./components/header/header.component";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));

const App = () => (
  <>
    <Header />
    <Switch>
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Route exact path="/" component={HomePage} />
        </Suspense>
      </ErrorBoundary>
    </Switch>
  </>
);

export default App;
