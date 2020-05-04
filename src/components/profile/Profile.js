import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';
import ProfileSkeleton from '../../util/ProfileSkeleton';
// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
// Redux Stuff
import {connect} from 'react-redux';
import {logoutUser,uploadImage} from '../../redux/actions/userActions';

const styles = (theme)=> ({
    ...theme.profileStyles
  }); 

class Profile extends Component {
    handleImageChange = (event)=>{
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image',image,image.name);
        this.props.uploadImage(formData);
    }
    handleEditPicture = ()=>{
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }
    handleLogout = ()=>{
        this.props.logoutUser();
    }
    render() {
        const {classes, user: {credentials: {handle, createdAt,imageUrl,bio,website,location},loading,authenticated}} = this.props;
        let ProfileMarkup = !loading ? (authenticated ? (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className="profile-image"/>
                    <input type="file" id="imageInput" onChange={this.handleImageChange} hidden="hidden"/>
                    <MyButton tip="Edit profile picture" onClick={this.handleEditPicture} btnClassName="button">
                        <EditIcon color="primary" />
                    </MyButton>
                </div>
                <hr/>
                <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">@{handle}</MuiLink>
                    <hr/>
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr/>
                    {location && (
                        <>
                            <LocationOn color="primary"/> <span>{location}</span>
                            <hr/>
                        </>
                    )}
                    {website && (<>
                        <LinkIcon color="primary" />
                        <a href={website} target="_blank" rel="noopener noreferrer">{` ${website}`}</a>
                        <hr/>                        
                    </>)}
                    <CalendarToday color="primary"/>{' '} <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
                <Tooltip title="Logout" placement="top">
                    <IconButton onClick={this.handleLogout}>
                        <KeyboardReturn color="primary" />
                    </IconButton>
                </Tooltip>
                <EditDetails />
            </div>
        </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">No profile found, please login again</Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">Signup</Button>
                </div>
            </Paper>
        )) : (<ProfileSkeleton />); 
        return ProfileMarkup;
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
};

const mapStateToProps = (state)=>({
    user: state.user
});

const mapActionsToProps = {logoutUser,uploadImage}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Profile));
