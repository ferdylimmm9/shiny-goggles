import { notifications, NotificationData } from '@mantine/notifications';
import { CheckCircle, Info, XCircle } from '@phosphor-icons/react';
import { color } from 'styles/color';

const styles = {
  icon: {
    backgroundColor: 'transparent',
  },
};

const notification = {
  info: (props: NotificationData) => {
    return notifications.show({
      ...props,
      icon: <Info weight="fill" size={50} color={color.blue50} />,
      styles,
    });
  },
  success: (props: NotificationData) => {
    return notifications.show({
      ...props,
      icon: <CheckCircle weight="fill" size={50} color={color.green50} />,
      styles,
    });
  },
  error: (props: NotificationData) => {
    return notifications.show({
      ...props,
      icon: <XCircle weight="fill" size={50} color={color.red50} />,
      styles,
    });
  },
};

export default notification;
