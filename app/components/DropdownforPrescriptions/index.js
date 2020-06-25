import React from "react";

class Dropdown extends React.Component {
  constructor() {
    super();

    this.state = {
      displayMenu: false
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  }

  render() {
    return (
      <div className="dropdown" style={{ background: "white", width: "200px" }}>
        <div className="button" onClick={this.showDropdownMenu}>
          {" "}
          What{" "}
        </div>

        {this.state.displayMenu ? (
          <ul>
            <li>
              <a className="active" href="#Insert Field">
                Insert Field Name
              </a>
            </li>
            <li>
              <a href="#Insert Field">Insert Field</a>
            </li>
            <li>
              <a href="#"></a>
            </li>
            <li>
              <a href="#">M</a>
            </li>
            <li>
              <a href="#"></a>
            </li>
            <li>
              <a href="#"></a>
            </li>
            <li>
              <a href=""></a>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

export default Dropdown;
