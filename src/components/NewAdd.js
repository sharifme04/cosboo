import React, { Component } from 'react'
import axios from 'axios';
import Form from './Form';

class NewAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: '', 
            done: false,
            disabled:false,
            submitButtonName:'Add',
            submitButtonColor:'btn btn-primary'
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
               <Form {...this.props} {...this.state}
                handleChange = {this.handleChange}
                handleSubmit = {this.handleSubmit}
               />
            </div>
        )
    }
}

export default NewAdd;