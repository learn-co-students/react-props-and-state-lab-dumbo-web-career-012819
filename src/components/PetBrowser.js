import React from 'react'
import Pet from './Pet'

class PetBrowser extends React.Component {
  //pets is an array of objects... need to change to an array of components
 petComponent = () => {
   // map over all the pets for each pet pass down to Child (Pet) send pet as an
   // object in as the prop
  return this.props.pets.map(pet => {
    // remember pet.id to tell React the different components to re-render
    // pass down the onAdoptPet information. Needs to be passed down to Pet via prop
     return <Pet key = {pet.id} pet= {pet} onAdoptPet ={this.props.onAdoptPet}/>
    })
  };



  render() {
    // pass in the function and invoke we want it to generate automatically every time its
    // rendered
    return <div className="ui cards">{this.petComponent()}</div>
  }
}

export default PetBrowser
