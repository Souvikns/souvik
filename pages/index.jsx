import { Box, Alert, AlertIcon } from '@chakra-ui/react'

export default () => {
    return <div>
        <Box p={4}>
            <Alert status='warning'>
                <AlertIcon />
                Under Construction
            </Alert>
        </Box>
    </div>
}