'use client'

import {
    Flex,
    Box,
    Stack,
    Heading,
    useColorModeValue,
    FormControl,
    Input, FormLabel, Button, FormErrorMessage, Center, Checkbox,
} from '@chakra-ui/react'
import {useForm} from "react-hook-form";
import {useUserActions} from "@entities";
import {addUserToDB} from "../api";
import {useState} from "react";

export const RegisterForm = () => {
    const userActions = useUserActions()
    const [passwordType, setPasswordType] = useState("password")
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()
    function onSubmit(values) {
        addUserToDB(values.username, values.email, values.password).then(r => userActions.afterLogin(r))
    }
    return (
        <Flex
            minH={'50vh'}
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Регистрация</Heading>
                </Stack>
                <Box
                    rounded={'xl'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'xl'}
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
                            <FormControl isInvalid={errors.email}>
                                <FormLabel htmlFor='email'>Электронная почта</FormLabel>
                                <Input
                                    id='email'
                                    placeholder='Электронная почта'
                                    {...register('email', {
                                        required: 'Это необходимо',
                                        minLength: { value: 4, message: 'Минимальная длина 4 символа' },
                                        maxLength: { value: 64, message: 'Максимальная длина 64 символа' },
                                        validate: {
                                            matchPattern: (v) =>
                                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                                                "Введите верную электронную почту",
                                        }
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.email && errors.email.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.password}>
                                <FormLabel htmlFor='email'>Пароль</FormLabel>
                                <Input
                                    type={passwordType}
                                    id='password'
                                    placeholder='Пароль'
                                    {...register('password', {
                                        required: 'Это необходимо',
                                        minLength: { value: 7, message: 'Минимальная длина 7 символов' },
                                        maxLength: { value: 50, message: 'Максимальная длина 50 символов' },
                                        validate: (v: string) => {
                                            if (watch('rp_password') != v) {
                                                return "Пароль не совпадют";
                                            }
                                        }
                                    })}

                                />
                                <FormErrorMessage>
                                    {errors.password && errors.password.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.rp_password}>
                                <FormLabel htmlFor='rp_password'>Повторите пароль</FormLabel>
                                <Input
                                    type={passwordType}
                                    id='rp_password'
                                    placeholder='Повторите пароль'
                                    {...register('rp_password', {
                                        required: 'Это необходимо',
                                        minLength: { value: 7, message: 'Минимальная длина 7 символов' },
                                        maxLength: { value: 50, message: 'Максимальная длина 50 символов' },
                                        validate: (v: string) => {
                                            if (watch('password') != v) {
                                                return "Пароль не совпадют";
                                            }
                                        }
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.rp_password && errors.rp_password.message}
                                </FormErrorMessage>
                            </FormControl>
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
                                    Зарегистрироваться
                                </Button>
                            </Center>
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}