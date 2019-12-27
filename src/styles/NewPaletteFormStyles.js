import { DRAWER_WIDTH } from '../constants/';

import sizes from './sizes/';

const drawerWidth = DRAWER_WIDTH;

const { down } = sizes;

const styles = ({
  mixins: { toolbar },
  transitions: {
    create,
    easing: { sharp, easeOut },
    duration: { leavingScreen, enteringScreen }
  }
}) => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    height: '100vh',
    [down('md')]: {
      width: '320px'
    }
  },
  drawerPaper: {
    width: drawerWidth,
    display: 'flex',
    alignItems: 'center',
    [down('md')]: {
      width: '320px'
    }
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '0 8px',
    ...toolbar,
    justifyContent: 'flex-end',
    [down('md')]: {
      height: '74px'
    }
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: 0,
    transition: create('margin', {
      easing: sharp,
      duration: leavingScreen
    }),
    marginLeft: -drawerWidth,
    [down('md')]: {
      marginLeft: '-320px'
    }
  },
  contentShift: {
    transition: create('margin', {
      easing: easeOut,
      duration: enteringScreen
    }),
    marginLeft: 0
  },
  container: {
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    width: '100%'
  },
  button: {
    width: '50%'
  }
});

export default styles;
