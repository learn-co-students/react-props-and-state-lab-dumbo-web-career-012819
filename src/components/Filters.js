import React from 'react'

class Filters extends React.Component {


  render() {

    return (
      <div className="ui form">
        <form onSubmit={(event) => { this.props.findPet(event)}}>
        <h3>Animal type</h3>
        <div className="field">
          <select name="type" id="type" onChange = {this.props.changeType}>
            <option value="all">All</option>
            <option value="cat">Cats</option>
            <option value="dog">Dogs</option>
            <option value="micropig">Micropigs</option>
          </select>
        </div>

        <div className="field">
          <button type="submit" className="ui secondary button">Find pets</button>
        </div>
      </form>
      </div>
    )
  }
}

export default Filters