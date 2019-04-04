import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  componentDidMount(){
    this.fetchFunction();
  }

  fetchFunction(searchParams = '',filter = ''){
    if(filter === "all"){
      filter = '';
      searchParams='';
    }
    fetch(`/api/pets${searchParams + filter}`)
    .then(response => response.json())
    .then(parsedResponse => this.setState({pets: parsedResponse}) )
  }



  onChangeType = (event) => {
    let stateFilters = this.state.filters;
    stateFilters.type =  event.target.value;
    this.setState({filters: stateFilters})
  }

  onFindPetsClick = () => {
    this.fetchFunction('?type=',this.state.filters.type);
  }


  onAdoptPet = (petId) => {
    let allPets = this.state.pets;
    let selectedPet = allPets.find(pet => pet.id === petId);
    selectedPet.isAdopted = true;
    this.setState({pets: allPets});
  }


  render() {

    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters  onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
