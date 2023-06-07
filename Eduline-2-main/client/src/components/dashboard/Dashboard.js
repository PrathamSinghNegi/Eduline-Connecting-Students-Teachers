import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import Experience from './Experience';
import Education from './Education';
import Student from './Student';
import Review from './Review';
import {getCurrentProfile, deleteAccount} from '../../actions/profile';
import {Link} from 'react-router-dom';


const Dashboard = ({
        getCurrentProfile, 
        deleteAccount, 
        authEducator: {educator}, 
        profile: {profile, loading}
    }) => {
        useEffect(() => {
            getCurrentProfile();
        }, [getCurrentProfile]);    
        
    return loading && profile == null ? (
        <Spinner />
    ) : (
        <Fragment>
                <section id="dashboard">
                    <div className="container">
                        <div className="heading-common">
                            <h1><strong>Dashboard</strong></h1>
                            <h2 className="welcome-heading"><i className="fas fa-user-md"></i> Welcome {educator && educator.name}</h2>
                        </div>
                        <br />
                        {profile !== null ? (
                            <Fragment>
                                {profile.students !== null && profile.students.length > 0 ? 
                                    (
                                        <Student student={profile.students} />
                                    ) : (
                                        <h5 style={{color: "#738f93"}}>No Appointments yet..</h5>
                                    )
                                }
                                <Review student={profile.students} review={profile.review} />
                                <Experience experience={profile.experience} />
                                <Education education={profile.education} />
                                <button 
                                    onClick={() => deleteAccount()}
                                    type="button" 
                                    className="btn btn-danger"><i className="fas fa-user-minus"></i> Delete My Account
                                </button>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <p>You have not any Profile add your Profile..</p>
                                <Link to='/create-profile' className="btn btn-info">
                                    Create Profile
                                </Link>
                            </Fragment>  
                    )}
                    </div>
                </section>
                <br />
        </Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    authEducator: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    authEducator: state.authEducator,
    profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);
