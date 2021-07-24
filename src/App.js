import { Component } from 'react';
import Loader from 'react-loader-spinner';
import { ImageGallery } from './components/ImageGallery';
import { Searchbar } from './components/Searchbar';
import { Button } from './components/Button';
import { Api } from './components/api';

const apiImages = new Api();

export class App extends Component {
  state = {
    searchImages: [],
    loading: false,
  };

  searchbar = async value => {
    if (!value) return;
    apiImages.query = value;
    apiImages.resetPage();
    this.setState({ loading: true, searchImages: [] });

    const img = await apiImages
      .fetchImage()
      .finally(() => this.setState({ loading: false }));
    // console.log('img-searchbar', img);

    this.setState({ searchImages: img });
  };

  loadMore = async () => {
    this.setState({ loading: true });

    const img = await apiImages
      .fetchImage()
      .finally(() => this.setState({ loading: false }));
    // console.log('img-loadMore', img);

    this.setState(prevState => {
      return { searchImages: [...prevState.searchImages, ...img] };
    });

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { searchImages, loading } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.searchbar} />
        {loading && (
          <Loader
            className="Overlay"
            style={loaderStyles}
            type="BallTriangle"
            color="#00BFFF"
            height={200}
            width={200}
          />
        )}
        <ImageGallery value={searchImages} />

        {searchImages.length !== 0 && <Button onClick={this.loadMore} />}
      </>
    );
  }
}

const loaderStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
};
