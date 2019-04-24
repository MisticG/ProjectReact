import React, { Component } from 'react';
import Axios, { AxiosResponse } from 'axios';
import ImageCard, { ImageUrls } from './imageCard';
import { ThemedCSSProperties, ThemeContext } from '../../../contexts/themeContext';

interface Props {
    view: string
}

interface State {
    imagesUrls: ImageUrls[],
    isLoading: boolean,
    savedImages: ImageUrls[],
    //isLiked: boolean
}

export default class ImageSection extends Component<Props, State> {
    /** Not a good place for the key.. well.. what the heck.. - GET YOUR OWN! */
    readonly accessKey = "9484a7a9e5e208bcdac3d11dab44b8b59f766c571397f98d815060bd9cc1fb82"
    readonly imageDatabaseApiUrl = "https://api.unsplash.com/search/photos/"

    state: State = {
        imagesUrls: new Array(24).fill({}),
        isLoading: true,
        savedImages: []
    }
  

    handleResponse(response: AxiosResponse) {
        if (response.data && response.data.results) {
            const images = response.data.results.map((img: any) => img.urls)
            this.setState({ imagesUrls: images, isLoading: false })
        }
    }

    async componentDidMount() {
        try {
            const response = await Axios.get(this.imageDatabaseApiUrl, {
                params: {
                    client_id: this.accessKey,
                    query: this.props.view,
                    page: Math.round(Math.random() * 100),
                    per_page: 24,
                }
            })
            this.handleResponse(response);
        } catch(error) {
            console.error(error)
        }
    }

    private get setMyLocalStorage() {
        if(localStorage.mySavedImages) {
            console.log(localStorage.mySavedImages)
            return 
        } else {
            localStorage.setItem("mySavedImages", JSON.stringify(this.state.savedImages))
        }
    }

    componentDidUpdate() {
        this.setMyLocalStorage;
    }

    likePicture = (url: ImageUrls) => {///(url: {full: string, raw: string, regular: string, small: string, thumb: string}) => {
        this.setState({
            savedImages: [...this.state.savedImages, url]})
        // TODO: Move imageObject from this.state.imageUrls to this.state.savedImages*/
    }

    render() { 
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <div style={root(theme)}>
                        {this.state.savedImages.map((urls, index) =>
                            <ImageCard key={index} urls={urls} likePicture={this.likePicture} isLiked={true} />  
                        )}
                        {this.state.imagesUrls.map((urls, index) =>
                            <ImageCard key={index} urls={urls} likePicture={this.likePicture}  isLiked={false} />  
                        )}
                    </div>
                )}
            </ThemeContext.Consumer>
        )
    }
}

const root: ThemedCSSProperties = (theme) => ({
    margin: '3em -1em -1em -1em',
    display: 'flex',
    flexWrap: 'wrap',
    background: `${theme.background.primary}B3`,
    boxShadow: `0 0px 80px 15px ${theme.background.primary}`
})