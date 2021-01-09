import React from 'react';
import { FiClock, FiPower } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
} from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  console.log(user);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="logo GoBarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>A sua próxima marcação</strong>
            <div>
              <img
                src="https://avatars2.githubusercontent.com/u/57861255?s=460&u=fab67d1be099c5eebb9bcd5d51c95bd86070f8b4&v=4"
                alt="...."
              />

              <strong>Mr. Wolf</strong>
              <span>
                <FiClock />
              </span>
            </div>
          </NextAppointment>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
