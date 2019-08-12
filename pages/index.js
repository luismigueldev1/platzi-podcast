import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';

function Home({ channels }) {
    return (        
        <Layout title="App de Podcasts Platzi">
            <ChannelGrid channels={channels}/>
         </Layout>
    )
}
Home.getInitialProps = async () => {
    const req = await fetch('https://api.audioboom.com/channels/recommended')
    const { body : channels} = await req.json()
    return { channels }
}

export default Home