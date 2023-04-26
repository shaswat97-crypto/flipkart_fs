import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userslist.css";
const UsersList = ({ loading, setLoading }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data from server
    // Set users state
    if (!loading) {
      const fetchUsers = async () => {
        const res = await axios.get("/api/admin/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "flipkartAdminToken"
            )}`,
          },
        });
        const d = await res.data
        console.log({d})
        setUsers(d);
      };
      fetchUsers();
    }
  }, [loading]);

  let loadCircle = (
    <div className="productCont">
      <span className="loader"></span>
    </div>
  );
  return (
    <>
      {users ? (
        <div className="ul">
          <h2>All Users</h2>
          <div>
            {users.length > 0 ? (
              users.map((user, indx) => <p key={user._id}>{`${indx+1}. userId : ${user.email} (Role : ${user.role})`}</p>)
            ) : (
              <h4>No users found</h4>
            )}
          </div>
        </div>
      ) : (
        loadCircle
      )}
    </>
  );
};

export default UsersList;
