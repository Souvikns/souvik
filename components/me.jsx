import {
    Box,
    Avatar,
    Text,
    Flex,
    Spacer,
    Link
} from '@chakra-ui/react';

const avatarUrl = 'https://avatars.githubusercontent.com/u/41781438?v=4';

function Me() {
    return <Box py={4}>
        <Flex>
            <Box>
                <Text fontSize="lg" fontWeight="bold">Hi There 👋</Text>
                <Text>
                    This is Souvik, CS UG Senior Student and a self-taught software developer from India. I am also a maitainer at <Link color="blue.400" href="https://github.com/asyncapi" isExternal >AsyncAPI</Link>.
                </Text>
            </Box>
            <Spacer />
            <Box w="100px" />
            <Spacer />
            <Box>
                <Avatar src={avatarUrl} size="xl" />
            </Box>

        </Flex>
    </Box>
}

export default Me