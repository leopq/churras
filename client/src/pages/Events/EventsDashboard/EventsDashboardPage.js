// --- 3rd party imports
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

// --- Application Core imports
import API from '../../../api'
// --- Utils imports
import AuthUtils from '../../../utils/AuthUtils'
// ---- Components imports
import EventsList from '../../../components/Events/EventsList'

const styles = theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column'
  },
  root: {
    flexGrow: 1,
    flex: '1 0 100%',
    paddingTop: '20px',
    [theme.breakpoints.up('md')]: {
      paddingTop: '30px'
    }
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    letterSpacing: '.1rem',
    textIndent: '.7rem',
    marginTop: '10px',
    fontWeight: theme.typography.fontWeightLight,
    [theme.breakpoints.only('xs')]: {
      fontSize: 24,
      letterSpacing: '.1em',
      textIndent: '.1rem'
    },
    whiteSpace: 'wrap'
  },
  subtitle: {
    fontSize: 18,
    [theme.breakpoints.only('xs')]: {
      fontSize: 14,
      maxWidth: '200px'
    },
  },
  headline: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit,
    maxWidth: 600,
    textAlign: 'center',
    fontSize: 18
  },
  primaryColor: {
    color: theme.palette.primary.main
  },
  content: {
    height: '100%',
    minHeight: '70vh',
    padding: '20px',
    width: '90%',
    // paddingTop: theme.spacing.unit * 8,
    [theme.breakpoints.up('sm')]: {
      width: '95%',
      paddingLeft: '40px'
    }
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 10,
    right: theme.spacing.unit * 4,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  }
})

class EventsDashboardPage extends Component {
  state = {
    accessToken: '',
    events: []
  }

  componentDidMount() {
    this.setState({ accessToken: AuthUtils.getToken() }, () => {
      this.getEvents()
    })
  }

  getEvents() {
    this.setState({ isLoading: true }) // Sets loading state 
    API.getEventsList({ xAccessToken: this.state.accessToken }).then((response) => { // In case of success...
      this.setState({ events: response.data })
    }).catch((error) => {  // In case of error...
      console.log(error)
      this.setState({ // Shows error message
        authError: {
          ...this.state.authError,
          show: true,
          title: 'Ops! Houve um erro ao buscar sua lista de churrascos.',
          message: 'Por favor, tente novamente mais tarde.'
        },
        isLoading: false
      })
    })
  }

  render() {
    const { events } = this.state
    const { classes, history } = this.props
    return (
      <div className={classes.main}>
        <div className={classes.root}>
          <div className={classes.content}>
            <EventsList events={events} />
          </div>
        </div>
        <Tooltip id='tooltip-icon2' title='Criar churrasco' placement='top'>
          <Fab color='primary' aria-label='Add' size='large' className={classes.fab} onClick={(e) => { history.push('event') }}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>

    )
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(EventsDashboardPage))