import React, { Component } from 'react';
import { Spin, message } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import BookService from '../../service/book'
import IframeComponent from '../../components/iframe'

class IframePage extends Component {
  state = {

    bookItem: {}
  };

  componentDidMount() {

    this.getBookItem()
  }

  getBookItem = async () => {

    const { success, data, msg } = await BookService.getList()
    if (success) {
      const { bookId } = this.props.match.params;
      let item = data.find(e => e.id == bookId)
      this.setState({
        bookItem: item || {},
      })
    } else {
      message.error(`${msg}`)
    }

  }

  render() {
    const { bookItem } = this.state;

    const authUser = sessionStorage.getItem('user_name')

    return (
      <>
        {bookItem.id && <IframeComponent
          key={bookItem.id}
          url={`/books/${bookItem.title}/index.html?user=${authUser}&bookId=${bookItem.id}`}
        />}
      </>

    );
  }
}

export default connect(({ authUser }) => ({ authUser }))(withRouter(IframePage));
