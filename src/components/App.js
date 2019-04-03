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

  handleChange = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    }, () => console.log(this.state.filters))
  }

  handleFindPets = () => {
    const BASE_URL = '/api/pets'
    let requestURL;

    if (this.state.filters.type === 'all') {
      requestURL = BASE_URL
    } else {
      requestURL = BASE_URL + `?type=${this.state.filters.type}`
    }

    fetch(requestURL)
      .then(res => res.json())
      .then(petsJSON => {
        console.log(petsJSON);
        this.setState({pets: petsJSON})
      });
  }

  onAdoptPet = (id) => {
    const newPets = [...this.state.pets]
    const currentPet = newPets.find(pet => pet.id === id);
    currentPet.isAdopted = true;
    this.setState({pets: newPets})
    console.log(currentPet);

  }

  componentDidMount() {
    this.handleFindPets()
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
              <Filters onChangeType={this.handleChange} onFindPetsClick={this.handleFindPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
