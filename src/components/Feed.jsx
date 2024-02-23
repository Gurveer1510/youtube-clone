import { useState, useEffect } from "react"

import { Box, Stack, Typography } from '@mui/material'
import { SideBar, Videos } from "./"

import { fetchFromAPI } from "../utils/fetchFromApi"

function Feed() {

  const [selectedCategory, setSelectedCategory] = useState('New')
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    setVideos(null)
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => {
        setVideos(data.items)
        setLoading(false)
      }).catch((error) => {
        setError(true)
        setLoading(false)
      }).finally(() => setLoading(false))


  }, [selectedCategory])

  return (
    <Stack sx={{ flexDirection: { sx: 'column', md: 'row' } }}>

      <Box sx={{
        height: { sx: 'auto', md: '92vh' }
        , borderRight: '1px solid #3d3d3d', px: { sm: 0, md: 2 }
      }}>
        <SideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

        <Typography className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: '#fff' }}
        >

          Copyright 2024 Youtube
        </Typography>
      </Box>

      <Box p={2}
        sx={{
          overflowY: 'auto',
          height: '90vh',
          flex: 3
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
          {selectedCategory} <span style={{ color: "#FC1503", fontWeight: "bold" }}>videos</span>
        </Typography>


        {
          loading && (<h1 style={{color: '#fff'}}>Loading...</h1>)
        }
        {
          error == true ? (<h1 style={{color: 'white'}}>Something went wrong</h1>) : <Videos videos={videos} />
        }
        

      </Box>



    </Stack>
  )
}

export default Feed