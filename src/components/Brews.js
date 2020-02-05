import React from 'react'
import Strapi from 'strapi-sdk-javascript/build/main'
import { Box, Heading, Text, Image, Card, Button } from 'gestalt'

const apiUrl = process.env.API_URL || "http://localhost:1337"
const strapi = new Strapi(apiUrl)

class Brews extends React.Component {

  state = {
    brews: [],
    brand: ''
  }

  async componentDidMount() {
    try {
      const response = await strapi.request('POST', '/graphql', {
        data: {
          query: `
          query {
            brand(id: "${this.props.match.params.brandId}" ) {
              _id
              name
              brews {
                _id
                name
                image {
                  url
                }
                price
              }
            }
          }
        `
        }
      })
      this.setState({
        brews: response.data.brand.brews,
        brand: response.data.brand.name
      })
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const { brand } = this.state
    return (
      <Box
        marginTop={4}
        display="flex"
        justifyContent="center"
        alignItems="start"
      >
        {/* Brews Section */}
        <Box display="flex" direction="column" alignItems="center">
          {/* Brews Heading */}
          <Box margin={2}>
            <Heading color="orchid">{brand}</Heading>
          </Box>
          {/* Brew */}
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: '#bcddd9'
              }
            }}
          >

          </Box>

        </Box>

      </Box>
    )
  }
}

export default Brews