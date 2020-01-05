
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
            markerList: [{tag: 'food', location: {lat: 45, lng: 45}, description: 'this tag is a test of tags', imgURL: 'this is a URL '}],
            locationInfo: '',
            tagInfo: '',
            descriptionInfo: '',
            imgURL: '',
            searchMarkerTag: '',
            savedMarkerTag: '',
            whiteListUserInfo: '',
            clickedMarker: ''
    }
    this.onChange = this.onChange.bind(this);
    this.clickMap = this.clickMap.bind(this);
    this.clickMarker = this.clickMarker.bind(this);
    this.onSubmit= this.onSubmit.bind(this);
    }
    
    
    clickMarker(e) {
        // console.log(e)
        // console.log( "Latitude: "+e.latLng.lat()+" "+", longitude: "+e.latLng.lng())
        let clickedMarker = [...this.state.markerList];
        clickedMarker = clickedMarker.filter((marker) => {
            return (marker.location.lat == e.latLng.lat() && marker.location.lng == e.latLng.lng())
        })
        this.setState({clickedMarker: clickedMarker[0]})
        // console.log('current saved marker' , this.state.clickedMarker)
    }
    clickMap(e) {
        
        // console.log( "Latitude: "+e.latLng.lat()+" "+", longitude: "+e.latLng.lng())
        let newMarker = {tag:'test', location: {lat: e.latLng.lat(), lng:e.latLng.lng()}, description: 'this is testing adding marker'}
        let newMarkerList = [...this.state.markerList]
        newMarkerList.push(newMarker);
        // console.log(newMarkerList)
        this.setState({markerList: newMarkerList})

        ///works but in reality we should be doing fetch/post here instead of changing state

    }
    onChange(e) {
      //takes typed information and sets relevant state
      // console.log(e.target.value);
      this.setState({[e.target.name]: e.target.value},()=>{
          
        // console.log('after setState onChange', this.state.markerList);
      })
    }
    onSubmit(e) {
        //does stuff on forms submits
        //take the stored information and update the state   
        e.preventDefault();     
        console.log('before modified marker' ,this.state.descriptionInfo)
        const modifiedMarker = Object.assign(this.state.clickedMarker, {tag: this.state.tagInfo, description: this.state.descriptionInfo , imgURL: this.state.imgURL});
        console.log('in submit showing modMarker' , modifiedMarker, modifiedMarker.description)
        let newMarkerList = [...this.state.markerList];
        newMarkerList = newMarkerList.filter((marker) => {
          return (marker.location.lat !== this.state.clickedMarker.location.lat || marker.location.lng !== this.state.clickedMarker.location.lng)
        })
        newMarkerList.push(modifiedMarker);
        this.setState({tagInfo: '', descriptionInfo: '', imgURL: '', clickedMarker: '', markerList: newMarkerList}, ()=>{
          console.log(`after setState for onsubmit`,this.state);
        });
    }
    render() {
      let markerForm;
      if(this.state.clickedMarker){
        markerForm = <MarkerForm imgURL={this.state.imgURL} tagInfo = {this.state.tagInfo} locationInfo={this.state.locationInfo} descriptionInfo={this.state.descriptionInfo} onChange ={this.onChange} onSubmit={this.onSubmit}/>
      }
        return (
            <div id="map">This is the app.jsx div
            <ImageDisplay/>
            <MapDisplay clickedMarker={this.state.clickedMarker} clickMarker={this.clickMarker} clickMap={this.clickMap} markerList={this.state.markerList}/>
            {markerForm}
            </div>
            

        )
    }
}