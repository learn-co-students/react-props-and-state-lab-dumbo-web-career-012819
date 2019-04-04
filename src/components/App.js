import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    // state is initialized here
    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  // function that updates the apps state
  onChangeType = (changedType) =>
    // takes in the changed type that was passed up from filters
    this.setState({
      // updates state.filter.type
      // changes the state of filters
      // changes the type to change type since 'type' is nested
     filters: {type: changedType}
    });

  // defined in App.. executed in Filters
  onFindPetsClick = () => {
    // set empty string called url
    let url = '';
    // if user selects all then replace url with address to list all pets
    if (this.state.filters.type === 'all') {
      url = '/api/pets'
    } else {
      // if user selects something else, change the url to whichever they picked
      url = `/api/pets?type=${this.state.filters.type}`
    }
    fetch(url)
      .then(resp => resp.json())
      .then (respJSON => {
        console.log (respJSON);
        this.setState({
          pets : respJSON
        })
    })
  };

    // id passed back up from  onAdoptPet in Pet component
  onAdoptPet = (id) => {
    //find the pet from the array
    // look through the pets find the pet with the pet.id equal to id passed in
    // actual object of the pet that has the id we're looking for
   let foundPet =this.state.pets.find(pet => pet.id === id);

    // take it out change adopt status to true
    foundPet.isAdopted = true;

    // make copy of list off all pets
   let copyOfPets=  [...this.state.pets];
   // get index of pet we need to replace
    let indexOfPet = copyOfPets.indexOf(foundPet);

    //replace updated list
    // splice index start, takes in delete count, if you want to add/insert anything
    copyOfPets.splice(indexOfPet, 1, foundPet);

    // change the state of pets replace it with our found spliced copy of pets
    this.setState({
      pets : copyOfPets
    })


  };

  render(){
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              {/*first child*/}
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}  />
            </div>
            <div className="twelve wide column">
              {/*second child*/}
              <PetBrowser pets={this.state.pets} onAdoptPet ={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
