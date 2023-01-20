import { FullPage } from '@/shared/Global.styles';
import { violet } from '@radix-ui/colors';
import * as Separator from '@radix-ui/react-separator';
import { Box, Flex, Text } from 'rebass';
import styled from 'styled-components';

console.log('violet: ', violet)

const SeparatorRoot = styled(Separator.Root)`
  background-color: violet.violet6;
  /* '&[data-orientation=horizontal]': { height: 1, width: '100%' }, */
  /* '&[data-orientation=vertical]': { height: '100%', width: 1 }, */
`

function Chat() {
  return (
    <FullPage>
      <Box
        sx={{
          maxWidth: 512,
          mx: 'auto',
          px: 3,
          background: violet.violet6,
        }}
      >
        <Text style={{ fontWeight: 500 }}>Liam's OpenAI GPT-3 Experiments</Text>
        <Text>Conversational Chatbot (Q&A)</Text>
        <SeparatorRoot style={{ margin: '15px 0' }} />
        <Flex style={{ height: 20, alignItems: 'center' }}>
          <Text>Next.js</Text>
          <SeparatorRoot
            decorative
            orientation='vertical'
            style={{ margin: '0 15px' }}
          />
          <Text>OpenAI</Text>
          <SeparatorRoot
            decorative
            orientation='vertical'
            style={{ margin: '0 15px' }}
          />
          <Text>NUROC Data</Text>
        </Flex>
        <Chat />
      </Box>
    </FullPage>
  )
}

export default Chat
