import { useEffect } from 'react'

const Adbanner = () => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch (e) {
            console.log(e.message)
        }
    }, [])
    return (
        <ins
            className='adsbygoogle'
            style={{ display: 'block' }}
            data-ad-client="ca-pub-7821123844488998"
            data-ad-slot="4962970453"
            data-ad-format="auto"
            data-full-width-response="true"
        >
        </ins>
    )
}

export default Adbanner