import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';

import { useToast } from '../../hooks/ToastContext';
import { Container, Content, AnimationContainer, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  // const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Adicione um email válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // recuperação de password

        // history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'erro na recuperação de palavra-passe',
          description: 'verifique email inserido',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar Password</h1>
            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
              autoComplete="username"
            />
            <Button type="submit">Recuperar</Button>
          </Form>
          <Link to="/">
            <FiLogIn />
            Voltar
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
