import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'antd';
import { withStyles } from '@material-ui/core/styles';
import Register from './components/Register';
import './App.css';

const styles = theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 20,
      paddingRight: theme.spacing.unit * 20,
      paddingTop: theme.spacing.unit * 10,
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit * 2
    },
  },
  content: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 28
  },
  instructions: {
    paddingTop: theme.spacing.unit * 2
  }
})

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <Card>
          <Row type='flex' gutter={16}>
            <Col xs={{ span: 24}} md={{ span: 14}} >
              <Register />
            </Col>
            <Col xs={{ span: 24}} md={{ span: 10}}>
              <div className={classes.content}>
                <h1>Welcome friend</h1>
                <div className={classes.instructions}>
                  <p>Enter your personal details to start a journey with us</p>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
};

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
