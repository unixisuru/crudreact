import { Link, useParams, useNavigate } from "react-router-dom";
import React,{ useState, useEffect } from "react";
import axios from "axios";

function Users () {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(); // Extracting fetching logic to reuse
  }, []);

  // Function to fetch data from the API
  const fetchData = () => {
    axios.get('http://localhost:3000/')
      .then(res => {
        console.log(res);
        setData(res.data);
      })
      .catch(err => console.log(err));
  }

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/deleteuser/' + id)
      .then(res => {
        console.log(res);
        // After successful deletion, fetch data again to update the list
        fetchData();
        // Navigate back to the home page
        navigate('/');
      })
      .catch(err => console.log(err));
  }

  return(
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center"> 
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success btn-sm">
          Add+
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link to={`/edit/${user._id}`} className="btn btn-sm btn-success me-2">Update</Link>
                  <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
