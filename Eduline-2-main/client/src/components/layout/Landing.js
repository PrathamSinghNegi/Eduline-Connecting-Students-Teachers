import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import '../../App.css';

const Landing = ({isEducatorAuthenticated, isUserAuthenticated}) => {
    if(isEducatorAuthenticated){
        return <Redirect to="/dashboard" />
    } else if(isUserAuthenticated) {
        return <Redirect to="/appointment" />
    }

    return (
        <Fragment>
            <section id="landing">
                <div className="container">
                    <div className="heading">
                        <h1 className="main-heading">Find Your Best Educator &</h1>
                        <h1 className="main-heading">Book Your <span className="main-span">Appointment.</span></h1>
                    </div>
                    <div className="signup">
                        <div className="educator-signup">
                            <h2 className=" item heading-sub"><strong>For Educators</strong></h2>
                            <p className="item description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel itaque quae delectus veritatis consequatur hic!</p>
                            <Link to="/registerEducator" type="button" className="item btn btn-info">Sign Up</Link>
                        </div>
                        <div className="user-signup">
                            <h2 className="item heading-sub"><strong>For Users</strong></h2>
                            <p className="item special description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel itaque quae delectus veritatis consequatur hic!</p>
                            <Link to="/registerUser" className="item btn btn-outline-info">Sign Up</Link>
                        </div>
                    </div>
                    <br />
                    <div className="img">
                        <div className="img-1">
                            <img src={require("../../img/undraw_doctor_kw5l.svg")}  />
                        </div>
                    </div>
                </div>
                <br />
            </section>
        </Fragment>
    );
};
Landing.propTypes = {
    isEducatorAuthenticated: PropTypes.bool.isRequired,
    isUserAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isEducatorAuthenticated: state.authEducator.isEducatorAuthenticated,
    isUserAuthenticated: state.authUser.isUserAuthenticated
});

export default connect(mapStateToProps)(Landing);
