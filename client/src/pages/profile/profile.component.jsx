import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import "./profile.scss";

const ProfilePage = ({ currentUser: { displayName, email, phone } }) => {
  const [userInfo, setInfo] = useState({
    editedPhone: ""
  });

  const { editedPhone } = userInfo;

  const handleChange = event => {
    const { value } = event.target;
    setInfo({ ...userInfo, editedPhone: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
  };

  return (
    <div className="profile">
      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={displayName}
          label="Nombre"
          className={displayName ? "shrink" : ""}
          readOnly
          disabled
        />
        <FormInput
          name="email"
          type="email"
          value={email}
          label="Correo electrónico"
          className={email ? "shrink" : ""}
          readOnly
          disabled
        />
        <FormInput
          name="phone"
          type="phone"
          defaultValue={phone}
          label="Número teléfonico"
          className={phone ? "shrink" : ""}
          onChange={handleChange}
        />
        <div className="buttons">
          <CustomButton type="submit">Actualizar información</CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(
  mapStateToProps,
  null
)(ProfilePage);
