import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Loader from 'react-loader-spinner'

import SimilarProductItem from '../SimilarProductItem'

import {BsDashSquare} from 'react-icons/bs'
import {BsPlusSquare} from 'react-icons/bs'

const apiState = {
  initial: 'INITIAL',
  loading: 'Loading',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class ProductItemDetails extends Component {
  state = {count: 1, prductItem: {}, list: [], stateSTatus: apiState.loading}
  componentDidMount() {
    this.getData()
  }
  onClickToGoHome = () => {
    const {history} = this.props
    console.log(this.props)
    history.push('/products')
  }
  getData = async () => {
    const {id} = this.props.match.params
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const data = await fetch(apiUrl, options)
    if (data.ok === true) {
      const jsonData = await data.json()
      console.log(jsonData.similar_products)
      this.setState({
        prductItem: jsonData,
        stateSTatus: apiState.success,
        list: jsonData.similar_products,
      })
    } else {
      this.setState({stateSTatus: apiState.failed})
    }
  }
  decreMentBtn = () => {
    if (this.state.count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }
  increMentBtn = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  renderLoadingViwe = () => {
    return (
      <div data-testid="loader" className="product-loader-container">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    )
  }

  getSuccessView = () => {
    const {prductItem, count, list} = this.state
    const {
      availability,
      title,
      brand,
      description,
      id,
      image_url,
      price,
      rating,
      total_reviews,
      product,
    } = prductItem
    return (
      <>
        <>
          <div className="container">
            <div className="prduct-page-container">
              <img alt="product" className="product-image" src={image_url} />
              <div className="product-details">
                <h1 className="title head">{title}</h1>
                <p className="price bold">Rs {price}/-</p>
                <div className="similar-d-flex">
                  <div className="rating-star">
                    <p className="rating">{rating}</p>
                    <img
                      className="star-image"
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                    />
                  </div>
                  <p>{total_reviews} Reviews</p>
                </div>
                <p className="description">{description}</p>
                <p>Available: {availability}</p>
                <p>Brand: {brand}</p>
                <hr />
                <div className="similar-d-flex stock-container">
                  <button
                    data-testid="minus"
                    onClick={this.decreMentBtn}
                    className="inc-dec-btn"
                  >
                    <BsDashSquare className="icon" />
                  </button>
                  <p>{count}</p>
                  <button
                    data-testid="plus"
                    onClick={this.increMentBtn}
                    className="inc-dec-btn"
                  >
                    <BsPlusSquare />
                  </button>
                </div>
                <button className="rating-star btn-add-to-cart">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="similar-products-container">
              <h1>Similar Products</h1>
              <ul className="ul-container  similar-d-flex similar-justify-space-between">
                {list.map(eachProduct => (
                  <SimilarProductItem
                    eachProduct={eachProduct}
                    key={eachProduct.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        </>
      </>
    )
  }

  renderFailureView = () => {
    return (
      <>
        <div className="failur-view-container similar-d-flex">
          <img
            className="failed-img"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
            alt="failure view"
          />
          <h1 className="title head ">Product Not Found</h1>
          <button onClick={this.onClickToGoHome} className="failed-btn">
            Continue Shopping
          </button>
        </div>
      </>
    )
  }

  getView = () => {
    const {stateSTatus} = this.state

    switch (stateSTatus) {
      case apiState.loading:
        return this.renderLoadingViwe()
      case apiState.success:
        return this.getSuccessView()

      case apiState.failed:
        return this.renderFailureView()
    }
  }

  render() {
    return (
      <>
        <Header />
        <>{this.getView()}</>
      </>
    )
  }
}
export default ProductItemDetails
