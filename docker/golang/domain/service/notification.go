package service

import (
	"github.com/mimaken3/ShareIT-api/domain/model"
	"github.com/mimaken3/ShareIT-api/domain/repository"
)

type notificationServiceStruct struct {
	notificationRepo repository.NotificationRepository
}

// Application層はこのInterfaceに依存
type NotificationServiceInterface interface {
	// ユーザの通知一覧を取得
	FindAllNotificationsByUserID(userID uint) (resultNotifications []model.ResultNotification, err error)

	// 通知を追加
	CreateNotification(sourceUserID uint, notificationType uint, typeID uint, articleID uint) (notificationID uint, err error)

	// 通知の未読を既読にする
	ReadNotificationByNotificationID(notificationID uint) (resultNotification model.ResultNotification, err error)
}

// DIのための関数
func NewNotificationService(n repository.NotificationRepository) NotificationServiceInterface {
	return &notificationServiceStruct{notificationRepo: n}
}
