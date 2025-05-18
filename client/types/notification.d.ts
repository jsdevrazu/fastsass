interface NotificationResponse {
  message: string;
  notifications?: (NotificationsEntity)[] | null;
}
 interface NotificationsEntity {
  type: string;
  status: string;
  title: string;
  message: string;
  created_at: string;
  _id: string;
  firstname?: (null)[] | null;
  lastname?: (null)[] | null;
}
