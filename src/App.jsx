import gsap from "gsap";
import Helmet from "react-helmet"
import "./App.css"

function App() {

  // mini-function to generate random numbers
  // this is an utils of gsap
  const random = (a, b) => { return gsap.utils.random(a, b, 1) }

  // Function to change the background with animation
  // and request to get new quote
  const NewQuote = (e) => {
    e.preventDefault()
    // Differents timelines initialization for the two animations
    const TL = gsap.timeline()
    const TL2 = gsap.timeline()

    // Generation colors with the gsap random utility function
    const primaryColor = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`

    // Vanishing all the contents the #quote-box container
    TL.to("#quote-box *", { opacity: 0, duration: .3 })

    // Provisoiry timeout to simulate the animations
    setTimeout(() => {
      TL2
        .to(["#quote-box *"], { opacity: 1, duration: .5 }, 1)
        .to(["#root", ".bar a"], {
          backgroundColor: primaryColor, duration: .3
        }, 1)
        .to("#quote-box", {
          color: primaryColor, duration: .3
        }, -1)
    }, 50)
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem, enim molestias.
          </p>
        </div>
        <div id="author">
          author
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
            href="https://twitter.com/intent/tweet"
            title="Tweet this quote!"
            target="_top"
            onClick={e => e.preventDefault()}
          >
            <i class="fa fa-twitter"></i>
          </a>
        </div>
      </div>
      {/* End Quote box & children */}

      <p id="me">by Apelete ADZOHONOU</p> {/* The name of the constructor.....ME */}
    </>
  )
}

export default App
