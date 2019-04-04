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


onFindPetsClick = () => {
  // console.log("hellooo")
    Promise.all([fetch('/api/pets'), fetch('/api/pets?type=cat'), fetch('/api/pets?type=dog'), fetch('/api/pets?type=micropig')])
    .then( ([res1, res2, res3, res4]) => {
      return Promise.all([res1.json(), res2.json(), res3.json(), res4.json()])
    })
    .then( ([allJSON, catJSON, dogJSON, micropigJSON]) => {
        if (this.state.filters.type === "all") {
          return this.setState({
            pets: allJSON
          })
           }
        else if (this.state.filters.type === "cat"){
          return this.setState({
            pets: catJSON
          })
        }

        else if (this.state.filters.type === "dog"){
          return this.setState({
            pets: dogJSON
          })
        }

        else if (this.state.filters.type === "micropig"){
          return this.setState({
            pets: micropigJSON
          })
        }

      })
  }


onChangeType = (event) => {
  this.setState({
    filters: { ...this.state.filters,
    type: event.target.value
    }
  })
}

onAdoptPet = (id) => {
  // console.log(id)
  const newPets = this.state.pets.map(pet => {
    if (pet.id === id) {
      return {...pet, isAdopted: true}
    }else{
      return pet
    }
  })

  this.setState({
    pets: newPets
  })
  // change attribute on a single pet inside of an array
}



  render() {
    console.log(this.state.pets)
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
