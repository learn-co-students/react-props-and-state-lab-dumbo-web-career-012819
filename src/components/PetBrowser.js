import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  render() {
    console.log('PETS', this.props);
    const gettingOnePetCard = this.props.pets.map(pet => {
      return <Pet key={pet.id} pet={pet}  onAdoptPet={this.props.onAdoptPet} />
    })
    return <div className="ui cards">
        {gettingOnePetCard}
      </div>
  }
}

export default PetBrowser
