import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  onAdoptPet = (id) => {

  }

  renderPet(arr) {
    return arr.map(pet => {
      return (<Pet pet={pet} onAdoptPet={this.props.onAdoptPet}/>)
    })
  }

  render() {
    return (
      <div className="ui cards">
        {this.renderPet(this.props.pets)}
      </div>
    )
  }
}

export default PetBrowser
