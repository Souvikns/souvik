import {Box, Flex} from 'theme-ui';
export default () => {
	return <Box px={7} bg="primary">
		<Box py={4}>
			<Flex>
				<Box py={4} sx={{flex: '1 1 auto'}}> </Box>
				<Box px={2}>Home</Box>
				<Box px={2}>About</Box>
				<Box px={2}>Blog</Box>
				<Box px={2}>Resume</Box>
			</Flex>
		</Box>
	</Box>
}