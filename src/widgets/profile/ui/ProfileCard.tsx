'use client'

import {
    Box,
    Button,
    Flex,
    HStack,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    Stack,
    useColorModeValue,
    PopoverTrigger,
    Popover,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    PopoverBody,
    PopoverCloseButton,
} from '@chakra-ui/react'
import {useRecoilValue} from "recoil";
import {sessionState, useUserActions} from "@entities";
import {useNavigate} from "react-router-dom";
import { deleteAccount } from '../api/deleteAccount';

export const ProfileCard = () => {
    const userActions = useUserActions()
    const navigate = useNavigate()
    const session = useRecoilValue(sessionState)
    return (
        <Flex
            minH={'50vh'}
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} minW={'md'} maxW={'50rem'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Профиль</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={"2"}>
                        <InputGroup>
                            <InputLeftAddon children={'Имя пользователя'}/>
                            <Input value={session?.username} isReadOnly placeholder='Имя пользователя' size='md' />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon children={'Электронная почта'}/>
                            <Input value={session?.email} isReadOnly placeholder='Электронная почта' size='md' />
                        </InputGroup>
                        <HStack>
                            <InputGroup>
                                <InputLeftAddon children={'Пароль'}/>
                                <Input value={"********"} type={"password"} isReadOnly placeholder='Пароль' size='md' />
                            </InputGroup>
                            <Button onClick={() => navigate("/changepassword")}>Изменить</Button>
                        </HStack>
                        <Popover>
                            <PopoverTrigger>
                                <Button w="full" colorScheme="red">
                                    Удалить аккаунт
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Удаление аккаунта</PopoverHeader>
                                <PopoverBody>Вы уверены что хотите удалить аккаунт? Назад его уже не вернуть</PopoverBody>
                                <PopoverBody>
                                    <Button onClick={() => deleteAccount().then(userActions.logOut)} w="full" colorScheme="red">
                                        Удалить
                                    </Button>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>

                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}