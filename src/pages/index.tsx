import { Map } from '@/components/Map';
import Wrapper from '@/components/Wrapper/Wrapper'
import { FullPage } from '@/shared/Global.styles';
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

// import { Menu } from '@/components/Menu'
// Particles.init({
//   selector: '.background',
//   sizeVariations: 30,
//   color: [
//     '#0bd', 'rgba(0,187,221,.5)', 'rgba(0,187,221,.2)'
//   ]
// });
function Home({  }: any) {
  const [sightings, setSightings]: any = useState(null)

  useEffect(() => {
    const getSightings = async () => {
      fetch(`/api/sightings`, {
        method: 'GET',
      }).then((res) => {
        console.log('res: ', res)
        const { body }: any = res.json()
        console.log('body: ', body)
        const { totalSightings } = body
        console.log('totalSightings: ', totalSightings)
        return totalSightings
      })
    }

    getSightings().then((res: any) => {
      localStorage.setItem('sightingsCache', JSON.stringify(res))
      setSightings(res)
    })
    // if (!sightingsCache) {

    // } else {
    //   if (sightingsCache) {
    //     console.log('sightingsCache: ', sightingsCache)
    //     setSightings(sightingsCache)
    //   }
    // }
  }, [])

  return (
    <FullPage>
      <Wrapper>
        <AnimatePresence>
          <Map sightings={sightings} />
        </AnimatePresence>
      </Wrapper>
    </FullPage>
  )
}

// export async function getServerSideProps() {
//   const totalSightings = await getAllSightings()
//   console.log('totalSightings: ', totalSightings)
//   return {
//     props: {
//       totalSightings,
//     },
//   }
// }

export default Home
