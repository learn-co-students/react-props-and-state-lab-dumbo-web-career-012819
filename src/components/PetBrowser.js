import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {



  render() {
    const actualPets = this.props.pets.map(pet => <Pet onAdoptPet={this.props.onAdoptPet} key={pet.id} pet={pet} />)

    return <div className="ui cards">{actualPets}</div>
  }
}

export default PetBrowser
