import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {




  render() {
      const petCards = this.props.petArray.map(pet=>{
          return <Pet onAdoptPet={this.props.onAdoptPet} pet={pet}/>
      })
    return <div className="ui cards">
                {petCards}
            </div>
  }
}

export default PetBrowser
