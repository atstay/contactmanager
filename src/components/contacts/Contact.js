import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import axios from "axios";

class Contact extends Component {
  state = {
    // we want to be able to click the drop and if it is shown have info go away/if not shown get it to appear
    showContactInfo: false
  };

  onDeleteClick = async (id, dispatch) => {
    // try/catch method to get rid of data without actual backend database
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (e) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
  };

  render() {
    // coming from contact value in props
    const { id, name, email, phone } = this.props.contact;

    // take value out of state to show toggle on UI
    const { showContactInfo } = this.state;

    // fas is font awesome
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name} {""}
                <i // use arrow function (or bind) to  utilize "this" because it is a custom method not a lifecycle method (render)
                  onClick={() =>
                    // can't directly mutate it...have to use setState
                    // set to !this.state.showContactInfo...the opposite of what it currently is to create toggle function on button
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    })
                  }
                  className="fas fa-sort-down"
                  style={{ cursor: "pointer " }}
                />
                <i
                  className="fas fa-times"
                  style={{ curosr: "pointer", float: "right", color: "red" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "black",
                      marginRight: "1rem"
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo ? ( // turnery to do something (?) else (:)
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};
export default Contact;
