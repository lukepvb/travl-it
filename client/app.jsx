
import React from 'react';
import { Component } from "react";
import {render} from 'react-dom';
import ReactDOM from 'react-dom';
// import mapDisplay from './components/testMapDisplay.jsx'
import MapDisplay from './components/mapDisplay.jsx';
import MarkerForm from './components/markerForm.jsx';
import ImageDisplay from './components/imageDisplay.jsx';


//this one renders ya know the app.

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgList: [],
            userWhiteList: [],
            markerList: [{tag: 'food', location: {lat: 45, lng: 45}, description: 'this tag is a test of tags'}],
            locationInfo: '',
            tagInfo: '',
            descriptionInfo: '',
            imgURL: '',
            searchMarkerTag: '',
            savedMarkerTag: '',
            whiteListUserInfo: '',

    }
    this.onChange = this.onChange.bind(this);

            clickedMarker: '',


    }
    this.clickMap = this.clickMap.bind(this);
    this.clickMarker = this.clickMarker.bind(this);
    }
    clickMarker(e) {
        // console.log(e)
        console.log( "Latitude: "+e.latLng.lat()+" "+", longitude: "+e.latLng.lng())
        let clickedMarker = [...this.state.markerList];
        clickedMarker = clickedMarker.filter((marker) => {
            return (marker.location.lat == e.latLng.lat() && marker.location.lng == e.latLng.lng())
        })
        this.setState({clickedMarker: clickedMarker})
        console.log('current saved marker' , this.state.clickedMarker)
    }
    clickMap(e) {
        
        console.log( "Latitude: "+e.latLng.lat()+" "+", longitude: "+e.latLng.lng())
        let newMarker = {tag:'test', location: {lat: e.latLng.lat(), lng:e.latLng.lng()}, description: 'this is testing adding marker'}
        let newMarkerList = [...this.state.markerList]
        newMarkerList.push(newMarker);
        console.log(newMarkerList)
        this.setState({markerList: newMarkerList})

        ///works but in reality we should be doing fetch/post here instead of changing state

    }
    onChange(e) {
      //takes typed information and sets relevant state
      // console.log(e.target.value);
      this.setState({tagInfo: e.target.value},()=>{
        console.log('after setState', this.state.tagInfo);
      })
    }
    onSubmit() {
        //does stuff on forms submits
        //take the stored information and update the state
    }
    render() {
        return (
            <div id="map">This is the app.jsx div
            <ImageDisplay/>

            <MapDisplay markerList={this.state.markerList}/>
            <MarkerForm tagInfo = {this.state.tagInfo} onChange ={this.onChange} />

            <MapDisplay clickedMarker={this.state.clickedMarker} clickMarker={this.clickMarker} clickMap={this.clickMap} markerList={this.state.markerList}/>
            <MarkerForm/>

            </div>
            

        )
    }
}