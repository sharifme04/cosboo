import React from 'react'

const Form = (props) => {
  return (
    <div>
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
              <label >Label:</label>
                <input type="label" value={props.label} onChange={props.handleChange}  className="form-control"  name="label"/>
              </div>
            <div className="checkbox">
              <label >
                <input type="checkbox" checked={props.done} onChange={props.handleChange} disabled={props.disabled} name="done" />
              </label>
            </div>
              <input type="submit" className={props.submitButtonColor} value={props.submitButtonName} />
         </form>
    </div>
  )
}

export default Form;
