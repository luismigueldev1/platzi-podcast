import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import PodcastList from '../components/PodcastList'


function Channel({ channel, audios, series }) {
  return (
    <Layout title={channel.title}>
      <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original || channel.urls.logo_image.original})` }} />
      <h1>{channel.title}</h1>
      {series.length > 0 &&
        <>
          <h2>Series</h2>
          <ChannelGrid channels={series} />
        </>
      }
      <PodcastList audios={audios}/>

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

Channel.getInitialProps = async ({ query }) => {
  const idChannel = query.id

  const [reqChannel, reqAudios, reqSeries] = await Promise.all([
    fetch(`https://api.audioboom.com/channels/${idChannel}`),
    fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
    fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
  ])

  const dataChannel = await reqChannel.json()
  const channel = dataChannel.body.channel

  const dataAudios = await reqAudios.json()
  const audios = dataAudios.body.audio_clips

  const dataSeries = await reqSeries.json()
  const series = dataSeries.body.channels


  return { channel, audios, series }
}

export default Channel