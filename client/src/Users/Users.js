import React, { Component } from "react";
import axios from "axios";

export default class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get("/api/users", {}).then(res => {
      console.log(res.data);
      this.setState({
        authenticated: true,
        users: res.data
      });
    });
  }

  getUserName = userId => {
    const parent = this.state.users.filter(user => {
      return user._id === userId;
    });

    return parent.length ? `${parent[0].firstName} ${parent[0].lastName}` : "";
  };

  render() {
    return (
      <div className="users-table">
        {this.state.authenticated === undefined && <h3>Loading...</h3>}
        {this.state.authenticated === true && (
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Profession</th>
                <th>Company</th>
                <th>Website</th>
                <th>Association</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Socioeconomic</th>
                <th>Height</th>
                <th>Adjectives</th>
                <th>Best Quality</th>
                <th>Beard</th>
                <th>Haunt</th>
                <th>Referrer</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users
                .filter(user => {
                  return user.firstName;
                })
                .map((user, i) => (
                  <tr key={i} id={i}>
                    <td>{user.email}</td>
                    <td nowrap="true">
                      {user.firstName} {user.lastName}
                    </td>
                    <td nowrap="true">{user.profession}</td>
                    <td nowrap="true">{user.company}</td>
                    <td nowrap="true">{user.website}</td>
                    <td nowrap="true">{user.association}</td>
                    <td nowrap="true">{user.gender}</td>
                    <td>{user.age}</td>
                    <td nowrap="true">{user.socioeconomic}</td>
                    <td>{user.height}</td>
                    <td nowrap="true">
                      {user.adjective1 && (
                        <React.Fragment>
                          {user.adjective1}, {user.adjective2},{" "}
                          {user.adjective3}, {user.adjective4},{" "}
                          {user.adjective5}, {user.adjective6}
                        </React.Fragment>
                      )}
                    </td>
                    <td nowrap="true">{user.bestQuality}</td>
                    <td nowrap="true">{user.beard}</td>
                    <td nowrap="true">{user.haunt}</td>
                    <td nowrap="true">{this.getUserName(user.ancestors[1])}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
