import React, {Component} from 'react';
import axios from 'axios';
import CloseIcon from './icons/CloseIcon';
import EmptyCommentsIcon from './icons/EmptyCommentsIcon';

class PictureModalPopup extends Component {
  constructor(props){
    super(props)
    this.state = {
      commentList: [ ]
    }
    this.getFullSize = this.getFullSize.bind(this);
    this.inputListener = this.inputListener.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.getFullSize();
  }

  getFullSize() {
    axios.get(`https://boiling-refuge-66454.herokuapp.com/images/${this.props.id}`)
      .then((fullSizeResponse) => {
        this.setState({
          fullSizeURL: fullSizeResponse.data.url
        })
      })
  }

  inputListener(event) {
    this.setState({
      commentInput: event.target.value
    })
  }

  submitHandler(event) {
    event.preventDefault();
    var date = new Date();
    var currentDate = date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear();
    this.setState({
      commentList: [...this.state.commentList, this.state.commentInput],
      commentDate: currentDate,
      commentInput: ''
    })
  }

  render() {
    return(
        <div className = 'modal-window'>
          <div className = 'modal-content'>
            <button className = 'close-button' onClick = {this.props.onClose}>
              <CloseIcon/>
            </button>
            {
              this.state.commentList.length === 0 ?
              <div className = 'comments-display'>
                <label className = 'empty-comments-icon'><EmptyCommentsIcon/></label>
                <label className = 'empty-comments-text'>Оставьте комментарий первым!</label>
              </div>
              :
              <div className = 'comments-display'>
                {
                  this.state.commentList.map(commentId => (
                    <div className = 'test' key = {commentId}>
                      <div style = {{fontSize:'16px', color:'#999999'}}> {this.state.commentDate} </div>
                      <div style = {{fontSize:'16px', marginTop:'0.5%', marginBottom:'3%'}}> {commentId} </div>
                    </div>
                  ))
                }
              </div>
            }
            <div>
              <img src = {this.state.fullSizeURL} alt = 'Изображение не загрузилось...'  className = 'image-full' />
              <form
                className = 'form-control'
                onSubmit = {this.submitHandler}
                action = {`https://boiling-refuge-66454.herokuapp.com/images/${this.props.id}/comments`}
                method = 'post'
              >
                  <input
                    className ='comment-input'
                    type = 'text'
                    placeholder = 'Ваше имя'
                    name = 'name'
                    pattern='.{3,}'
                    required
                    title='Minimum 3 symbols'
                    autocomplete = 'off'
                  />
                  <input
                    className ='comment-input'
                    type = 'text'
                    placeholder = 'Ваше комментарий'
                    name = 'comment' pattern='.{1,}'
                    required
                    title='Leave a comment'
                    onChange = {this.inputListener}
                    value = {this.state.commentInput}
                    autocomplete = 'off'
                  />
                <input className ='submit-input' type = 'submit' value = 'Оставить комментарий' style = {{marginBottom:'5%'}}/>
              </form>
            </div>
          </div>
        </div>
    )
  }
}

export default PictureModalPopup;
