import {Container, Flex, Spacer, Box} from '@chakra-ui/react';

export default () => {

    return <div>
        <Container maxW="container.md">
            <Flex>
                <Box p={4}>
                    Souvik
                </Box>
                <Spacer />
                <Box p={4}>
                    Light
                </Box>
            </Flex>
        </Container>        
    </div>
}