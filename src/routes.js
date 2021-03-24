import React from 'react';
import { Route } from 'react-router-dom';


import HomeView from './containers/HomeView';
import GloatView from './containers/GloatView';
import AboutView from './containers/AboutView';
import SubmitView from './containers/SubmitView';
import NewView from './containers/NewView';

const BaseRouter = () => (
    <div>
        <Route exact path="/" component={HomeView} />
        <Route exact path="/gloat" component={GloatView} />
        <Route exact path="/about" component={AboutView} />
        <Route exact path="/submit" component={SubmitView} />
        <Route exact path="/new" component={NewView} />
        
    </div>
);

export default BaseRouter;