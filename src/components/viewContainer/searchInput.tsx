import React, { Component, CSSProperties, ChangeEvent, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';

interface Props {}

interface State {
    searchString: string
    //searchItem: string
    redirect: boolean
}

export default class SearchInput extends Component<Props, State> {
    state: State = {
        searchString: '',
        //searchItem: '',
        redirect: false
    }

    onSubmit = (e: FormEvent) => {
        e.preventDefault();
        this.setState({ redirect: true })
    };

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchString: e.target.value})
    }
   
    render() {

        if (this.state.redirect) {
            return <Redirect push to={`${this.state.searchString}`} />
        }
        return (
            <div>
            <form onSubmit={this.onSubmit} style={searchBar}>
                <input 
                    type="text"
                    name="title"
                    placeholder="Sök..."
                    value={this.state.searchString}
                    onChange={this.onChange}
                />
                <input
                    type="submit"
                    value="Search"
                    className="btn"
                />
            </form>
            </div>
        )
    }
}

const searchBar: CSSProperties = {
    margin: "auto"
}