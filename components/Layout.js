import  Link  from 'next/link'
import Head from 'next/head'
function Layout({children, title}){
    return(
        <>
        <Head>
            <title>{title}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <header> <Link href="/"><a>Podcasts</a></Link></header>
        {children}


        <style jsx>{`
            header {
                color: #fff;
                background: #8756ca;
                padding: 15px;
                text-align: center;
                font-size: 1.25rem;
                font-weight: bold;
            }

            header a{
                color: #fff;
                text-decoration: none;
            }
        `}
        </style>
        <style jsx global>{`
        body {
            margin: 0;
            font-family: system-ui;
            background: white;
        }
        `}</style>

        </>
    )

}

export default Layout