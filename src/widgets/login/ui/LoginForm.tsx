'use client'

import {
    Flex,
    Box,
    Stack,
    Heading,
    useColorModeValue, FormControl, FormLabel, Input, FormErrorMessage, Center, Button, Checkbox, Text
} from '@chakra-ui/react'
import {useForm} from "react-hook-form";
import {authenticateUser} from "../api/authenticateUser.ts";
import {useUserActions} from "@entities";
import {useState} from "react";

export const LoginForm = () => {
    const userActions = useUserActions()
    const [passwordType, setPasswordType] = useState("password")
    const [requestError, setRequestError] = useState("")
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()
    function onSubmit(values) {
        authenticateUser(values.username, values.password).then(r =>
            console.log(r)
        ).catch(error =>
            console.log(error)
        )
    }
    return (
        <Flex
            minH={'50vh'}
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Войти в аккаунт</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl isInvalid={errors.username}>
                                <FormLabel htmlFor='username'>Имя пользователя</FormLabel>
                                <Input
                                    id='username'
                                    placeholder='Имя пользователя'
                                    {...register('username', {
                                        required: 'Это необходимо',
                                        minLength: { value: 4, message: 'Минимальная длина 4 символа' },
                                        maxLength: { value: 30, message: 'Максимальная длина 30 символов' },
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.username && errors.username.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.password}>
                                <FormLabel htmlFor='password'>Пароль</FormLabel>
                                <Input
                                    type={passwordType}
                                    id='password'
                                    placeholder='Пароль'
                                    {...register('password', {
                                        required: 'Это необходимо',
                                        minLength: { value: 7, message: 'Минимальная длина 7 символов' },
                                        maxLength: { value: 50, message: 'Максимальная длина 50 символов' },
                                    })}

                                />
                                <FormErrorMessage>
                                    {errors.password && errors.password.message}
                                </FormErrorMessage>
                            </FormControl>
                            <Center>
                                <Text color={"red"}>{requestError}</Text>
                            </Center>
                            <Center>
                                <Checkbox onChange={() =>(passwordType === "password") ? setPasswordType("text") : setPasswordType("password")}>
                                    Показать пароль
                                </Checkbox>
                            </Center>
                            <Center>
                                <Button
                                    type={"submit"}
                                    mt={2}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    isLoading={isSubmitting}>
                                    Войти
                                </Button>
                            </Center>
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}