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
      const animalChanged = e.target.value
     this.setState({
         filters: {
             type: animalChanged
         }
     })
  }

  onFindPetsClick = () => {
      let currentAnimal = this.state.filters.type;
          if (currentAnimal === "all") {
              fetch(`/api/pets`)
              .then(res => res.json())
               .then(all => {
                   this.setState({
                       pets: all,
                       ...this.state.filter
                   })
               })
          } else {
              fetch(`/api/pets?type=${currentAnimal}`)
              .then(res => res.json())
               .then(animals => {
                   this.setState({
                       pets: animals,
                       ...this.state.filter
                   })
               })
          }
      }
      componentDidMount(){
          fetch(`/api/pets`)
          .then(res => res.json())
           .then(all => {
               this.setState({
                   pets: all,
                   ...this.state.filter
               })
           })
      }

      onAdoptPet = (e) => {
         const id = e.target.id
         const copy = this.state.pets
         const foundPetIndex = this.state.pets.findIndex(pet => pet.id === id)
         copy[foundPetIndex].isAdopted = true
          this.setState({
              pets: copy
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
              <Filters onFindPetsClick={this.onFindPetsClick} onChangeType={this.onChangeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} petArray={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
