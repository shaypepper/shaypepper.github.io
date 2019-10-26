/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import QuantifiedSelfLayout from "./quanitifedSelfLayout"
import HappiestShoes from "../../components/happiestShoes"
import BlogPost from "../../components/blogText"

const Shoes = ({ children }) => {
  return (
    <QuantifiedSelfLayout>
      {" "}
      <HappiestShoes />
      <BlogPost>
        <p>
          My aunt was in town one weekend. I had no idea when she sent me a
          photo of the John Fluevog store that my shopping habits were about to
          completely change. I quickly fell in love with the brand, but
          obviously the shoes were expensive. My husband Zack changed things
          when he bought me a pair on my birthday that turned out to be the most
          comfortable pair of shoes I have ever owned. The flowered Leaders.
        </p>
        <p>
          Since then, I have frequented second hand websites and John Fluevog
          sales in-store. I have built a high quality shoe collection from the
          ground up over the last year and a half. Most are Fluevogs, but some
          are from other companies.{" "}
        </p>
        <p>
          When thinking about how to visualize one of my favorite parts of my
          day, choosing shoes, I knew I wanted images of each shoe. Shoes like
          mine are only interesting when you can see them. I created a data set
          from online purchase data and a very helpful sales associate from the
          Fluevog store. I had the obvious price, location, date information for
          all of them. I did take some time to document heel height, colors, and
          a few other attributes. At the end of the day, I just didn't find
          those things interesting enough for a visualization. The theme is
          building a shoe collection, so time and price were the most relevant
          attributes.
        </p>
        <p>
          Like the dog photos, I used shapes in Tableau to show photos. One
          thing I felt strongly about was not using tooltips since it obscured
          the chart itself. This is where I began to explore Tableau actions.
          One thing I wanted was for a show to be highlighted in both charts if
          it was highlighted in the other. I also wanted an image of the shoe to
          exist embedded in the visualization. Basically, I wanted hover
          functionality without tooltips. This was tricky. I needed to create a
          workbook that had the photo and description of each shoe but was
          broken out into pages. I then needed this to be in the tooltips in
          each of the charts. Then I needed the tooltips to turned off on those
          charts. This linked everything together so that the photo could change
          in the upper righthand corner. The other thing that made this tricky
          was that on tableau desktop, the hover functionality actually doesn't
          work (!). Through some freak accident, I realized that it would work
          once it was uplodaed, just not on my desktop as I work on it.
        </p>
        <p>
          {" "}
          Overall I really love that this visualization is simple and clean
          while including enough design to be impressive. It doesn't
          over-communicate or overwhelm, but showcases my precious precious
          shoes. I suppose in a lot of ways they do speak for themselves
        </p>
        <p>
          In the future I'd like to have more shoes in this visualization
          (because I've purchased more).
        </p>
      </BlogPost>
    </QuantifiedSelfLayout>
  )
}

Shoes.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Shoes
