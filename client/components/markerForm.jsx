import React, { Component } from 'react';

function Form(props){
  return (
  <div>
  <form>
    <label>
    Location:
    <input type = 'text'></input>
    </label>
    <br></br>
    <label>
    Description:
    <textarea id = "description" rows= "10"></textarea>    
    </label>
    <br></br>
    <label>
    Tag:
    <input type = 'text' value= {props.tagInfo} onChange = {props.onChange}></input>
    </label>
    <br></br>
    <label>
    Image URL:
    <input type = 'text'></input>
    </label>
  </form>
  </div>
  )
}
export default Form;