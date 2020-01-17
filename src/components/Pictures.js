import React, {Component} from 'react';
import axios from 'axios';
import PictureModalPopup from './PictureModalPopup';
import DownloadIcon from './icons/DownloadIcon';

class Pictures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listIsEmpty: true,
      modalIsOpen: false
    }
    this.getPictures = this.getPictures.bind(this);
    this.handlePopup = this.handlePopup.bind(this);
    this.getPictures();
  }

  getPictures() {
    axios.get('https://boiling-refuge-66454.herokuapp.com/images')
      .then((response) => {
        this.setState({
          picturesList: response.data
        })
        if (this.state.picturesList.length === 0) {
          this.setState({
            listIsEmpty: true
          })
        } else (
          this.setState({
            listIsEmpty: false
          })
        )
      })
  };

  handlePopup = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    })
  }

  render() {
    return (
      <div>
        { this.state.listIsEmpty ?
            <div style = {{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', height:'90vh'}}>
              <DownloadIcon/>
              <label style = {{textAlign:'center'}}> Изображения загружаются с сервера. Пожалуйста, подождите. </label>
            </div>
          :
            <div className = 'pictures-layout'>
            {this.state.picturesList.map(pictureId => (
                <img
                  key = {pictureId.id}
                  src = {pictureId.url}
                  onClick = {() => this.setState({ imageId: pictureId.id, modalIsOpen: true})}
                  alt = 'Извините, изображение не загрузилось'
                  className = 'image-size'
                />
            ))}
            </div>
        }
        { this.state.modalIsOpen ?
            <PictureModalPopup id = {this.state.imageId} onClose = {this.handlePopup}/>
          :
            null
        }
      </div>
    )
  }
}

export default Pictures;
