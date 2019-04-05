import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
    const petRender = this.props.pets.map(pet => <Pet pet={pet} isAdopted={this.props.onAdoptPet} onAdoptPet={this.props.onAdoptPet}/>)

    return <div className="ui cards">{petRender}</div>
  }
}

export default PetBrowser
