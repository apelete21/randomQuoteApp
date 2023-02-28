import gsap from "gsap";
import { useState } from "react";
import Helmet from "react-helmet"
import "./App.css"

function App() {

  const [getQuote, setGetQuote] = useState(true)

  const random = (a, b) => { return gsap.utils.random(a, b, 1) }

  console.log(random(5, 4));

  const NewQuote = (e) => {
    e.preventDefault()
    console.log(e);

    const TL = gsap.timeline()
    const TL2 = gsap.timeline()
    const primaryColor = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
    
    TL.to("#quote-box *", { opacity: 0, duration: .5 })
    
    setTimeout(() => {
      TL2
        .to(["#quote-box *"], { opacity: 1, duration: .5 }, 1)
        .to(["#root", ".bar a"], {
          backgroundColor: primaryColor , duration: .5
        }, 1)
        .to("#quote-box", {
          color: primaryColor , duration: .5
        }, -1)
    }, 300)
  }

  return (
    <>
      <Helmet>
        <title>Random Quote App</title>
      </Helmet>
      <div id="quote-box">
        <div id="text">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem, enim molestias.
          </p>
        </div>
        <div id="author">
          author
        </div>
        <div className="bar">
          <a id="new-quote" onClick={(e) => NewQuote(e)}>
            new quote
          </a>
          <a id="tweet-quote" href="https://twitter.com/intent/tweet"
            onClick={e => e.preventDefault()}
          >
            tweet quote
          </a>
        </div>
      </div>
      <p id="me">by Apelete ADZOHONOU</p>
    </>
  )
}

export default App
