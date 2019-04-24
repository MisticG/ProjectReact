import React, { Suspense, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Spinner from '../spinner';

const MasterView = React.lazy(() => import(/* webpackChunkName: "masterView" */ './masterView'));
const DetailView = React.lazy(() => import(/* webpackChunkName: "detailView" */ './detailView/detailView'));

interface State {
    detailViews: string[]
    searchString: string
}

/** React function component */
export default class ViewContainer extends Component<{}, State> {
    
    render() {
        return (
            <Suspense fallback={<Spinner/>}>
                <Switch>
                    <Route exact path="/" render={() =>
                        <MasterView/>
                    }/>
                        <Route path="/*" component={DetailView}/>
                </Switch>
            </Suspense>
        );
    }
}