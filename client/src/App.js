import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Header from "./components/header/header.component";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const AuthPage = lazy(() => import("./pages/auth/auth.component"));

const App = () => (
  <>
    <Header />
    <Switch>
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/auth" component={AuthPage} />
        </Suspense>
      </ErrorBoundary>
    </Switch>
  </>
);

export default App;
