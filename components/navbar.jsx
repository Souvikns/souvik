import {
    Flex,
    Spacer,
    Box,
    Text,
    IconButton,
    useColorMode,
    Center
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';


function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    return <Flex>
        <Box py={4}>
            <Center py={4} >

                <Text fontSize="lg" fontWeight="bold">Souvik</Text>
            </Center>
        </Box>
        <Spacer />
        <Box py={4}>
            <IconButton
                icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
                onClick={toggleColorMode}
            />
        </Box>
    </Flex>
}

export default Navbar;
