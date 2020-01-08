
import React from 'react';
import { Component } from "react";
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
// import mapDisplay from './components/testMapDisplay.jsx'
import MapDisplay from './components/mapDisplay.jsx';
import MarkerForm from './components/markerForm.jsx';
import ImageDisplay from './components/imageDisplay.jsx';
import MarkerInfoBox from './components/markerInfoBox.jsx';
import style from './style.css'
import { Animated } from 'react-animated-css';

//this one renders ya know the app.
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Put in Context
      markerList: [{
        tag: 'food', location: { lat: 45, lng: 45 }, description: 'this tag is a test of tags', imgURL: ['https://res.cloudinary.com/travelappcloud/image/upload/v1578338991/g7e9d1it4zaxsr4ahatz.png']
      }],
      locationInfo: '',
      searchTag: '',
      savedTag: '',
      whiteListUserInfo: '',
      clickedMarker: '',
      images: [],
    };
    this.onPicChange = this.onPicChange.bind(this);
    this.clickMap = this.clickMap.bind(this);
    this.clickMarker = this.clickMarker.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.buttonSubmit = this.buttonSubmit.bind(this);
  }

  onPicChange(e) {
    const files = Array.from(e.target.files)
    // this.setState({ uploading: true })

    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })
    console.log(formData)
    const addtoSQL = 'https://res.cloudinary.com/travelappcloud/image/upload/'

    fetch('/addImage', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        let newURL = [res];
        let clicked = this.state.clickedMarker;
        let oldImgURL = clicked.imgURL;


        let modifiedMarker = Object.assign(clicked, { imgURL: newURL });

        fetch('/updateMarker', {
          method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify({ ...modifiedMarker, longitude: modifiedMarker.location.lng, latitude: modifiedMarker.location.lat }), // body data type must match "Content-Type" header
          headers: {
            'Content-Type': 'application/json'
          },
        })
      })
      .then(images => {
        this.setState({
          images
        }, (images) => {
        })
      })

  }
  // END OF ON-PIC-CHANGE

  clickMarker(e) {
    let clickedMarker = [...this.state.markerList];
    clickedMarker = clickedMarker.filter((marker) => {
      return (marker.location.lat == e.latLng.lat() && marker.location.lng == e.latLng.lng())
    });
    this.setState({ clickedMarker: clickedMarker[0] })
  }

  clickMap(e) {
    let newMarker = { tag: '', location: { lat: e.latLng.lat(), lng: e.latLng.lng() }, description: '' }
    let newMarkerList = [...this.state.markerList]
    newMarkerList.push(newMarker);

    this.setState({ markerList: newMarkerList })
    fetch('/addMarker', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify({ ...newMarker, longitude: newMarker.location.lng, latitude: newMarker.location.lat, savedTag: '' }),
      headers: {
        'Content-Type': 'application/json'
      },

    })
      .then((res) => {
        console.log('inside post then', res)
      })

    ///works but in reality we should be doing fetch/post here instead of changing state

  }

  buttonSubmit() {
    this.setState({ savedTag: this.state.searchTag, searchTag: '' }, () => {
      console.log(`savedTag`, this.state.savedTag);
      console.log(`searchTag`, this.state.searchTag);

    });
  }
  onSubmit(e) {
    //does stuff on forms submits
    //take the stored information and update the state
    e.preventDefault();
    let clicked = this.state.clickedMarker;
    let imgProps = '';


    let modifiedMarker = Object.assign(clicked, { tag: this.state.tagInfo || clicked.tag, description: this.state.descriptionInfo || clicked.description, });

    let newMarkerList = [...this.state.markerList];
    newMarkerList = newMarkerList.filter((marker) => {
      return (marker.location.lat !== this.state.clickedMarker.location.lat || marker.location.lng !== this.state.clickedMarker.location.lng)
    })
    newMarkerList.push(modifiedMarker);
    this.setState({ tagInfo: '', descriptionInfo: '', imgURL: '', clickedMarker: '', markerList: newMarkerList }, () => {
    });

    fetch('/updateMarker', {
      method: 'PATCH',
      body: JSON.stringify({ ...modifiedMarker, longitude: modifiedMarker.location.lng, latitude: modifiedMarker.location.lat }),
      headers: {
        'Content-Type': 'application/json'
      },

    })
      .then((res) => {
        console.log('inside patch then', res)
      })
  }
  // END OF ON SUBMIT

  componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      .then((markers) => {
        console.log('inside this.componentDidMount res:', markers)
        let newMarkerList;
        markers = markers.markersList;

        newMarkerList = [...this.state.markerList]
        for (let i = 0; i < markers.length; i += 1) {
          let currMarker = markers[i];
          currMarker.location = { lat: parseInt(currMarker.latitude), lng: parseInt(currMarker.longitude) }
          console.log('current Marker is ', currMarker)
          if (currMarker.imgURL) {
            currMarker.imgURL = currMarker.imgURL.concat(currMarker.urls)
          }
          else {
            currMarker.imgURL = [currMarker.urls]
          }
          newMarkerList.push(currMarker)
        }

        return this.setState({
          markerList: newMarkerList,
        });
      })
      .catch(err => console.log('users.componentDidMount: get users: ERROR: ', err));
  }
  render() {
    let markerForm;
    let markerInfoBox;
    let imageDisplay;
    if (this.state.clickedMarker) {
      markerForm = <MarkerForm onPicChange={this.onPicChange} imgURL={this.state.imgURL} tagInfo={this.state.tagInfo} locationInfo={this.state.locationInfo} descriptionInfo={this.state.descriptionInfo} onSubmit={this.onSubmit} />
    }

    if (this.state.clickedMarker.tag || this.state.clickedMarker.description) {
      markerInfoBox = <MarkerInfoBox clickedMarker={this.state.clickedMarker} />
    }
    if (this.state.clickedMarker) {
      imageDisplay = <ImageDisplay clickedMarker={this.state.clickedMarker} />
    }
    return (
      <div id="map">

        {/* header / title */}
        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
          <h1 className="title">
            Dear Travel Diary...
              </h1>
        </Animated>

        {/* map display */}
        <div className="centerArea">
          <div className="mapDisplay">
            <MapDisplay clickedMarker={this.state.clickedMarker} clickMarker={this.clickMarker} clickMap={this.clickMap} markerList={this.state.markerList} onChange={this.onChange} searchTag={this.state.searchTag} buttonSubmit={this.buttonSubmit} savedTag={this.state.savedTag} />
          </div>
          <div className="infoBox">

            {/* Tag and description to the right of the map */}
            <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible={true}>
              {markerInfoBox}
            </Animated>

            {imageDisplay}
          </div>
        </div>
        {markerForm}
      </div>
    )
  }
}
