import React from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  function handleSubmit(data: object): void {
    console.log(data);
  }
  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <Form initialData={{ name: 'Wolf' }} onSubmit={handleSubmit}>
          <h1>Registo</h1>
          <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Palavra-Passe"
          />
          <Button type="submit">Registar</Button>
          <a href="forgot">Recuperar senha</a>
        </Form>
        <a href="login">
          <FiArrowLeft />
          Voltar
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
