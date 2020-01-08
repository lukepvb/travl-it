import React, { useContext} from 'react';
import useInput from "../hooks/UseInput";
import {MapDisplayContext} from '../context/MapDisplayContext'

const Form = (props) => {
    const {mapDisState, setMapDisState} = useContext(MapDisplayContext);
    const [tagInfo, setTagInfo] = useInput('');
    const [descriptionInfo, setDescriptionInfo] = useInput('');
    const [imgURL, setImgURL] = useInput('');


    const handleSubmission = (e) => {
        e.preventDefault();
        let clicked = mapDisState.clickedMarker;
        let modifiedMarker = Object.assign(clicked, { tag: mapDisState.tagInfo || clicked.tag, description: mapDisState.descriptionInfo || clicked.description, });
        let markerList = [...mapDisState.markerList].filter((marker) => {
            return (marker.location.lat !== this.state.clickedMarker.location.lat || marker.location.lng !== this.state.clickedMarker.location.lng)
        });
        markerList.push(modifiedMarker);
        setMapDisState({
            ...mapDisState,
            markerList
        });
        let response = fetch('/updateMarker', {
            method: 'PATCH',
            body: JSON.stringify({ ...modifiedMarker, longitude: modifiedMarker.location.lng, latitude: modifiedMarker.location.lat }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('response for server for updating a marker',response);
    };
    return (
        <div className="form">
            <form onSubmit={handleSubmission}>
                <label>
                    Description:
                    <textarea
                        id="description"
                        value={descriptionInfo}
                        name="descriptionInfo"
                        rows="10"
                        onChange={setDescriptionInfo}
                    >
                    </textarea>
                </label>
                <label>
                    Tag:
                    <input
                        type='text'
                        value={tagInfo}
                        name="tagInfo"
                        onChange={setTagInfo}
                    >
                    </input>
                </label>
                <label>
                    Image URL:
                    <input
                        type='file'
                        id='multi'
                        value={imgURL}
                        name="imgURL"
                        onChange={setImgURL}
                        multiple
                    >
                    </input>
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
};
export default Form;
