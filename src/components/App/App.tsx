import React, { createElement } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ClassComponent, ClassPureComponent, FunctionalComponent } from '@app/components'
import './App.scss'

const helloWorldHeading = createElement('h1', { className: 'app-title' }, 'Hello World')

const App = () => (
  <Router>
    <Switch>
      <Route path='/'>
        {helloWorldHeading}
        <ClassComponent />
        <ClassPureComponent />
        <FunctionalComponent />
      </Route>
    </Switch>
  </Router>
)

export default App
