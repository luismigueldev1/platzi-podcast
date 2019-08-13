import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import Error from './_error'

function Home({ channels, statusCode }) {
    
    if(statusCode !== 200){
        return <Error statusCode={statusCode}/>
    } 
        
    return (        
        <Layout title="App de Podcasts Platzi">
            <ChannelGrid channels={channels}/>
         </Layout>
    )
}
Home.getInitialProps = async ({ res }) => {
    try{
        const req = await fetch('https://api.audioboom.com/channels/recommended')
        const { body : channels} = await req.json()
        return { channels, statusCode: 200 }
    }catch(error){
        res.statusCode = 503
        return { channels: null, statusCode: 503 }
    }


    
}

export default Home