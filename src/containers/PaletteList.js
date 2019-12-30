import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

import MiniPalette from '../components/MiniPalette';

import styles from '../styles/PaletteListStyles';

class PaletteList extends Component {
  state = {
    openDeleteDialog: false,
    deletingId: ''
  };

  openDialog = deletingId => {
    this.setState({ openDeleteDialog: true, deletingId });
  };

  closeDialog = () => {
    this.setState({ openDeleteDialog: false, deletingId: '' });
  };

  goToPalette = id => {
    const {
      history: { push }
    } = this.props;

    push(`/palette/${id}`);
  };

  handleDelete = () => {
    const { deletePalette } = this.props;
    const { deletingId } = this.state;

    deletePalette(deletingId);
    this.closeDialog();
  };

  render() {
    const {
      palettes,
      classes: { root: classesRoot, container: classesContainer, nav: classesNav, heading: classesHeading, palettes: classesPalettes }
    } = this.props;
    const { openDeleteDialog } = this.state;

    return (
      <div className={classesRoot}>
        <div className={classesContainer}>
          <nav className={classesNav}>
            <h1 className={classesHeading}>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <TransitionGroup className={classesPalettes}>
            {palettes.map(palette => {
              const { id } = palette;

              return (
                <CSSTransition key={id} classNames="fade" timeout={500}>
                  <MiniPalette {...palette} goToPalette={this.goToPalette} openDialog={this.openDialog} key={id} id={id} />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>
        <Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={this.closeDialog}>
          <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

PaletteList.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    container: PropTypes.string,
    nav: PropTypes.string,
    heading: PropTypes.string,
    palettes: PropTypes.string
  }),
  palettes: PropTypes.array,
  deletePalette: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

PaletteList.defaultProps = {
  classes: {
    root: '',
    container: '',
    nav: '',
    heading: '',
    palettes: ''
  },
  palettes: [],
  deletePalette: () => {},
  history: {
    push: () => {}
  }
};

export default withStyles(styles)(PaletteList);
