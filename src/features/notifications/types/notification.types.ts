export type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAtUtc: string;
  relatedEntityId: string | null;
  relatedEntityType: string | null;
};

export type UnreadNotificationCount = {
  count: number;
};
