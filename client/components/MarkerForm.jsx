import React, { useContext} from 'react';
import useInput from "../hooks/UseInput";
import {MapDisplayContext} from '../context/MapDisplayContext'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TripDisplay from "./TripDisplay";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const Form = (props) => {
    const {mapDisplayState, setMapDisplayState} = useContext(MapDisplayContext);
    const [tripName, setTripName] = useInput('');
    const [tripDescription, setTripDescription] = useInput('');

    const handleSubmission = (e) => {
        e.preventDefault();
        const clicked = mapDisplayState.clickedMarker;
        const modifiedMarker = Object.assign(clicked, { tag: mapDisplayState.tagInfo || clicked.tag, description: mapDisplayState.descriptionInfo || clicked.description, });
        const markerList = [...mapDisplayState.markerList].filter((marker) => {
            return (marker.location.lat !== this.state.clickedMarker.location.lat || marker.location.lng !== this.state.clickedMarker.location.lng)
        });
        markerList.push(modifiedMarker);
        setMapDisplayState({
            ...mapDisplayState,
            markerList
        });
        const response = fetch('/updateMarker', {
            method: 'PATCH',
            body: JSON.stringify({ ...modifiedMarker, longitude: modifiedMarker.location.lng, latitude: modifiedMarker.location.lat }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('response for server for updating a marker',response);

    };
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <DriveEtaIcon />
                </Avatar>
                <Typography component="h3" variant="h5">
                    Create A Trip...
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmission}
                >
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="tripName"
                        value={tripName}
                        onChange={setTripName}
                        label="Trip Name"
                        name="tripName"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={tripDescription}
                        onChange={setTripDescription}
                        name="tripDescription"
                        label="Trip Description"
                        id="tripDescription"
                    />
                    <Link to={TripDisplay}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                            Create
                    </Button>
                    </Link>
                </form>
            </div>
        </Container>
    );
};
export default Form;
