/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import QuantifiedSelfLayout from "./quanitifedSelfLayout"
import HappiestDog from "../../components/happiestDog"
import BlogPost from "../../components/blogText"

const Dog = () => {
  return (
    <QuantifiedSelfLayout>
      {" "}
      <HappiestDog />{" "}
      <BlogPost>
        <p>
          During our undergrad years, my husband and I were broke. Really broke.
          And therapy is expensive. My husband began working for a suicide
          prevention hotline, and I was concerned for his mental health. I
          insisted he needed a dog in his life. So we adopted Mousse.
        </p>
        <p>
          Perhaps unsurprisingly, dogs don't naturally produce much data
          throughout their day. We humans, however do take lots of pictures. I
          have has an embarassing number of photos of Mousse printed on canvas
          littered throughout our house. (Actually as I type this, my husband
          knocked one off the wall throwing a toy for Mousse to catch.){" "}
        </p>
        <p>
          I've always liked the github contribution graph, so I chose to use
          that style. It took a little bit of work to make the breaks on the
          years so that the format was more logical. Of course no visualization
          about pictures can exist <i>without</i> pictures, so I needed those to
          be in the tooltip. I used shapes to do that which wasn't as tedious as
          I anticipated. Probably because I had learned some tricks from having
          done the shoe visualization already. One particular problem that came
          up was that there were some months that only had videos or had no
          photos at all. I used an old SVG illustration of Mousse that I created
          earlier this year for that.
        </p>
        <p> Enjoy my adorable dog!</p>
      </BlogPost>
    </QuantifiedSelfLayout>
  )
}

Dog.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Dog
