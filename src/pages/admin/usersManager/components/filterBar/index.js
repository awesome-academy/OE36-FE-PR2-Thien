import React from "react";
import PropTypes from "prop-types";
import { SelectBox, TextBox } from "devextreme-react";
import { ROLE_DATA, USER_STATUS_DATA } from "constants/common";

UserFilterBar.propTypes = {
  filters: PropTypes.object,
  onFiltersChanged: PropTypes.func,
};

function UserFilterBar({ filters, onFiltersChanged }) {
  let timeout;
  const handleStatusChange = (status) => {
    onFiltersChanged({
      ...filters,
      status: status,
    });
  };
  const handleRoleChange = (role) => {
    onFiltersChanged({
      ...filters,
      role: role,
    });
  };

  const handleNameChange = (username) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      onFiltersChanged({
        ...filters,
        name_like: username.event.target.value,
      });
    }, 500);
  };
  return (
    <div className="filter-bar">
      <SelectBox
        items={USER_STATUS_DATA}
        displayExpr="label"
        valueExpr="value"
        placeholder="Status"
        onValueChange={handleStatusChange}
      />
      <SelectBox
        items={ROLE_DATA}
        displayExpr="label"
        valueExpr="value"
        placeholder="Role"
        onValueChange={handleRoleChange}
      />
      <TextBox onKeyUp={handleNameChange} placeholder="User Name" />
    </div>
  );
}

export default UserFilterBar;
