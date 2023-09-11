'use client'

import {
    Box, Button, Center, Checkbox,
    Flex, FormControl, FormErrorMessage,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react'
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useRecoilValue} from "recoil";
import {sessionState} from "@entities";
import {changePassword} from "../api/changePassword.ts";
export const ChangePasswordCard = () => {
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()
    const session = useRecoilValue(sessionState)
    const [passwordType, setPasswordType] = useState("password")
    function onSubmit(values) {
        if (!session) {
            return "UNAUTHORIZED"
        }
        console.log(session)
        changePassword(session.username, values.old_password, values.password)
    }
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={"2"}>

                            <FormControl isInvalid={errors.old_password}>
                                <InputGroup>
                                    <InputLeftAddon children={'Старый пароль'}/>
                                    <Input id={"old_password"}
                                           type={passwordType}
                                           placeholder='Старый пароль'
                                           size='md'
                                           {...register('old_password', {
                                               required: 'Это необходимо',
                                               minLength: { value: 4, message: 'Минимальная длина 7 символа' },
                                               maxLength: { value: 64, message: 'Максимальная длина 50 символа' },
                                           })}/>
                                </InputGroup>
                                <FormErrorMessage>
                                    {errors.old_password && errors.old_password.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.password}>
                                <InputGroup>
                                    <InputLeftAddon children={'Новый пароль'}/>
                                    <Input id={"password"}
                                           type={passwordType}
                                           placeholder='Новый пароль'
                                           size='md'
                                           {...register('password', {
                                               required: 'Это необходимо',
                                               minLength: { value: 4, message: 'Минимальная длина 7 символа' },
                                               maxLength: { value: 64, message: 'Максимальная длина 50 символа' },
                                               validate: (v: string) => {
                                                   if (watch('repeat_password') != v) {
                                                       return "Пароль не совпадют";
                                                   }
                                               }
                                           })}/>
                                </InputGroup>
                                <FormErrorMessage>
                                    {errors.password && errors.password.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.repeat_password}>
                                <InputGroup>
                                    <InputLeftAddon children={'Повторите новый пароль'}/>
                                    <Input id={"repeat_password"}
                                           type={passwordType}
                                           placeholder='Повторите новый пароль'
                                           size='md'
                                           {...register('repeat_password', {
                                               required: 'Это необходимо',
                                               minLength: { value: 4, message: 'Минимальная длина 7 символа' },
                                               maxLength: { value: 64, message: 'Максимальная длина 50 символа' },
                                               validate: (v: string) => {
                                                   if (watch('password') != v) {
                                                       return "Пароль не совпадют";
                                                   }
                                               }
                                           })}/>
                                </InputGroup>
                                <FormErrorMessage>
                                    {errors.repeat_password && errors.repeat_password.message}
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
                                    Изменить пароль
                                </Button>
                            </Center>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    )
}