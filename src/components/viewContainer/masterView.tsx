import React, { CSSProperties } from 'react';
import ViewSection from './viewSection';
import ImageLink from './imageLink';
import SearchInput from './searchInput';

interface Props {
    detailViews: string[]
    searchItem: (title: string) => void;
}

/** React function component */
export default class MasterView extends Component<Props>) {

    render() {
    return (
        <div style={container}>
            <SearchInput searchItem = {this.props.searchItem} />
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