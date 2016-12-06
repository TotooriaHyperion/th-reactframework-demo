"use strict";

import React, { Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import {render} from 'react-dom'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import { bindActionCreators } from 'redux'

import Admin from './container/Admin.js';
import User from './container/User.js';

import './scss/index.scss';

class App extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      return (
         <Router history={hashHistory}>
            <Route path="/" getComponent={(nextState,cb) => require.ensure([],(require)=>cb(null,require('./container/login/index.js')))}/>
            <Route path="/admin" component={Admin}>
               {/*User Manage*/}
               <Route path="user_manage" getComponent={(nextState,cb) => require.ensure([],(require)=>cb(null,require('./container/user_manage/index.js')))}/>
               {/*Tab Group 1*/}
               <Route path="g1tab1" getComponent={(nextState,cb) => require.ensure([],(require)=>cb(null,require('./container/tab_group1/1.js')))}/>
               <Route path="g1tab2" getComponent={(nextState,cb) => require.ensure([],(require)=>cb(null,require('./container/tab_group1/2.js')))}/>
               <Route path="g1tab3" getComponent={(nextState,cb) => require.ensure([],(require)=>cb(null,require('./container/tab_group1/3.js')))}/>
               {/*Single Tab 1*/}
               <Route path="tab1" getComponent={(nextState,cb) => require.ensure([],(require)=>cb(null,require('./container/single_tab1/index.js')))}/>
               {/*Tab Group 2*/}
               <Route path="g2tab1" getComponent={(nextState,cb) => require.ensure([],(require)=>cb(null,require('./container/tab_group2/1.js')))}/>
               <Route path="g2tab2" getComponent={(nextState,cb) => require.ensure([],(require)=>cb(null,require('./container/tab_group2/2.js')))}/>
               <Route path="g2tab3" getComponent={(nextState,cb) => require.ensure([],(require)=>cb(null,require('./container/tab_group2/3.js')))}/>
            </Route>
            <Route path="/user" component={User}>
               {/*Components*/}
               <Route path="form_demo" getComponent={(nextState,cb) => require.ensure([],(require)=>cb(null,require('./container/component_demo/form_demo.js')))}/>
               <Route path="form_tool_demo" getComponent={(nextState,cb) => require.ensure([],(require)=>cb(null,require('./container/component_demo/form_tool_demo.js')))}/>
               <Route path="modal_demo" getComponent={(nextState,cb) => require.ensure([],(require)=>cb(null,require('./container/component_demo/modal_demo.js')))}/>
               <Route path="paging_demo" getComponent={(nextState,cb) => require.ensure([],(require)=>cb(null,require('./container/component_demo/paging_demo.js')))}/>
               <Route path="time_button_demo" getComponent={(nextState,cb) => require.ensure([],(require)=>cb(null,require('./container/component_demo/time_button_demo.js')))}/>
               <Route path="calendar_demo" getComponent={(nextState,cb) => require.ensure([],(require)=>cb(null,require('./container/component_demo/calendar_demo.js')))}/>
               <Route path="draggable_demo" getComponent={(nextState,cb) => require.ensure([],(require)=>cb(null,require('./container/component_demo/draggable_demo.js')))}/>
            </Route>
         </Router>
      )
   }
}

export default App