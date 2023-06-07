import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Student = ({ student }) => {
  const [value, setValue] = useState([]);
  const navigate = useHistory();
  const handleRequest = (id) => {
    navigate.push(`/room/${id}`);
  };
  const modalBody = student.map((pat) => (
    <Fragment key={pat._id}>
      <h2 className="style-heading">
        <strong>{pat.studentname}</strong>
      </h2>

      <p className="profile-p2">
        <strong>Age: </strong>
        {pat.age}
      </p>
      <p className="profile-p2">
        <strong>Status: </strong>
        {pat.status}
      </p>
      <p className="profile-p2">
        <strong>Date: </strong>
        <Moment format="DD/MM/YYYY">{pat.date}</Moment>
      </p>
      <p className="profile-p2">
        <strong>Booking ID: </strong>
        {pat.bookingId}
      </p>
      <p className="profile-p2">
        <button
          onClick={handleRequest.bind(null, pat.bookingId)}
          className="btn btn-warning"
        >
          Approve Request
        </button>
      </p>
    </Fragment>
  ));
  const students = student.map((ptn) => (
    <tr key={ptn._id}>
      <td>{ptn.bookingId}</td>
      <td>{ptn.studentname}</td>
      <td>
        <Moment format="DD/MM/YYYY">{ptn.date}</Moment>
      </td>
      <td>
        <button
          onClick={() => setValue(ptn._id)}
          type="button"
          className="btn btn-info"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          View
        </button>
        <div
          className="modal fade "
          id="exampleModal"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  User Details
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="profiles">
                  <div className="profile-1">
                    <div className="profile-details">
                      <div className="appointment-p prfile-desc">
                        {modalBody.map((modal) =>
                          value === modal.key ? modal.props.children : ""
                        )}
                      </div>
                    </div>
                    <div className="desc-p profile-buttons">
                      <p className="profile-p2">
                        <strong>Description: </strong>
                        {ptn.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-info"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <div className="common-details">
        <h2 className="credentials">
          <strong>User Credentials</strong>
        </h2>
        <br />
        <div className="common-table">
          <div className="scroll-table">
            <table className="table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>User's Name</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{students}</tbody>
            </table>
          </div>
        </div>
      </div>
      <br />
    </Fragment>
  );
};

Student.propTypes = {
  student: PropTypes.array.isRequired,
};

export default connect(null)(Student);
