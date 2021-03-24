import React from 'react';
import { Route } from 'react-router-dom';


import HomeView from './containers/HomeView';
import GloatView from './containers/GloatView';
import AboutView from './containers/AboutView';
import SubmitView from './containers/SubmitView';
import NewView from './containers/NewView';

const BaseRouter = () => (
    <div>
        <Route exact path="/cheapGLoaT/" component={HomeView} />
        <Route exact path="/cheapGLoaT/gloat" component={GloatView} />
        <Route exact path="/cheapGLoaT/about" component={AboutView} />
        <Route exact path="/cheapGLoaT/submit" component={SubmitView} />
        <Route exact path="/cheapGLoaT/new" component={NewView} />
        
    </div>
);

export default BaseRouter;