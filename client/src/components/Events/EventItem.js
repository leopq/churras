import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import { Avatar } from '@material-ui/core'
import withRouter from 'react-router-dom/withRouter'

const styles = theme => ({
    card: {
        display: 'block',
        maxWidth: 400,
        height: '100%'
    },
    media: {
        height: 0,
        backgroundPosition: 'top',
        paddingTop: '150px', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        opacity: 0.8
    },
    textCenter: {
        textAlign: 'center',
        marginBottom: '0px'
    },
    cardHeader: {
        paddingBottom: '0px'
    },
    cardContent: {
        paddingTop: '0px',
    },
    link: {
        color: theme.palette.primary.main
    }
})

class EventItem extends React.Component {

    render() {
        const { classes, event, history } = this.props
        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={`/barbecue-${event.picture ? event.picture.src : '01'}.jpg`}
                    title='Paella dish'
                />
                <CardHeader
                    className={classes.cardHeader}
                    avatar={
                        <Avatar aria-label='Recipe' className={classes.avatar}>
                            T
                        </Avatar>
                    }
                    title={event.title}
                    subheader={(new Date(event.scheduledTo)).toLocaleDateString('pt-br')}
                />
                <CardContent className={classes.cardContent}>
                    <div className={classes.textCenter}>
                        <Button className={classes.link} onClick={(e) => { history.push('/event?id=' + event._id) }}>
                            {'Ver mais'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(EventItem)) 