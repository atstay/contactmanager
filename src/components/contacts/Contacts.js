import React, { Component } from "react";
import Contact from "./Contact";
import { Consumer } from "../../context";

class Contacts extends Component {
  // state that holds a key of contacts in a value of an array
  //state always comes first

  render() {
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <React.Fragment>
              <h1 className="display-4 mb-2">
                <span className="text-danger">Contact </span> List
              </h1>
              {contacts.map(contact => (
                //What we render for each contact:
                <Contact
                  // get rid of key warning by setting it to id
                  key={contact.id}
                  contact={contact}
                />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
