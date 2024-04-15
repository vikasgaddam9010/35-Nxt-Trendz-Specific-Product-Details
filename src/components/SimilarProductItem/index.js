const SimilarProductItem = props => {
  const {eachProduct} = props
  const {title, brand, price, rating, image_url} = eachProduct

  return (
    <li>
      <img alt="similar product" className="similar-img" src={image_url} />
      <p className="bold">{title}</p>
      <p>
        By: <span>{brand}</span>
      </p>
      <div className="similar-d-flex similar-justify-space-between">
        <p className="bold">Rs {price}</p>
        <div className="rating-star">
          <p className="rating">{rating}</p>
          <img
            className="star-image"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </div>
      </div>
    </li>
  )
}
export default SimilarProductItem
