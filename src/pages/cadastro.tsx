"use client";
import React, { useState } from "react";
import InputComponent from "~/components/common/input/input";
import ButtonComponent from "~/components/common/button/buttton";
import NavbarComponent from "~/components/navbar/navbar";
import { HiOutlineEye } from "react-icons/hi";
import validator from 'validator';
import { api } from "~/utils/api";
import Link from "next/link";


const Register = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [pass, setPass] = useState("");
    const [passError, setPassError] = useState("");
    const [passConfirmation, setPassConfirmation] = useState("");
    const [passConfirmationError, setPassConfirmationError] = useState("");
    const [signInError, setSignInError] = useState("");
    const [nome, setNome] = useState("");
    const [nomeError, setNomeError] = useState("");
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const mutation = api.user.create.useMutation()

    const validate = () => {
        let flag = true;
        if (!validator.isEmail(email)) {
            setEmailError("Digite um email válido")
            flag = false;
        } else
            setEmailError("")
        if (!nome) {
            setNomeError("Digite uma nome antes de continuar");
            flag = false;
        } else
            setNomeError("");
        if (!pass) {
            setPassError("Digite uma senha antes de continuar");
            flag = false;
        } else
            setPassError("");
        if (passConfirmation != pass) {
            setPassConfirmationError("Senhas não são iguais");
            flag = true;
        } else
            setPassConfirmationError("")
        return flag
    }

    const onSubmit = async () => {

        const valid: boolean = validate();
        if (!valid)
            return;

        setLoadingSubmit(true);

        try {
            await mutation.mutateAsync({ email: email, password: pass, nome: nome });
        } catch {
            setSignInError("Error interno. Nos contate para resolvermos.")
        }

        setLoadingSubmit(false);
    };

    return (
        <>
            <div className="h-screen bg-gray-100">
                <NavbarComponent />
                <div className="bg-gray-100 flex items-center justify-center p-10">
                    <div className="py-4 flex flex-col gap-2 w-1/2">
                        <h2 className="text-2xl font-bold">Cadastro</h2>
                        <InputComponent
                            title="Email"
                            type="email"
                            placeholder="nome@email.com"
                            setValue={setEmail}
                            error={emailError}
                        />
                        <InputComponent
                            title="Nome"
                            type="text"
                            placeholder="Nome da Empresa"
                            setValue={setNome}
                            error={nomeError}
                        />
                        <InputComponent
                            title="Senha"
                            type="password"
                            placeholder="Senha"
                            setValue={setPass}
                            icon={<HiOutlineEye />}
                            error={passError}
                        />
                        <InputComponent
                            title="Confirmar Senha"
                            type="password"
                            placeholder="Senha"
                            setValue={setPassConfirmation}
                            icon={<HiOutlineEye />}
                            error={passConfirmationError}
                        />
                        <ButtonComponent text="Cadastro" text_color="text-white" clickFunction={onSubmit} loading={loadingSubmit} error={signInError} />
                        <p className='text-medium'> <Link href={"/auth/signin"}> Já tenho conta </Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;