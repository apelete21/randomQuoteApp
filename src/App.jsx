import gsap from "gsap";
import { useEffect, useState } from "react";
import Helmet from "react-helmet"
import "./App.css"

function App() {

  // Current quote variables ...
  let firstInit;
  const [currentQuote, setCurrentQuote] = useState(null)

  // mini-function to generate random numbers
  // this is an utils of gsap
  const random = (a, b) => { return gsap.utils.random(a, b, 1) }

  // first time load
  useEffect(() => { NewQuote() }, [firstInit])


  // Function to change the background with animation &
  // and request to get new quote
  const NewQuote = async () => {

    // Differents timelines initialization for the two animations
    const TL = gsap.timeline()
    const TL2 = gsap.timeline()

    // Vanishing all the contents the #quote-box container
    TL.to("#quote-box *", { opacity: 0, duration: .3 })

    // getting the new quote
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "dqB2c4TR3nebdrhkFYBUuw==ZxSVuV2Qi2tLRCV2");

    // requestOptions
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const newQuote = await fetch("https://api.api-ninjas.com/v1/quotes", requestOptions)
      .then(response => response.json())

    if (newQuote !== null) {

      // Generation colors with the gsap random utility function
      const primaryColor = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`

      // setting the new quote
      setCurrentQuote(newQuote[0])

      TL2
        .to(["#quote-box *"], { opacity: 1, duration: .5 }, 1)
        .to(["#root", ".bar a"], {
          backgroundColor: primaryColor, duration: .3
        }, 1)
        .to("#quote-box", {
          color: primaryColor, duration: .3
        }, -1)
    }
  }

  return (
    <>
      {/* Helmet :: a react library to control the head tag of
    an html page */}
      <Helmet>
        <title>Random Quote App</title>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        />
      </Helmet>
      {/* Quote box & children */}
      <div id="quote-box">
        <div id="text">
          <p>
            {currentQuote?.quote}
          </p>
        </div>
        <div id="author">
          {currentQuote?.author}
        </div>
        <div className="bar">
          <a
            id="new-quote"
            onClick={(e) => NewQuote(e)}
          >
            New quote
          </a>
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${currentQuote?.quote} ${currentQuote?.author}`}
            title="Tweet this quote!"
            target="_blank"
          >
            <i className="fa fa-twitter"></i>
          </a>
        </div>
      </div>

      {/* End Quote box & children */}

      <p id="me">by Apelete ADZOHONOU</p> {/* The name of the constructor.....ME */}
    </>
  )
}

export default App
