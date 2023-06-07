import React, { useEffect, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import LoginUser from "./components/auth/LoginUser";
import LoginEducator from "./components/auth/LoginEducator";
import EducatorRegister from "./components/auth/EducatorRegister";
import UserRegister from "./components/auth/UserRegister";
import Dashboard from "./components/dashboard/Dashboard";
import AddEducation from "./components/profile-forms/AddEducation";
import AddExperience from "./components/profile-forms/AddExperience";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import PrivateEducatorRoute from "./components/routing/PrivateEducatorRoute";
import Appointment from "./components/user/Appointments";
import AppointmentForm from "./components/bookappointment/AppointmentForm";
import PrivateUserRoute from "./components/routing/PrivateUserRoute";
import RoomPage from "./components/Room/RoomPage";
import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authUser";
import { loadEducator } from "./actions/authEducator";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadEducator());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Alert />
            <Switch>
              <Route exact path="/loginUser" component={LoginUser} />
              <Route exact path="/loginEducator" component={LoginEducator} />
              <Route
                exact
                path="/registerEducator"
                component={EducatorRegister}
              />
              <Route exact path="/registerUser" component={UserRegister} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/educator/:id" component={Profile} />
              {/* <PrivateUserRoute
                exact
                path="/room/:roomid"
                component={RoomPage}
              /> */}
              <PrivateEducatorRoute
                exact
                path="/dashboard"
                component={Dashboard}
              />
              <PrivateEducatorRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
              <PrivateEducatorRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateEducatorRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateEducatorRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateUserRoute
                exact
                path="/appointment"
                component={Appointment}
              />
              <PrivateUserRoute
                exact
                path="/appointment/:id"
                component={AppointmentForm}
              />
              <Route exact path="/room/:roomid" component={RoomPage} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
