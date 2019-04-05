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
    fetch('/api/pets')
    .then(response => response.json())
    .then(json => {
      this.setState({
        pets: json
      })

    })
  }

  onAdoptPet = (id) => {
    let stateCopyPets = [...this.state.pets]
    let adoptedPet = stateCopyPets.find(pet => pet.id === id)
    adoptedPet.isAdopted = true
    this.setState({
      pets: stateCopyPets
    })
  }

  onChangeType = (event) => {
    let selection = event.target.value
    console.log(selection)
    this.setState({
      filters: {
        type: selection
      }
    }, () => console.log(this.state))

  }

  onFindPetsClick = () => {
    console.log(this.state)
    if (this.state.filters.type === 'cat'){
      fetch('/api/pets?type=cat')
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          pets: json
        })
      })
    }
    else if (this.state.filters.type === 'dog'){
      fetch('/api/pets?type=dog')
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          pets: json
        })
      })
    }
    else if (this.state.filters.type === 'micropig'){
      fetch('/api/pets?type=micropig')
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          pets: json
        })
      })
    }
    else if (this.state.filters.type === 'all'){
      fetch('/api/pets')
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          pets: json
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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} isAdopted={this.state.isAdopted}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
