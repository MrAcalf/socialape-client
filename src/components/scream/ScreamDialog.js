import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

//Redux Stuff
import {connect} from 'react-redux';
import {getScream, clearErrors} from '../../redux/actions/dataActions';

const styles = theme => ({
    ...theme.profileStyles,   
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover',
    },
    dialogContent: {
        padding: 20,  
        overflowY: 'auto',
        overflowX: 'hidden'  
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    },    
});

class ScreamDialog extends Component{
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    };
    componentDidMount()
    {
        if(this.props.openDialog)
        {
            this.handleOpen();
        }
    }
    handleOpen = ()=>{
        let oldPath = window.location.pathname;
        const {userHandle,screamId} = this.props;
        const newPath = `/users/${userHandle}/scream/${screamId}`;
        if(oldPath === newPath) oldPath = `/users/${userHandle}`;
        window.history.pushState(null,null,newPath);
        this.setState({
            open: true,
            oldPath,
            newPath
        });
        this.props.getScream(this.props.screamId);
    }
    handleClose = ()=>{
        window.history.pushState(null,null,this.state.oldPath);
        this.setState({
            open: false
        });
        this.props.clearErrors();
    }
    render()
    {
        const {classes, scream:{screamId,body,createdAt,likeCount,commentCount,userImage,userHandle,comments},UI:{loading}} = this.props;
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
            <Grid container spacing={10}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton screamId={screamId} comments={comments}/>
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>                        
                    </MyButton>
                    <span>{commentCount} comments</span>
                </Grid>
                <hr className={classes.visibleSeparator} />
                <CommentForm screamId={screamId} />
                <Comments comments={comments} />
            </Grid>
        );
        return(
            <>
                <MyButton onClick={this.handleOpen} tip="Expand Scream" btnClassName={classes.expandButton}>
                    <UnfoldMore color="primary" />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="close" onClick={this.handleClose} btnClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </>
        );
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = state=>({
    scream: state.data.scream,
    UI: state.UI
});

const mapActionToProps = {
    getScream,clearErrors
};

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(ScreamDialog));




