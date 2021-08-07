import React from "react";
import PropTypes from "prop-types";
import { SelectBox, TextBox } from "devextreme-react";

UserFilterBar.propTypes = {
  filters: PropTypes.object,
  onFiltersChanged: PropTypes.func,
};

function UserFilterBar({ filters, onFiltersChanged }) {
  let timeout;
  const status = [
    { label: "All", value: "" },
    { label: "Active", value: "active" },
    { label: "Block", value: "block" },
  ];
  const role = [
    { label: "All", value: "" },
    { label: "Basic User", value: "basic user" },
    { label: "Admin", value: "admin" },
  ];
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
        items={status}
        displayExpr="label"
        valueExpr="value"
        placeholder="Status"
        onValueChange={handleStatusChange}
      />
      <SelectBox
        items={role}
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
