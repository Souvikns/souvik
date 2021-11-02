import {Box, Stack, Badge, Link} from '@chakra-ui/react';

function Socials(){
    return <Box py={4}>
        <Stack direction="row">
            <Badge colorScheme="green" fontSize="md">
                <Link href="https://github.com/Souvikns">Github</Link>
            </Badge>
            <Badge colorScheme="linkedin" fontSize="md">
                <Link href="https://www.linkedin.com/in/souvik-de-a2b941169/">Linkedin</Link>
            </Badge>
            <Badge colorScheme="purple" fontSize="md">
                <Link href="https://twitter.com/souvik_ns" >Twitter</Link>
            </Badge>
        </Stack>
    </Box>
}

export default Socials;