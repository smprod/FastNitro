import {ReactNode} from "react";
import {NavLink} from "react-router-dom";
import {Box, useColorModeValue} from "@chakra-ui/react";

interface IProps {
    children: ReactNode
    href: string
}

export const NavbarLink = (props: IProps) => {
    const { children } = props
    const { href } = props
    return (
        <NavLink to={href}>
            <Box
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('gray.200', 'gray.700'),
                }}>
                {children}
            </Box>
        </NavLink>
    )
}
