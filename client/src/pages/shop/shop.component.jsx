import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";

import Spinner from "../../components/spinner/spinner.component";

import { fetchDishesStart } from "../../redux/shop/shop.actions";

const DishesOverview = lazy(() =>
  import("../../components/dishes-overview/dishes-overview.component")
);

const ShopPage = ({ fetchDishesStart }) => {
  useEffect(() => {
    fetchDishesStart();
  }, [fetchDishesStart]);

  return (
    <div className="shop">
      <Suspense fallback={<Spinner />}>
        <DishesOverview />
      </Suspense>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchDishesStart: () => dispatch(fetchDishesStart())
});

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);
