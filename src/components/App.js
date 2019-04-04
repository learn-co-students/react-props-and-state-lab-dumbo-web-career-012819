import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

// import { getAll, getByType } from './data/pets';

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

  onChangeType = (e) => {
    this.setState({
      filters: {
        type: e.target.value
      }
    }, () => console.log(this.state))
  }

  onFindPetsClick = () => {
    fetch(this.getFilteredPet())
    .then(resp => resp.json())
    .then((parsedResp) => {
      this.setState({
        pets: parsedResp
      })
    })
  }

  getFilteredPet = () => {
    switch(this.state.filters.type){
      case 'all':
        return '/api/pets'
      case 'cat':
        return '/api/pets?type=cat'
      case 'dog':
        return '/api/pets?type=dog'
      case 'micropig':
        return '/api/pets?type=micropig'
    }
  }

  onAdoptPet = (id) => {
    this.state.pets.forEach((pet, index) => {
      if(pet.id === id){
        this.state.pets[index].isAdopted = !this.state.pets[index].isAdopted
      }
    })

    this.setState({
      pets: this.state.pets
    })
  }

  componentDidMount() {
    fetch(this.getFilteredPet())
    .then(resp => resp.json())
    .then((parsedResp) => {
      this.setState({
        pets: parsedResp
      })
    })
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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
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
