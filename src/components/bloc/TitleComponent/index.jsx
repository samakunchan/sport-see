import './index.scss';

const TitleComponent = ({ user }) => {
  return user ? (
    <h1 className={'user-title'}>
      Bonjour <span className={'firstname'}>{user.userInfos.firstName}</span>
    </h1>
  ) : (
    <h1 className={'user-title'}>
      Bonjour <span className={'firstname'}>[utilisateur]</span>
    </h1>
  );
};

export default TitleComponent;
