import {Box, useColorModeValue} from "@chakra-ui/react";

interface IProps {
    children: React.ReactNode
}

export const PriceWrapper = (props: IProps) => {
    const { children } = props

    return (
        <Box
            mb={4}
            shadow="base"
            borderWidth="1px"
            alignSelf={{ base: 'center', lg: 'flex-start' }}
            borderColor={useColorModeValue('gray.200', 'gray.500')}
            borderRadius={'xl'}>
            {children}
        </Box>
    )
}