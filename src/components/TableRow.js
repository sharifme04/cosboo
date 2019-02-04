import * as React from 'react';
import { Link } from 'react-router-dom';

const TableRow = (props) => ( 
   <tr>
    <td>{props.data.properties.taskId}</td>
    <td>{props.data.properties.label}</td>
    <td><input type="checkbox" checked={props.data.properties.done} disabled/></td>
    <td><Link to={`edit/${props.data._links.self.href.split("/").pop()}`}><button type="button" className="btn btn-info">Edit</button></Link></td>
    <td><button  onClick={() => props.deleteById(props.data._links.self.href)} type="button" className="btn btn-danger" >Delete</button></td>
  </tr> 
 );
 
 export default TableRow; 