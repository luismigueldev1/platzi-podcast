export default function() {
    return (
        <div>
            <h1>¡Hola Mundo en NextJS! </h1>
            <img src="./static/nextjs.png" alt="wifi"/>
            <style jsx>{`
            div{
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-family: nunito, sans-serif;
                
            
            }
            img{
                width: 200px;
                height: 200pxpx;

            }
            h1{
                text-align: center;
            }
            `}
            </style>

            <style jsx global>{`
                *{
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body{
                    background-color: #f7be16;
                }

            `}</style>
        </div>



    )
}
