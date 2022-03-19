import { Box, Alert, AlertIcon, Image, Center } from '@chakra-ui/react';

export default () => {
    return <div>
        <Box p={4}>
            <Alert status='warning'>
                <AlertIcon />
                Under Construction
            </Alert>
        </Box>

        <Box p={4}>
            <Center>
                <Image src='./wip.png' />
            </Center>
        </Box>
    </div>
}