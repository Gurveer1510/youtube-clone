import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box, Typography } from '@mui/material'
import {  Videos } from "./"

import { fetchFromAPI } from "../utils/fetchFromApi"

function SearchFeed() {

  const {searchTerm} = useParams()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    setVideos(null)
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => {
        setVideos(data.items)
        setLoading(false)
      }).catch((error) => {
        setError(true)
        setLoading(false)
      }).finally(() => setLoading(false))


  }, [searchTerm])

  return (
    <Box p={2}
        sx={{
          overflowY: 'auto',
          height: '90vh',
          flex: 2
        }}
      >
        <Typography
          variant="h4"
          fontWeight='semibold'
          mb={2}

          sx={{
            color: 'white'
          }}
        >
          Search Results for <span style={{ color: "#FC1503", fontWeight: "bold" }}>{searchTerm}</span>
        </Typography>


        {
          loading && (<h1 style={{color: '#fff'}}>Loading...</h1>)
        }
        {
          error == true ? (<h1 style={{color: 'white'}}>Something went wrong</h1>) : <Videos videos={videos} />
        }
        

      </Box>
  )
}

export default SearchFeed