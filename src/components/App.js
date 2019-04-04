import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'
// default
let newState = {
  filters: {
    type: 'all'
  }
}

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
  componentDidMount() {
    fetch("/api/pets")
      .then(res => res.json())
      .then(petsJSON => {

        this.setState({
          pets: petsJSON
        }, () => console.log(this.state))

      })
  }

  onChangeType = (event) => {
    // clone state
    newState = {
      type: event.target.value
    }
    console.log(newState)

  }

  onFindPetsClick = (event, newType) => {
    event.preventDefault()
    // sets state and rerenders only on submit
    this.setState({
      filters: newState
    }, () => {
      if (this.state.filters.type === "dog") {
        fetch("/api/pets?type=dog")
          .then(res => res.json())
          .then(petsJSON => {

            this.setState({
              pets: petsJSON
            }, () => console.log(this.state))

          })
      } else if (this.state.filters.type === "cat") {

        fetch("/api/pets?type=cat")
          .then(res => res.json())
          .then(petsJSON => {

            this.setState({
              pets: petsJSON
            }, () => console.log(this.state))

          })

      } else if (this.state.filters.type === "micropig") {
        fetch("/api/pets?type=micropig")
          .then(res => res.json())
          .then(petsJSON => {

            this.setState({
              pets: petsJSON
            }, () => console.log(this.state))

          })
      } else {
        fetch("/api/pets")
          .then(res => res.json())
          .then(petsJSON => {

            this.setState({
              pets: petsJSON
            }, () => console.log(this.state))

          })
      }

    })

  }


  onAdoptPet = (adoptedPetObj) => {
    console.log(adoptedPetObj)

    const newPetState = this.state.pets.map(pet => {
      if (adoptedPetObj.id === pet.id) {
        return {
          ...pet,
          isAdopted: !pet.isAdopted
        }
      } else {
        return pet
      }
    })

    // then finally set the state
    this.setState({
      pets: newPetState
    }, () => console.log(this.state))

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
              <Filters changeType={this.onChangeType} findPet={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets= {this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App