import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Home from './components/Home';
import Form from './components/Form';
import UpdateForm from './components/UpdateForm';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
       data:[]
    }

    this.deleteById = this.deleteById.bind(this); 
    this.getData = this.getData.bind(this); 
  }
  getData(){
    axios.get('https://fe-dev-argo.cosboo.com/api/dataEntries/query?type=Task', { headers: {'X-Requested-With': 'XMLHttpRequest'} })
    .then(response=>this.setState({data:response.data._embedded.dataEntries}))
    .catch(error=>console.log(error))
  }

  componentDidMount(){
    this.getData();
  }

  deleteById(url){
     axios.delete(url, { headers:  {'Authorization': 'Basic Y21zLWFkbWluOkFkbWluMTIz','X-Requested-With': 'XMLHttpRequest'}})
    .then(()=>this.getData())
    .catch(error=>console.log(error))
  }

  render() {
    return (
      <div className="container">
        <h1>Cosboo Crud App</h1>
         <hr/>
         <Route exact path="/" render={(props)=> (
            <Home {...this.state} {...props} deleteById={this.deleteById} />
           )}/>
         <Route path="/newuser" render={(props)=> (
            <Form {...this.state} {...props} getData={this.getData}/>
          )}/>
         <Route path="/edit/:_id" render={(props)=> (
            <UpdateForm  {...props} getData={this.getData}/>
        )}/>
      </div>
    );
  }
}

export default App;
