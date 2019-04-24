import React, { CSSProperties, Component } from 'react';
import ViewSection from './viewSection';
import ImageLink from './imageLink';
import SearchInput from './searchInput';

interface Props {}

/** React function component */
export default class MasterView extends Component<Props> {

    render() {
    return (
        <div style={container}>
            <SearchInput />
        </div>
    );
}
}

const container: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    margin: '1em'
}