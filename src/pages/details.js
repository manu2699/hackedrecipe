import React, { useState, useEffect } from 'react';
import Loader from "react-loader-spinner"

const Details = (props) => {
  const [data, setdata] = useState({})
  const [isLoading, setisLoading] = useState(true)

  //some random stats
  const [rating, setrating] = useState(Math.floor(Math.random() * (5 - 2) + 2))
  const [price, setprice] = useState(Math.floor(Math.random() * (250 - 150) + 150))
  const [noOfIng, setnoOfIng] = useState(Math.floor(Math.random() * (15 - 8) + 8))
  const [time, settime] = useState(Math.floor(Math.random() * (30 - 15) + 15))

  const getData = async () => {
    console.log(props.location.dish)
    if (props.location.dish) {
      await setdata(props.location.dish)
      await setisLoading(false)
    } else {
      let dishes = await JSON.parse(localStorage.getItem("data"))
      let filter = await dishes.filter(data => {
        return (Number(props.match.params.id) === data.id)
      })
      console.log(filter, dishes, props.match.params.id)
      await setdata({ ...filter[0] })
      await setisLoading(false)
    }
  }

  useEffect(() => {
    let call = async () => {
      await getData();
    }
    call()
  }, [props])
  return (
    <>
      {isLoading ?
        (<Loader className="centerPage" type="Oval" color="#000000" height={150} width={150} />) :
        (
          <div className="detailsPage">

            <h4 style={{ alignSelf: "flex-start", cursor: "pointer" }} onClick={() => { props.history.goBack() }}>
              {"< "} Go Back
            </h4>

            <div className="container">

              <div className="leftCol">

                <div className="coverImg">
                  <div className="playButton" style={{ textAlign: "center", cursor: "pointer" }}>
                    <img src={require("../Assets/Icons/Icon ionic-ios-play-circle.png")} alt="" />
                    <p>Play Video</p>
                  </div>
                  <img className="cover" src={data.image} alt="Pls wait..." />
                </div>

                <div className="Ingredients">
                  <h2>Ingredients: </h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    In id facilis ducimus unde! Error, ab ad totam laboriosam asperiores ipsum a recusandae sapiente iste voluptate, odio velit.
                    Reprehenderit, ab optio! Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    In id facilis ducimus unde! Error, ab ad totam laboriosam asperiores ipsum a recusandae sapiente iste voluptate, odio velit.
                    Reprehenderit, ab optio!
                </p>
                </div>


                <div className="Prep">
                  <h2>How to Prepare: </h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    In id facilis ducimus unde! Error, ab ad totam laboriosam asperiores ipsum a recusandae sapiente iste voluptate, odio velit.
                    Reprehenderit, ab optio!
                </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    In id facilis ducimus unde! Error, ab ad totam laboriosa
                </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                </div>

              </div>

              <div className="rightCol">

                <div className="head">
                  <h5>Recipe</h5>
                  <h1>{data.name}</h1>
                  <div className="rating">
                    <span>{rating} / 5</span>
                    {
                      Array(rating).fill(["xyz"]).map((rate, index) => {
                        return (
                          <img
                            src={require("../Assets/Icons/Icon awesome-star.png")} />
                        )
                      })
                    }
                  </div>
                  <br />
                  <h5>Description</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Veniam recusandae sunt omnis voluptas amet dolorum iusto
                    sed ullam, dolor sapiente doloribus molestiae necessitatibus
                    pariatur, voluptates quos laboriosam nobis error cum? dolor sapiente doloribus molestiae necessitatibus
                    pariatur, voluptates quos laboriosam nobis error cum?
                  </p>
                </div>

                <div className="statsRow">
                  <div className="blackCircle">
                    <h2>{noOfIng}</h2>
                    <span>ingredients</span>
                  </div>
                  <div className="blackCircle">
                    <h2>{price}</h2>
                    <span>bucks</span>
                  </div>
                  <div className="blackCircle">
                    <h2>{time}</h2>
                    <span>minutes</span>
                  </div>
                </div>

                <div className="favRow">
                  <span>Favorite this Recipe</span>
                  <img src={require("../Assets/Icons/Icon feather-heart-color.png")} alt="" />
                </div>

                <div className="feedback">
                  <h5>Add Comments</h5>
                  <textarea placeholder="Type something here....">

                  </textarea>
                  <div className="blackButton">
                    Add Comment
                  </div>
                </div>

              </div>

            </div>

          </div>
        )
      }
    </>
  );
}

export default Details;
