import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Palette from './containers/Palette';
import PaletteList from './containers/PaletteList';
import SingleColorPalette from './containers/SingleColorPalette';
import NewPaletteForm from './containers/NewPaletteForm';

import Page from './components/Page';

import seedColors from './utils/seedColors';
import { generatePalette } from './utils/colorHelpers';

class App extends Component {
  savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));

  state = { palettes: this.savedPalettes || seedColors };

  findPalette = id => {
    const { palettes } = this.state;
    return palettes.find(palette => palette.id === id);
  };

  deletePalette = id => {
    this.setState(({ palettes }) => ({ palettes: palettes.filter(palette => palette.id !== id) }), this.syncLocalStorage);
  };

  savePalette = newPalette => {
    const { palettes } = this.state;
    this.setState({ palettes: [...palettes, newPalette] }, this.syncLocalStorage);
  };

  syncLocalStorage = () => {
    const { palettes } = this.state;
    // Save palettes to local storage
    window.localStorage.setItem('palettes', JSON.stringify(palettes));
  };

  render() {
    const { palettes } = this.state;

    return (
      <Router basename="/ColorsApp/">
        <Route
          render={({ location }) => {
            const { key } = location;

            return (
              <TransitionGroup>
                <CSSTransition key={key} classNames="page" timeout={500}>
                  <Switch location={location}>
                    <Route
                      exact
                      path="/palette/new"
                      render={routeProps => (
                        <Page>
                          <NewPaletteForm savePalette={this.savePalette} palettes={palettes} {...routeProps} />
                        </Page>
                      )}
                    />
                    <Route
                      exact
                      path="/palette/:paletteId/:colorId"
                      render={({
                        match: {
                          params: { colorId, paletteId }
                        }
                      }) => (
                        <Page>
                          <SingleColorPalette colorId={colorId} palette={generatePalette(this.findPalette(paletteId))} />
                        </Page>
                      )}
                    />
                    <Route
                      exact
                      path="/"
                      render={routeProps => (
                        <Page>
                          <PaletteList palettes={palettes} deletePalette={this.deletePalette} {...routeProps} />
                        </Page>
                      )}
                    />
                    <Route
                      exact
                      path="/palette/:id"
                      render={({
                        match: {
                          params: { id }
                        }
                      }) => (
                        <Page>
                          <Palette palette={generatePalette(this.findPalette(id))} />
                        </Page>
                      )}
                    />
                    <Route
                      render={routeProps => (
                        <Page>
                          <PaletteList palettes={palettes} deletePalette={this.deletePalette} {...routeProps} />
                        </Page>
                      )}
                    />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            );
          }}
        />
      </Router>
    );
  }
}

export default App;
