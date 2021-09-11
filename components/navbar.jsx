import { Box, Flex } from "@theme-ui/components";

const Navbar = () => {
  return (
    <Box py={5}>
      <Flex>
        <Box sx={{ flex: "1 1 auto" }}></Box>
        <Box px={2}>Home</Box>
        <Box px={2}>About</Box>
        <Box px={2}>Blog</Box>
        <Box px={2}>Resume</Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
