import React from 'react'

const Pet = (props) =>  {
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {props.pet.name}
            {props.pet.gender === 'female' ? '♀' : '♂'  }
          </a>
          <div className="meta">
            <span className="date">{props.pet.type}</span>
          </div>
          <div className="description">
            <p>Age: {props.pet.age}</p>
            <p>Weight: {props.pet.weight}</p>
          </div>
        </div>
        <div className="extra content">
        { props.pet.isAdopted ?
          <button className="ui disabled button">Already adopted</button> :
          <button className="ui primary button" onClick={() => props.adoptPet(props.pet.id)}>Adopt pet</button>
        }
        </div>
      </div>
    )
}

export default Pet
