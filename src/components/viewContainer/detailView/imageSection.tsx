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

    setMyLocalStorage() {
        //skapa en localStoage med nyckel = view och en tom array som värde
        localStorage.setItem(this.props.view, JSON.stringify(this.state.savedImages))
        
    }

    storageToSavedImages() {
        //läser in bilder från localStorage till en variabel
        const storageData: ImageUrls[] = JSON.parse(localStorage.getItem(this.props.view) || "{}")

        //lägg in alla lagrade bilder i savedImages. Måste göra en koll först så att storageData inte är tom
        if(storageData.length > 0) {
            this.setState ({
                savedImages: this.state.savedImages = [...storageData]
            });
        }
    }

    componentDidUpdate() {
        //Om det finns sparade bilder i localStorage och savedImages är tom...
        if(this.props.view in localStorage && this.state.savedImages.length === 0) {
          
            //kör...
            this.storageToSavedImages();

        } else {
            //kör...
            this.setMyLocalStorage(); 
        }
    }

    //Tar emot url:erna till en bild...
    likePicture = (url: ImageUrls, index: number) => {
        //Sparar den gillade bildens url i savedImages-arrayen
        this.setState({
            savedImages: [...this.state.savedImages, url]
        });
        //och tar bort bilden ur imageUrls-arrayen
        this.setState({
            imagesUrls: this.state.imagesUrls.filter((_, i) => i !== index)
        });
    }



    render() { 
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <div style={root(theme)}>
                        {this.state.savedImages.map((urls, index) =>
                            <ImageCard 
                                key={index} 
                                urls={urls} 
                                likePicture={this.likePicture} 
                                isLiked={true} 
                                index = {index}
                            />  
                        )}
                        {this.state.imagesUrls.map((urls, index, e) =>
                            <ImageCard 
                                key={index} 
                                urls={urls} 
                                likePicture={this.likePicture} 
                                isLiked={false} 
                                index = {index} 
                            />  
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