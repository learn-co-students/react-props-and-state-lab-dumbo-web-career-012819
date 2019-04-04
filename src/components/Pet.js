import React from 'react'

class Pet extends React.Component {
  render() {
      const gender = () => {
          if (this.props.pet.gender === 'male'){
              return "♂"
          } else {
              return "♀"
             }
      }

      const adopted = () =>{
          if (this.props.pet.isAdopted === false){
             return <button id={this.props.pet.id} onClick={this.props.onAdoptPet} className="ui primary button">Adopt pet</button>
          } else {
            return  <button className="ui disabled button">Already Adopted</button>
          }
      }
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            <p>{gender()}</p>
            <p>{this.props.pet.name}</p>
          </a>
          <div className="meta">
            <h2 className="date">{this.props.pet.type}</h2>
          </div>
          <div className="description">
            <p>Age: {this.props.pet.age}</p>
            <p>Weight: {this.props.pet.weight}</p>
          </div>
        </div>
        <div className="extra content">
         {adopted()}
        </div>
      </div>
    )
  }
}

export default Pet
