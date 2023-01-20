import { Map } from '@/components/Map';
import { FullPage } from '@/shared/Global.styles';
import { violet } from '@radix-ui/colors';
import * as Separator from '@radix-ui/react-separator';
import styled from 'styled-components';

console.log('violet: ', violet)

const SeparatorRoot = styled(Separator.Root)`
  background-color: violet.violet6;
  /* '&[data-orientation=horizontal]': { height: 1, width: '100%' }, */
  /* '&[data-orientation=vertical]': { height: '100%', width: 1 }, */
`

function Home() {
  return (
    <FullPage>
      <Map />
    </FullPage>
  )
}

export default Home
