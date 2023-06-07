import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addAppointment } from "../../actions/appointment";
import { Link } from "react-router-dom";

const Form = ({ profile, educatorId, history, addAppointment }) => {
  const [formData, setFormData] = useState({
    studentname: "",
    age: "",
    status: "",
    date: "",
    description: "",
  });

  const { studentname, age, status, date, description } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  return (
    <Fragment>
      <br />
      <div className="heading-common">
        <h1>
          <strong>Book Appointment</strong>
        </h1>
        <p className="lead">
          Provide your details correctly and book your appointment.
        </p>
        <div className="appointment-educator">
          <img
            className="round-img appointment-img"
            src={profile.avatar}
            alt=""
          />
          <p className="lead">
            <strong>{profile.name}</strong>
          </p>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addAppointment(educatorId, formData, history);
        }}
      >
        <small>* = required field</small>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="* User name"
            name="studentname"
            value={studentname}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="* Age"
            name="age"
            value={age}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="* Status"
            name="status"
            value={status}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Status like profession (eg. student, job etc)
          </small>
        </div>
        <h6>Date</h6>
        <div className="form-group">
          <input
            type="date"
            className="form-control"
            name="date"
            value={date}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="*Description"
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">
            Tell us about the what you want from the Educator.
          </small>
        </div>
        <input type="submit" value="Submit" className="btn btn-info" />{" "}
        <Link
          to="/profiles"
          type="submit"
          className="btn btn-outline-secondary"
        >
          Go Back
        </Link>
      </form>
      <br />
    </Fragment>
  );
};

Form.propTypes = {
  addAppointment: PropTypes.func.isRequired,
};

export default connect(null, { addAppointment })(Form);
