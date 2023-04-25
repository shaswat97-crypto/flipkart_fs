import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data from server
    // Set users state
    axios.get("/api/admin/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("flipkartAdminToken")}`,
      },
    });
  }, []);

  let loadCircle = (
    <div className="productCont">
      <span className="loader"></span>
    </div>
  );
  return (
    <>
      {users ? (
        <div>
          <h2>All Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        loadCircle
      )}
    </>
  );
};

export default UsersList;
