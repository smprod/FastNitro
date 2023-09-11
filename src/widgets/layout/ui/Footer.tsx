'use client'

import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { FaDiscord } from 'react-icons/fa'
import {SocialButton} from "@shared";

export const Footer = () => {
    return (
        <Box
            bg={useColorModeValue('gray.200', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>

                <Text>© 2023 Fast Nitro. All rights reserved</Text>
                <Stack direction={'row'} spacing={6}>
                    <SocialButton label={'Discord'} href={'https://discord.gg/h5mwFCFc7e'}>
                        <FaDiscord/>
                    </SocialButton>
                </Stack>
            </Container>
        </Box>
    )
}