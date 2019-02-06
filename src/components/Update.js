import React, { Component } from 'react'
import axios from 'axios';
import Form from './Form';

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: '', 
            done: '',
            disabled:true,
            submitButtonName:'Update',
            submitButtonColor:'btn btn-info'
        };
    
        this.handleChangeUpdate = this.handleChangeUpdate.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
      }
    
      handleChangeUpdate(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

      getDataInfo(){
         axios.get('https://fe-dev-argo.cosboo.com/api/dataEntries/'+this.props.match.params._id, { headers:  {'Authorization': 'Basic Y21zLWFkbWluOkFkbWluMTIz','X-Requested-With': 'XMLHttpRequest'}})
         .then(response=> this.setState({
          label:response.data.properties.label,
          done:response.data.properties.done
          })
         )
          .catch(error=>console.log(error))  
        }

      componentDidMount(){
        this.getDataInfo();
      }
    
      handleUpdateSubmit(event) {
        event.preventDefault();
           const userData = {
            properties:{ 
                label: this.state.label
           }
        }
       axios.patch('https://fe-dev-argo.cosboo.com/api/dataEntries/'+this.props.match.params._id, userData, { headers:  {'Authorization': 'Basic Y21zLWFkbWluOkFkbWluMTIz','X-Requested-With': 'XMLHttpRequest'}})
        .then(()=>this.props.getData());
          this.setState({
                  label: '', 
            });
        this.props.history.push('/'); 
    }
    
    render() {
        return (
          <div>
             <Form {...this.props} {...this.state}
                handleChange = {this.handleChangeUpdate}
                handleSubmit = {this.handleUpdateSubmit}
                submitButtonName = {this.state.submitButtonName}
                disabled = {this.state.disabled}
                submitButtonColor = {this.state.submitButtonColor}  
               />
         </div>
        )
    }
}

export default Update;