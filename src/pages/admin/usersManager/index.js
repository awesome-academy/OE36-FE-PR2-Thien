import "./style.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN_ROLE } from "constants/common";
import { Redirect, useHistory } from "react-router-dom";
import { adminRoutes } from "routers/routesConfig";
import apiUser from "apis/tasks/apiUser";
import { DataGrid } from "devextreme-react";
import {
  Column,
  Editing,
  EmailRule,
  Lookup,
  Pager,
  PatternRule,
  RangeRule,
  RequiredRule,
} from "devextreme-react/data-grid";
import { PHONE_NUMBER_REGEX } from "constants/regex";
import { userAction } from "app/sagas/users/userActions";
import UserFilterBar from "./components/filterBar";
import { error, warning } from "react-toastify-redux";
import { ERROR_NOTIFICATION } from "constants/notificationMessage";
import Paging from "../../../components/paging";
import { logout } from "app/features/account/accountSlice";

function UsersManager() {
  const maxDate = new Date().setFullYear(new Date().getFullYear() - 12);
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilter] = useState({ _page: 1, _limit: 10 });
  const account = useSelector((state) => state.account);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      apiUser.get(filters).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setUsers(response.data);
          setTotal(response.total);
        } else if (response.status === 401) {
          dispatch(logout());
          history.replace(adminRoutes.login.path);
        } else {
          dispatch(warning(response.data || ERROR_NOTIFICATION));
        }
      });
    } catch (e) {
      dispatch(error(e));
    }
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilter(newFilters);
  };

  const handleAddUser = (event) => {
    dispatch({ type: userAction.ADD_USER, payload: event.data });
  };

  const handleUpdateUser = (event) => {
    dispatch({ type: userAction.UPDATE_USER, payload: event.data });
  };
  const handleRemoveUser = (event) => {
    dispatch({ type: userAction.REMOVE_USER, payload: event.data.id });
  };
  return (
    <section className="users">
      {account.role !== ADMIN_ROLE && <Redirect to={adminRoutes.login} />}
      <header className="users__header">
        <UserFilterBar
          filters={filters}
          onFiltersChanged={handleFilterChange}
        />
      </header>
      <main className="users__main">
        <DataGrid
          dataSource={users}
          allowColumnResizing={true}
          showBorders={true}
          onRowInserted={handleAddUser}
          onRowUpdated={handleUpdateUser}
          onRowRemoved={handleRemoveUser}
        >
          <Column
            dataField="id"
            allowEditing={false}
            width={80}
            fixed={true}
            alignment="center"
          />
          <Column dataField="name">
            <RequiredRule />
          </Column>
          <Column dataField="email">
            <RequiredRule />
            <EmailRule />
          </Column>
          <Column dataField="password">
            <RequiredRule />
          </Column>
          <Column dataField="phoneNumber" title="Phone number">
            <PatternRule pattern={PHONE_NUMBER_REGEX} />
          </Column>
          <Column dataField="dateOfBirth" dataType="date" format="dd/MM/yyyy">
            <RequiredRule />
            <RangeRule max={maxDate} />
          </Column>
          <Column dataField="status">
            <Lookup dataSource={["active", "block"]} />
          </Column>
          <Column dataField="role">
            <Lookup dataSource={["basic user", "admin"]} />
          </Column>
          <Editing
            allowUpdating={true}
            allowAdding={true}
            allowDeleting={true}
          />
          <Pager visible={false} />
        </DataGrid>
      </main>
      <footer className="users__footer">
        <Paging
          total={total}
          filters={filters}
          length={users.length}
          onFiltersChanged={handleFilterChange}
          content="users"
        />
      </footer>
    </section>
  );
}

export default UsersManager;
