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
  // componentDidMount() {
  //   fetch('/api/pets')
  //   .then(r => r.json())
  //   .then(list => this.setState({ pets: list }))
  // }

  onChangeType = (newType) => {
    this.setState({
      filters: {type: newType},
    })
  }

  onFindPetsClick = () => {
    let filter = this.state.filters.type
    let url = filter === "all" ? '/api/pets' : `/api/pets?type=${filter}`
    fetch(`${url}`)
    .then( r => r.json() )
    .then( list => {
      this.setState({
        pets: list
      })
    })
  }

  onAdoptPet = (id) => {
    // event.preventDefault()
    let adoptedPet = this.state.pets.find(pet => pet.id === id)
    adoptedPet.isAdopted = true
    let index = this.state.pets.indexOf(adoptedPet)
    let list = [...this.state.pets]
    list.splice(index, 1, adoptedPet)
    this.setState({
      pets: list
    })
  }


  render() {
    // const filteredList = this.state.filters.type === "all" ? this.state.pets : this.state.pets.filter(pet => pet.type === this.state.filters.type)
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
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
