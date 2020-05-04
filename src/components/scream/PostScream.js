import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
//Redux Stuff
import {connect} from 'react-redux';
import {postScream,clearErrors} from '../../redux/actions/dataActions';
import MyButton from '../../util/MyButton';

const styles = theme => ({
    ...theme.formStyles,
    submitButton: {
        position: 'relative',
        marginBottom: 10 ,
        float: 'right'     
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    }
});

class PostScream extends Component{
    state = {
        open: false,
        body: '',
        errors: {}
    };  
    handleOpen = ()=>{
        this.setState({open:true});
    }
    handleClose = ()=>{
        this.props.clearErrors();
        this.setState({open:false,errors:{}});
    }
    handleChange = (event)=>{
        this.setState({[event.target.name]:event.target.value,errors:{}});
    }
    handleSubmit = (event)=>{
        event.preventDefault();
        if(this.state.body.length < 1) 
        {
            this.setState({
                errors: {
                    body: 'Your Scream is empty!'
                }
            })
        }else{
            this.props.postScream({body: this.state.body});
            this.setState({open:false});
        }
    }
    render()
    {
        const {errors} = this.state;
        const {classes,UI:{loading}} = this.props;
        return(
            <>
                <MyButton onClick={this.handleOpen} tip="Post a Scream!">
                    <AddIcon />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} btnClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>Post a new scream</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField 
                            name="body" 
                            type="text" 
                            label="Scream" 
                            multiline 
                            rows="3" 
                            placeholder="Scream at your fellow apes." 
                            error={errors.body ? true : false}
                            helperText={errors.body} 
                            className={classes.textField}
                            onChange={this.handleChange}
                            fullWidth
                            />
                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                Submit
                            {loading && (<CircularProgress size={30} className={classes.progressSpinner} />)}      
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </>
        );
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state=>({
    UI: state.UI
});

export default connect(mapStateToProps,{postScream,clearErrors})(withStyles(styles)(PostScream));