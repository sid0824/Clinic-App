import React from "react";
class Form extends React.Component {
  state = {
    Medicine: [{ name: "", Type: "" }],
    Patient: "",
    description: ""
  };

  handleChange = e => {
    if (["name", "Type"].includes(e.target.className)) {
      let Medicine = [...this.state.Medicine];
      Medicine[e.target.dataset.id][
        e.target.className
      ] = e.target.value.toUpperCase();
      this.setState({ Medicine }, () => console.log(this.state.Medicine));
    } else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() });
    }
  };
  addMedicine = e => {
    this.setState(prevState => ({
      Medicine: [...prevState.Medicine, { name: "", Type: "" }]
    }));
  };
  handleSubmit = e => {
    e.preventDefault();
  };
  render() {
    let { Patient, description, Medicine } = this.state;
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <label htmlFor="name">Patient</label>
        <input type="text" name="Patient" id="Patient" value={Patient} />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
        />
        <button onClick={this.addMedicine}>Add new medicine</button>
        {Medicine.map((val, idx) => {
          let catId = `cat-${idx}`,
            TypeId = `Type-${idx}`;
          return (
            <div key={idx}>
              <label htmlFor={catId}>{`Medicine #${idx + 1}`}</label>
              <input
                type="text"
                name={catId}
                data-id={idx}
                id={catId}
                value={Medicine[idx].name}
                className="name"
              />
              <label htmlFor={TypeId}>Type</label>
              <input
                type="text"
                name={TypeId}
                data-id={idx}
                id={TypeId}
                value={Medicine[idx].Type}
                className="Type"
              />
            </div>
          );
        })}
        <input type="confirm" value="Confirm" />
      </form>
    );
  }
}
export default Form;
