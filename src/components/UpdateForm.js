import React, { Component } from 'react'
import axios from 'axios';

class UpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: '', 
            done: '',
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
           <form onSubmit={this.handleUpdateSubmit}>
           <div className="form-group">
             <label >Label:</label>
             <input type="label" value={this.state.label} onChange={this.handleChangeUpdate}  className="form-control"  name="label"/>
           </div>
           <div className="checkbox">
             <label >
              <input type="checkbox" checked={this.state.done}  name="done" disabled/>
             </label>
           </div>
             <input type="submit" className="btn btn-primary" value="Update" />
          </form>
         </div>
        )
    }
}

export default UpdateForm;