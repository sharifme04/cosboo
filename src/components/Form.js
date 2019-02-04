import React, { Component } from 'react'
import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: '', 
            done: false
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
    
    handleSubmit(event) {
        event.preventDefault();
        const userData = {
            type: "Task",
            properties:{ 
                label: this.state.label,
                done: this.state.done
           }
        }
        axios.post('https://fe-dev-argo.cosboo.com/api/dataEntries', userData, { headers:  {'Authorization': 'Basic Y21zLWFkbWluOkFkbWluMTIz','X-Requested-With': 'XMLHttpRequest'}})
        .then(()=>this.props.getData());
        this.setState({
            label: '',
            done: ''
        });
        this.props.history.push('/');
    }
    
    render() {
        return (
            <div>
             <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label >Label:</label>
                <input type="label" value={this.state.label} onChange={this.handleChange}  className="form-control"  name="label"/>
              </div>
              <div className="checkbox">
                <label >
                 <input type="checkbox" checked={this.state.done} onChange={this.handleChange} name="done"/>
                </label>
              </div>
                <input type="submit" className="btn btn-primary" value="Add" />
             </form>
            </div>
        )
    }
}

export default Form;