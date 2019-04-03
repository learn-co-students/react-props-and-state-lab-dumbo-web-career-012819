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

  onChangeType = (type) => {
    this.setState({
      filters: {
        type: type
      }
    })
  }

  onAdoptPet = (id) => {
    console.log("working!");
    const stateCopy = [...this.state.pets]
    const foundPet = stateCopy.find(pet => pet.id === id)

    foundPet.isAdopted = true

    this.setState({
      pets: stateCopy
})
  }

  onFindPetsClick = () => {
    switch(this.state.filters.type) {
      case 'all':
      console.log("inside default case")
        fetch('/api/pets')
          .then(res => res.json())
          .then(allPet => {
            this.setState({
              pets: allPet
            })
          })
        break;
      case 'cat':
      console.log("inside cat case")
        fetch('/api/pets?type=cat')
          .then(res => res.json())
          .then(allCat => {
            this.setState({
              pets: allCat
            })
            // console.log(this.state.pets)
          })
        break;
      case 'dog':
        console.log("inside dog case")
        fetch('/api/pets?type=dog')
          .then(res => res.json())
          .then(allDog => {
            this.setState({
              pets: allDog
            })
          })
        break;
      case 'micropig':
      console.log("inside micropig case")
        fetch('/api/pets?type=micropig')
          .then(res => res.json())
          .then(allPig => {
            this.setState({
              pets: allPig
            })
          })
        break;
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

  componentDidMount(){
    fetch('/api/pets')
      .then(res => res.json())
      .then(allPet => {
        this.setState({
          pets: allPet
        })
      })
  }
}

export default App
