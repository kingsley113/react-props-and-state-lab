import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  handleFilterChange = (event) => {
    event.persist();
    this.setState({
      filters: {
        type: event.target.value,
      },
    });
  };

  handleFindPetsClick = () => {
    // fetch list of pets
    let searchQuery;
    if (this.state.filters.type === "all") {
      searchQuery = "";
    } else {
      searchQuery = `?type=${this.state.filters.type}`;
    }
    fetch(`/api/pets${searchQuery}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState(() => {
          return {
            pets: json,
          };
        });
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  handleAdoptedPet = (petId) => {
    const adoptedPet = this.state.pets.find((pet) => {
      return (pet.id = petId);
    });
    adoptedPet.isAdopted = true;
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.handleFilterChange}
                onFindPetsClick={this.handleFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                onAdoptPet={this.handleAdoptedPet}
                pets={this.state.pets}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
