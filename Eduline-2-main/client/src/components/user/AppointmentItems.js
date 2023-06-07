import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteAppointment } from "../../actions/appointment";

const AppointmentItems = ({ appointment, deleteAppointment }) => {
  const navigate = useHistory();

  const handleMeeting = (id) => {
    navigate.push(`/room/${id}`);
  };
  const appointments = appointment.map((appnt) => (
    <div key={appnt.id} className="profile-1">
      <div className="profile-img">
        <Link to={`/educator/${appnt.educator}`}>
          <img src={appnt.avatar} alt="" />
        </Link>
        <h5 className="heading-sub">
          <strong>{appnt.name}</strong>
        </h5>
      </div>
      <div className="profile-details">
        <div className="appointment-p profile-desc">
          <h2 className="profile-heading">
            <strong>{appnt.students}</strong>
          </h2>
          <p className="profile-p2">
            <strong>Age: </strong>
            {appnt.age}
          </p>
          <p className="profile-p2">
            <strong>Status: </strong>
            {appnt.status}
          </p>
          <p className="profile-p2">
            <strong>Date: </strong>
            <Moment format="DD/MM/YYYY">{appnt.date}</Moment>
          </p>
          <p className="profile-p2">
            <strong>Booking ID: </strong>
            {appnt.bookingId}
          </p>
          <p className="profile-p2">
            <button
              onClick={handleMeeting.bind(null, appnt.bookingId)}
              className="btn btn-outline-primary"
            >
              Join Meeting
            </button>
          </p>
        </div>
      </div>
      <div className="desc-p">
        <p className="profile-p2">
          <strong>Description: </strong>
          {appnt.description}
        </p>

        <button
          onClick={() => deleteAppointment(appnt._id)}
          type="button"
          className="profile-btn btn btn-danger"
        >
          Cancel
        </button>
      </div>
    </div>
  ));
  return <Fragment>{appointments}</Fragment>;
};

AppointmentItems.propTypes = {
  appointment: PropTypes.array.isRequired,
  deleteAppointment: PropTypes.func.isRequired,
};

export default connect(null, { deleteAppointment })(AppointmentItems);
