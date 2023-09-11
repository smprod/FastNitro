'use client'

import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Image,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import logo from "@widgets/layout/assets/navbar/nitro_logo.png"
import {Link} from "react-router-dom";
import {NavbarLink} from "@shared";
import {useRecoilValue} from "recoil";
import {sessionState, useUserActions} from "@entities";
const MenuItems = () => {
    const userActions = useUserActions()
    const session = useRecoilValue(sessionState)
    if (!session) {
        return <>
            <Link to={"/register"}>
                <MenuItem>Зарегистрироваться</MenuItem>
            </Link>
            <Link to={"/login"}>
                <MenuItem>Войти</MenuItem>
            </Link>
        </>

    } else {
        return <>
            <Link to={"/profile"}>
                <MenuItem>Личный кабинет</MenuItem>
            </Link>
            <MenuItem>Мои покупки</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => userActions.logOut()}>Выйти</MenuItem>
        </>
    }
}
export const Navbar = () => {
    const session = useRecoilValue(sessionState)
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box boxSize='70px'>
                            <Link to={"/"}>
                                <Image src={logo}/>
                            </Link>
                        </Box>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            <NavbarLink key="Политика" href={"/policy"}>Политика</NavbarLink>
                            <NavbarLink key="Discord" href={"https://discord.gg/h5mwFCFc7e"}>Discord</NavbarLink>
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Box mr={2}>{session?.username}</Box>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                />
                            </MenuButton>
                            <MenuList>

                                <MenuItems/>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <NavbarLink key="Политика" href={"/policy"}>Политика</NavbarLink>
                            <NavbarLink key="Discord" href={"https://discord.gg/h5mwFCFc7e"}>Discord</NavbarLink>
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    )
}