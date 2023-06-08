import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://randomuser.me/api";

function DisplayUserDetails() {
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      // const { name, email } = response.data.results;

      setUser({
        name: response.data.results[0].name.first,
        email: response.data.results[0].email,
      });
      localStorage.setItem("user", JSON.stringify(response.data.results));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const refreshButton = () => {
    fetchData();
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const { name, email } = JSON.parse(savedUser);
      setUser({ name, email });
    } else {
      fetchData();
    }
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>Name: {user.name}</h2>
          <h2>Email: {user.email}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={refreshButton}>Refresh</button>
    </div>
  );
}

export default DisplayUserDetails;
