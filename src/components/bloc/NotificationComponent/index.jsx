import './index.scss';

const NotificationComponent = ({ messageNotification }) => {
  return messageNotification && <p className={'notification'}>{messageNotification}</p>;
};

export default NotificationComponent;
