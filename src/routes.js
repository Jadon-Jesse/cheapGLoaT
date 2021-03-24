import React from 'react';
import { Route } from 'react-router-dom';


import HomeView from './containers/HomeView';
import GloatView from './containers/GloatView';
import AboutView from './containers/AboutView';
import SubmitView from './containers/SubmitView';
import NewView from './containers/NewView';

const BaseRouter = () => (
    <div>
        <Route path="/" component={HomeView} />
        <Route path="/gloat" component={GloatView} />
        <Route path="/about" component={AboutView} />
        <Route path="/submit" component={SubmitView} />
        <Route path="/new" component={NewView} />
        
    </div>
);

export default BaseRouter;