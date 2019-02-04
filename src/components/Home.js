import React, { Component } from 'react'
import TableRow from './TableRow';
import { Link } from 'react-router-dom';

 class Home extends Component {
    render() {
        let data =this.props.data.map( singleData =>
            <TableRow key={singleData.properties.taskId} data={singleData} deleteById={this.props.deleteById}/>
        )
        return (
         <div>
            <Link to={`/newuser`}><button type="button" className="btn btn-primary">Add New value</button></Link> 
           <hr/>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                <tr>
                    <th>TaskID</th>
                    <th>Label</th>
                    <th>Done</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    {data} 
                </tbody>
            </table>
           </div>
         </div>
        )
    }
}

export default Home;