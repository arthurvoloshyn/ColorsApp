import { DRAWER_WIDTH } from '../constants/';

import sizes from './sizes/';

const drawerWidth = DRAWER_WIDTH;

const { down } = sizes;

const styles = ({
  transitions: {
    create,
    easing: { sharp, easeOut },
    duration: { leavingScreen, enteringScreen }
  }
}) => ({
  root: {
    display: 'flex'
  },
  hide: {
    display: 'none'
  },
  appBar: {
    transition: create(['margin', 'width'], {
      easing: sharp,
      duration: leavingScreen
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
    [down('md')]: {
      height: '74px'
    }
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: create(['margin', 'width'], {
      easing: easeOut,
      duration: enteringScreen
    }),
    [down('md')]: {
      marginLeft: '320px',
      width: `calc(100% - 320px)`
    }
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  navBtns: {
    marginRight: '1rem',
    '& a': {
      textDecoration: 'none'
    },
    [down('xs')]: {
      marginRight: '0.5rem'
    }
  },
  button: {
    margin: '0 0.5rem',
    [down('md')]: {
      width: '100%'
    },
    [down('sm')]: {
      padding: '6px 5px'
    },
    [down('xs')]: {
      margin: '0 0.2rem',
      padding: '0.3rem'
    }
  }
});

export default styles;
