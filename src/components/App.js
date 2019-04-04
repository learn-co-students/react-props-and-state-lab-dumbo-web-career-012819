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

  onChangeType = (e) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: e.target.value
      }
    })
  }

  onAdoptPet = (id) => {
    const newPets = this.state.pets.map(pet => {
      if (id === pet.id) {
        return {...pet, isAdopted: true}
      } else {
        return pet
      }
    }) 

    this.setState({
      pets: newPets
    })
  }

  componentDidMount() {
    fetch('/api/pets')
        .then(resp => resp.json())
        .then(allPets => {
          this.setState({
            pets: allPets
          })
        })
  }

  onFindPetsClick = () => {
    if(this.state.filters.type !== 'all'){
      fetch('/api/pets?type=' + this.state.filters.type)
        .then(resp => resp.json())
        .then(filteredPets => {
          this.setState({
            pets: filteredPets
          })
        })
    } else {
      fetch('/api/pets')
        .then(resp => resp.json())
        .then(allPets => {
          this.setState({
            pets: allPets
          })
        })
    }
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
              <Filters onFindPetsClick={this.onFindPetsClick} onChangeType={this.onChangeType} />
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
