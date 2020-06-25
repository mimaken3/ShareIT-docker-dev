package handler

import (
	"github.com/mimaken3/ShareIT-api/domain/service"
	"github.com/mimaken3/ShareIT-api/infrastructure"
)

var userService service.UserServiceInterface
var articleService service.ArticleServiceInterface
var articleTopicService service.ArticleTopicServiceInterface
var topicService service.TopicServiceInterface
var userInterestedTopicService service.UserInterestedTopicServiceInterface
var profileService service.ProfileServiceInterface
var iconService service.IconServiceInterface
var likeService service.LikeServiceInterface
var commentService service.CommentServiceInterface
var notificationService service.NotificationServiceInterface

func DI() {
	// ユーザ
	// DBと直接やり取りをするrepositoryにDBの情報を外部から注入
	userRepo := infrastructure.NewUserDB(infrastructure.DB)
	userService = service.NewUserService(userRepo)

	// 記事
	// DBと直接やり取りをするrepositoryにDBの情報を外部から注入
	articleRepo := infrastructure.NewArticleDB(infrastructure.DB)
	articleService = service.NewArticleService(articleRepo)

	// トピック
	// DBと直接やり取りをするrepositoryにDBの情報を外部から注入
	topicRepo := infrastructure.NewTopicDB(infrastructure.DB)
	topicService = service.NewTopicService(topicRepo)

	// 記事とトピック
	// DBと直接やり取りをするrepositoryにDBの情報を外部から注入
	articleTopicRepo := infrastructure.NewArticleTopicDB(infrastructure.DB)
	articleTopicService = service.NewArticleTopicService(articleTopicRepo)

	// ユーザと興味のあるトピック
	userInterestedTopicRepo := infrastructure.NewUserInterestedTopicDB(infrastructure.DB)
	userInterestedTopicService = service.NewUserInterestedTopicService(userInterestedTopicRepo)

	// プロフィール
	profileRepo := infrastructure.NewProfileDB(infrastructure.DB)
	profileService = service.NewProfileService(profileRepo)

	// ユーザアイコン
	iconRepo := infrastructure.NewIconDB(infrastructure.DB)
	iconService = service.NewIconService(iconRepo)

	// いいね
	likeRepo := infrastructure.NewLikeDB(infrastructure.DB)
	likeService = service.NewLikeService(likeRepo)

	// コメント
	commentRepo := infrastructure.NewCommentDB(infrastructure.DB)
	commentService = service.NewCommentService(commentRepo)

	// 通知
	notificationRepo := infrastructure.NewNotificationDB(infrastructure.DB)
	notificationService = service.NewNotificationService(notificationRepo)
}
