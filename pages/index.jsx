import {Container} from '@chakra-ui/react';
import Banner from '../components/banner';
import Me from '../components/me';

import Navbar from '../components/navbar';

export default () => {

    return <div>
        <Container maxW="container.md">
            <Navbar />
            <Banner />
            <Me />
        </Container>        
    </div>
}