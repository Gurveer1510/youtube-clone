import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import { Videos, ChannelCard } from './'
import { fetchFromAPI } from '../utils/fetchFromApi'

function ChannelDetail() {

  const { id } = useParams()
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([])

  // console.log(channelDetail, videos);

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]))

    fetchFromAPI(`search?part=snippet&channelId=${id}&order=date`)
      .then((data) => setVideos(data?.items))
  }, [id])


  return (
    <Box
      minHeight={'95vh'}
    >
      <Box>
        <div style={{
          background: 'linear-gradient(126deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
          zIndex: 10,
          height: '300px'
        }}>
        </div>
        <ChannelCard marginTop={'-110px'} channelDetail={channelDetail} />
      </Box>

      <Box
        display={'flex'}
        p='2'
      >
        <Box
          sx={{
            mr: { sm: '100px' }
          }}
        />
        <Videos videos={videos} />


      </Box>

    </Box>
  )
}

export default ChannelDetail