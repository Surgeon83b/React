import { Component } from 'react';

class ErrorPage extends Component {
  render() {
    return (
      <div className=' flex relative'>
        <img
          src='https://media.istockphoto.com/id/1163971748/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BE%D0%B4%D0%B8%D0%BD-%D0%BA%D1%83%D1%81%D0%BE%D0%BA-%D0%B1%D0%B5%D0%BB%D0%BE%D0%B9-%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BE%D0%BB%D0%BE%D0%BC%D0%BA%D0%B8-%D0%BD%D0%B0%D0%B4-%D1%80%D0%B0%D0%B2%D0%BD%D0%B8%D0%BD%D0%BE%D0%B9-%D0%B1%D0%B5%D0%BB%D0%BE%D0%B9-%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BE%D0%BB%D0%BE%D0%BC%D0%BA%D0%B8-%D1%81-%D0%BF%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC%D0%BE%D0%B9-%D0%B8-%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D1%8F-%D1%81%D0%BB%D0%BE%D0%B2-3d.jpg?s=2048x2048&w=is&k=20&c=objX2Q1JjvFER_0KKp56buNJwipbSGtPK2MtfHqy0dM='
          alt='error image'
        ></img>
        <button
          className='centered big'
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    );
  }
}

export default ErrorPage;
