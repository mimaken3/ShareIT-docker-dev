package repository

import "github.com/mimaken3/ShareIT-api/domain/model"

// UserInterestedTopicRepository is interface for infrastructure
type UserInterestedTopicRepository interface {
	// 最後のIDを取得
	GetLastID() (lastID int, err error)

	// 追加
	CreateUserTopic(topicStr string, lastID int, userID uint) (err error)

	// ユーザIDに紐づくトピックを削除
	DeleteUserInterestedTopic(willBeUpdatedUser model.User) (err error)

	// 削除(トピックが削除されたら)
	DeleteUserTopicByTopicID(topicID int) (err error)

	// 削除(ユーザが削除されたら)
	// DeleteUserTopicByUserID(userID int) (err error)

	// ユーザ毎に取得
	// getTopicIDByUserID(userID int) (topicIDArr []int, err error)

	// トピック毎に取得
	// getTopicIDByUserID(topicID int) (userIDArr []int, err error)
}
