import React, {useState} from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import PodcastList from '../components/PodcastList'
import Error from './_error'


function Channel({ channel, audios, series, statusCode }) {
  const [ openPodcast, setOpenPodcast ] = useState(null)

  const handleOpenPodcast = (event, podcast) =>{
    event.preventDefault()
    setOpenPodcast(podcast)
  }
  if(statusCode !== 200){
    return <Error statusCode={statusCode}/>
  }

  return (
    <Layout title={channel.title}>
      <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original || channel.urls.logo_image.original})` }} />

      {openPodcast && <div>Hay un podcast abierto</div>}
      <h1>{channel.title}</h1>
      {series.length > 0 &&
        <>
          <h2>Series</h2>
          <ChannelGrid channels={series} />
        </>
      }
      <PodcastList audios={audios} openPodcast={handleOpenPodcast}/>

      <style jsx>{`
        .banner {
          width: 100%;
          padding-bottom: 25%;
          background-position: 50% 50%;
          background-size: cover;
          background-color: #aaa;
        }
        h2 {
          padding: 5px;
          font-size: 0.9em;
          font-weight: 600;
          margin: 0;
          text-align: center;
          }
        h1 {
          font-weight: 600;
          padding: 15px;
        }
        `}</style>
    </Layout>
  )
}

Channel.getInitialProps = async ({ query, res }) => {
  const idChannel = query.id
  try{
    const [reqChannel, reqAudios, reqSeries] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${idChannel}`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
    ])
    if(reqChannel.status >= 400){
      res.statusCode = reqChannel.status
      return { channel: null, audio: null, series: null, statusCode: 404}
    }
    const dataChannel = await reqChannel.json()
    const channel = dataChannel.body.channel
  
    const dataAudios = await reqAudios.json()
    const audios = dataAudios.body.audio_clips
  
    const dataSeries = await reqSeries.json()
    const series = dataSeries.body.channels

    return { channel, audios, series, statusCode: 200 }

  }catch(error){
    return { channel: null, audio: null, series: null, statusCode: 503}
  }
  
}

export default Channel