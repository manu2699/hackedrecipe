import React, { useState, useEffect } from 'react';
import axios from "axios";
import Loader from "react-loader-spinner"
import DishCard from "../components/dishCard";
import apiData from "../data.json";

const Home = (props) => {
  const [data, setdata] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [searchQuery, setsearchQuery] = useState("")
  const [searchResults, setsearchResults] = useState([])

  const getData = async () => {
    //this api call throws error on accessing http content from https site
    try {
      const response = await axios.get("http://starlord.hackerearth.com/recipe")
      await setdata([...response.data, ...response.data])
      await setisLoading(false)
      localStorage.setItem("data", JSON.stringify(response.data))

    } catch (e) {
      await setdata([...apiData, ...apiData])
      await setisLoading(false)
    }
  }

  useEffect(() => {
    let call = async () => {
      await getData();
    }
    call()
  }, [])

  let searchUtil = async () => {
    let temp = data;
    let filter = await temp.filter(data => {
      let name = data.name.toLowerCase()
      let toCheck = searchQuery.toLowerCase();
      return (name.substr(0, toCheck.length) === toCheck) && (toCheck.length >= 1)
    })
    await setsearchResults([...filter])
  }

  let clearResults = async () => {
    await setsearchQuery("")
    await setsearchResults([])
  }

  useEffect(() => {
    if (searchQuery.length <= 1) {
      clearResults()
    }
  }, [searchQuery])

  return (
    <>
      {isLoading ?
        (<Loader className="centerPage" type="Oval" color="#000000" height={150} width={150} />) :
        (
          <div className="homePage">

            <div className="searchRow">
              <div className="icon-whiteBg">
                <img src={require("../Assets/Icons/Icon feather-search.png")} alt="" />
              </div>
              <input type="text" onChange={async e => {
                await setsearchQuery(e.target.value)
                await searchUtil()
              }} placeholder="Search your favourite recipe.." />
              {searchQuery.length >= 2 && <div className="clearButton" onClick={() => { clearResults() }}>Clear</div>}
            </div>

            <div className="headingRow">
              <h4>Category</h4>
              <h2>Pizza {"&"} Noodles</h2>
            </div>

            {searchQuery.length >= 2 && <h3>Search Results</h3>}

            <div className="searchResults">
              {searchResults.map((dish, index) => {
                return (
                  <div
                    key={index}
                    className={"yellowCard"}>
                    <DishCard history={props.history} dish={dish} />
                  </div>
                )
              })}
            </div>

            <div className="mossaicLayout">
              {data.map((dish, index) => {
                let classname = "whiteCard"
                if (index % 3 != 0)
                  classname = "blackCard"
                return (
                  <div
                    key={index}
                    className={classname}>
                    <DishCard history={props.history} dish={dish} />
                  </div>
                )
              })}
            </div>

          </div>
        )
      }
    </>
  );
}

export default Home;
