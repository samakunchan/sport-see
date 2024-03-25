import './index.scss';

const TitleComponent = ({ user }) => {
  return (
    <h1 className={'user-title'}>
      Bonjour
      <span className={'firstname'}> {user ? user.userInfos.firstName : `[utilisateur]`}</span>
    </h1>
  );
};

export default TitleComponent;
