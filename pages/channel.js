import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

function Channel({ channel, audios, series }) {
    return (
        
        <div>
            <header> Podcast </header>
             <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original || channel.urls.logo_image.original })` }} />
      <h1>{ channel.title }</h1>

      { series.length > 0 &&
        <div>
          <h2>Series</h2>
          <div className="channels">
            { series.map((serie) => (
              <Link  href={`/channel?id=${ serie.id }`} prefetch key={serie.id}>
                <a className="channel">
                  <img src={ serie.urls.logo_image.original } alt=""/>
                  <h2>{ serie.title }</h2>
                </a>
              </Link>
            ))}
          </div>
        </div>
      }

      <h2>Ultimos Podcasts</h2>
      { audios.map((audio) => (
        <Link href={`/podcast?id=${audio.id}`} prefetch key={audio.id}>
          <a className='podcast'>
            <h3>{ audio.title }</h3>
            <div className='meta'>
              { Math.ceil(audio.duration / 60) } minutes
            </div>
          </a>
        </Link>
      ))}
        

        <style jsx>{`
        header {
            color: #fff;
            background: #8756ca;
            padding: 15px;
            text-align: center;
            font-size: 1.25rem;
            font-weight: bold;
        }

        .banner {
          width: 100%;
          padding-bottom: 25%;
          background-position: 50% 50%;
          background-size: cover;
          background-color: #aaa;
        }

        .channels {
          display: grid;
          grid-gap: 15px;
          padding: 15px;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        }
        a.channel {
          display: block;
          margin-bottom: 0.5em;
          color: #333;
          text-decoration: none;
        }
        .channel img {
          border-radius: 3px;
          box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
          width: 100%;
        }
        h1 {
          font-weight: 600;
          padding: 15px;
        }
        h2 {
          padding: 5px;
          font-size: 0.9em;
          font-weight: 600;
          margin: 0;
          text-align: center;
        }

        .podcast {
          display: block;
          text-decoration: none;
          color: #333;
          padding: 15px;
          border-bottom: 1px solid rgba(0,0,0,0.2);
          cursor: pointer;
        }
        .podcast:hover {
          color: #000;
        }
        .podcast h3 {
          margin: 0;
        }
        .podcast .meta {
          color: #666;
          margin-top: 0.5em;
          font-size: 0.8em;
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: system-ui;
          background: white;
        }
      `}</style>
        </div>
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