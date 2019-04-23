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

    //let item = '';
    
    state: State = {
        detailViews: ['forest', 'sky', 'desert'],
        searchString: ''
    }

    searchItem = (title: string) => {
        this.setState({searchString: "/" + title})
    }
    
    render() {
        return (
            <Suspense fallback={<Spinner/>}>
                <Switch>
                    <Route exact path="/" render={() =>
                        <MasterView detailViews={this.state.detailViews}
                        searchItem = {this.searchItem}/>
                    }/>
                        <Route path={`${this.state.searchString}`} component={DetailView}/>
                        <Route path="/sky" component={DetailView}/>
                        {/*<Route path="/desert" component={DetailView}/>^*/}
                </Switch>
            </Suspense>
        );
    }
}