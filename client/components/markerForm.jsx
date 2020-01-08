import React, { useState } from 'react';


const Form = (props) => {

  const useInput = init => {
    const [value, setValue] = useState(init);
    const onChange = e => {
      setValue(e.target.value);
    }
    // return the value with the onChange function instead of setValue function
    return [value, onChange];
  }

  const [tagInfo, setTagInfo] = useInput('');
  const [descriptionInfo, setDescriptionInfo] = useInput('');
  const [imgURL, setImgURL] = useInput('');
  

  return (
    <div className="form" >
      <form onSubmit={props.onSubmit}>
        <label>
          Description:
    <textarea
            id="description"
            value={descriptionInfo}
            name="descriptionInfo"
            rows="10"
            onChange={setDescriptionInfo}></textarea>
        </label>
        <br></br>
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
        <br></br>
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
        <br></br>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
export default Form;