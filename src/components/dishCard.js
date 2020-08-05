import React from "react";
import LazyLoad from "react-lazyload";
import Loader from "react-loader-spinner"

export default ({ dish, history }) => (
  <div className="dishCard">
    <LazyLoad
      placeholder={
        <Loader type="Oval" color="#000" height={150} width={150} />
      }>
      <div className="dishImage">
        <img src={dish.image} alt="Pls Wait..." />
      </div>
    </LazyLoad>
    <div className="content">
      <br />
      <br />
      <div className="titleRow">
        <h2>{dish.name}</h2>
        <img src={require("../Assets/Icons/Icon feather-heart-color.png")} alt="" />
      </div>
      <h2>$ {dish.price}</h2>
      <p>{dish.description}</p>
    </div>
    <div className="detailsBtn">
      {dish.category}
    </div>
    <div className="overlay">
      <div className="overlayButton">
        View More
      </div>
      <div className="overlayButton" onClick={() => {
        history.push({
          pathname: `/${dish.id}`,
          dish
        })
      }}>
        Quick View
      </div>
    </div>
  </div>
)