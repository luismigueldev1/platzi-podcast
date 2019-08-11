import fetch from 'isomorphic-unfetch'

function Channel({ channel, audios, series }) {
    return (
        <div>
            <header> Podcast </header>
            <h1>{channel.title}</h1>
           
            <h2>Series</h2>
            {series.map(serie => (
                <div key={serie.id}> { serie.title } </div>
            ))}

            <h2>Ultimos Podcasts</h2>
            {audios.map(audio => (
                <div key={audio.id}> { audio.title } </div>
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
                h2 {
                    padding: 5px;
                    font-size: 0.9em;
                    font-weight: 600;
                    margin: 0;
                    text-align: center;
                    }
                h1{
                    padding: 15px;
                    font-weight: 600;
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
    const reqChannel = await fetch(`https://api.audioboom.com/channels/${idChannel}`)
    const dataChannel = await reqChannel.json()
    const channel = dataChannel.body.channel

    const reqAudios = await fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
    const dataAudios = await reqAudios.json()
    const audios = dataAudios.body.audio_clips

    const reqSeries = await fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
    const dataSeries = await reqSeries.json()
    const series = dataSeries.body.channels
    return { channel, audios, series }
}
export default Channel