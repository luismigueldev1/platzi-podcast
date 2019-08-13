import { Link } from '../routes'
import slug from '../helpers/slug';
function PodcastList({ audios, openPodcast }) {
  return (
    <>
      <h2>Ultimos Podcasts</h2>
      {audios.map((audio) => (
        <Link route="podcast" params={{
          slugChannel : slug(audio.channel.title),
          idChannel : audio.channel.id,
          slug: slug(audio.title),
          id: audio.id
          }} 
          prefetch key={audio.id}
        >
          <a className='podcast' 
            onClick={event => openPodcast(event, audio)}
          >
            <h3>{audio.title}</h3>
            <div className='meta'>
              {Math.ceil(audio.duration / 60)} minutes
                    </div>
          </a>
        </Link>
      ))}

      <style jsx>{`
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
    </>
  )
}
export default PodcastList