import React, { Component } from "react";
import axios from "axios";

export default class Users extends Component {
  state = {
    users: [],
    value: "",
    desc: true
  };

  componentDidMount() {
    axios.get("/api/users").then(res => {
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
    const value = this.state.value;
    return (
      <div className="users-table">
        {this.state.authenticated === undefined && <h3>Loading...</h3>}
        {this.state.authenticated === true && (
          <table>
            <thead>
              <tr>
                <th
                  className={
                    this.state.value === "email"
                      ? this.state.desc
                        ? "sort-desc"
                        : "sort-asc"
                      : undefined
                  }
                  onClick={() => {
                    this.state.value === "email"
                      ? this.setState(prevState => ({ desc: !prevState.desc }))
                      : this.setState({ desc: true });
                    this.setState({ value: "email" });
                  }}
                >
                  Email
                </th>
                <th
                  className={
                    this.state.value === "lastName"
                      ? this.state.desc
                        ? "sort-desc"
                        : "sort-asc"
                      : undefined
                  }
                  onClick={() => {
                    this.state.value === "lastName"
                      ? this.setState(prevState => ({ desc: !prevState.desc }))
                      : this.setState({ desc: true });
                    this.setState({ value: "lastName" });
                  }}
                >
                  Name
                </th>
                <th
                  className={
                    this.state.value === "profession"
                      ? this.state.desc
                        ? "sort-desc"
                        : "sort-asc"
                      : undefined
                  }
                  onClick={() => {
                    this.state.value === "profession"
                      ? this.setState(prevState => ({ desc: !prevState.desc }))
                      : this.setState({ desc: true });
                    this.setState({ value: "profession" });
                  }}
                >
                  Profession
                </th>
                <th
                  className={
                    this.state.value === "company"
                      ? this.state.desc
                        ? "sort-desc"
                        : "sort-asc"
                      : undefined
                  }
                  onClick={() => {
                    this.state.value === "company"
                      ? this.setState(prevState => ({ desc: !prevState.desc }))
                      : this.setState({ desc: true });
                    this.setState({ value: "company" });
                  }}
                >
                  Company
                </th>
                <th
                  className={
                    this.state.value === "website"
                      ? this.state.desc
                        ? "sort-desc"
                        : "sort-asc"
                      : undefined
                  }
                  onClick={() => {
                    this.state.value === "website"
                      ? this.setState(prevState => ({ desc: !prevState.desc }))
                      : this.setState({ desc: true });
                    this.setState({ value: "website" });
                  }}
                >
                  Website
                </th>
                <th
                  className={
                    this.state.value === "association"
                      ? this.state.desc
                        ? "sort-desc users-dater"
                        : "sort-asc users-dater"
                      : "users-dater"
                  }
                  onClick={() => {
                    this.state.value === "association"
                      ? this.setState(prevState => ({ desc: !prevState.desc }))
                      : this.setState({ desc: true });
                    this.setState({ value: "association" });
                  }}
                >
                  Association
                </th>
                <th
                  className={
                    this.state.value === "gender"
                      ? this.state.desc
                        ? "sort-desc users-dater"
                        : "sort-asc users-dater"
                      : "users-dater"
                  }
                  onClick={() => {
                    this.state.value === "gender"
                      ? this.setState(prevState => ({ desc: !prevState.desc }))
                      : this.setState({ desc: true });
                    this.setState({ value: "gender" });
                  }}
                >
                  Gender
                </th>
                <th
                  className={
                    this.state.value === "age"
                      ? this.state.desc
                        ? "sort-desc users-dater"
                        : "sort-asc users-dater"
                      : "users-dater"
                  }
                  onClick={() => {
                    this.state.value === "age"
                      ? this.setState(prevState => ({ desc: !prevState.desc }))
                      : this.setState({ desc: true });
                    this.setState({ value: "age" });
                  }}
                >
                  Age
                </th>
                <th
                  className={
                    this.state.value === "socioeconomic"
                      ? this.state.desc
                        ? "sort-desc users-dater"
                        : "sort-asc users-dater"
                      : "users-dater"
                  }
                  onClick={() => {
                    this.state.value === "socioeconomic"
                      ? this.setState(prevState => ({ desc: !prevState.desc }))
                      : this.setState({ desc: true });
                    this.setState({ value: "socioeconomic" });
                  }}
                >
                  Socioeconomic
                </th>
                <th
                  className={
                    this.state.value === "height"
                      ? this.state.desc
                        ? "sort-desc users-dater"
                        : "sort-asc users-dater"
                      : "users-dater"
                  }
                  onClick={() => {
                    this.state.value === "height"
                      ? this.setState(prevState => ({ desc: !prevState.desc }))
                      : this.setState({ desc: true });
                    this.setState({ value: "height" });
                  }}
                >
                  Height
                </th>
                <th className="users-dater">Adjectives</th>
                <th
                  nowrap="true"
                  className={
                    this.state.value === "bestQuality"
                      ? this.state.desc
                        ? "sort-desc users-dater"
                        : "sort-asc users-dater"
                      : "users-dater"
                  }
                  onClick={() => {
                    this.state.value === "bestQuality"
                      ? this.setState(prevState => ({ desc: !prevState.desc }))
                      : this.setState({ desc: true });
                    this.setState({ value: "bestQuality" });
                  }}
                >
                  Best Quality
                </th>
                <th
                  className={
                    this.state.value === "beard"
                      ? this.state.desc
                        ? "sort-desc users-dater"
                        : "sort-asc users-dater"
                      : "users-dater"
                  }
                  onClick={() => {
                    this.state.value === "beard"
                      ? this.setState(prevState => ({ desc: !prevState.desc }))
                      : this.setState({ desc: true });
                    this.setState({ value: "beard" });
                  }}
                >
                  Beard
                </th>
                <th
                  className={
                    this.state.value === "haunt"
                      ? this.state.desc
                        ? "sort-desc users-dater"
                        : "sort-asc users-dater"
                      : "users-dater"
                  }
                  onClick={() => {
                    this.state.value === "haunt"
                      ? this.setState(prevState => ({ desc: !prevState.desc }))
                      : this.setState({ desc: true });
                    this.setState({ value: "haunt" });
                  }}
                >
                  Haunt
                </th>
                <th className="users-dater">Referrer</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users
                .sort((a, b) => {
                  let comparison = 0;
                  if (a[value] < b[value]) {
                    comparison = -1;
                  }
                  if (a[value] > b[value]) {
                    comparison = 1;
                  }
                  return !this.state.desc ? comparison * -1 : comparison;
                })
                .filter(user => {
                  return user.profession;
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
                    <td className="users-dater" nowrap="true">
                      {user.association}
                    </td>
                    <td className="users-dater" nowrap="true">
                      {user.gender}
                    </td>
                    <td className="users-dater">{user.age}</td>
                    <td className="users-dater" nowrap="true">
                      {user.socioeconomic.join(", ")}
                    </td>
                    <td className="users-dater">{user.height}</td>
                    <td className="users-dater" nowrap="true">
                      {user.adjective1 && (
                        <React.Fragment>
                          {user.adjective1}, {user.adjective2},{" "}
                          {user.adjective3}, {user.adjective4},{" "}
                          {user.adjective5}, {user.adjective6}
                        </React.Fragment>
                      )}
                    </td>
                    <td className="users-dater" nowrap="true">
                      {user.bestQuality}
                    </td>
                    <td className="users-dater" nowrap="true">
                      {user.beard}
                    </td>
                    <td className="users-dater" nowrap="true">
                      {user.haunt}
                    </td>
                    <td className="users-dater" nowrap="true">
                      {this.getUserName(user.ancestors[1])}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
