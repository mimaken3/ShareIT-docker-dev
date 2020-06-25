package service

import (
	"github.com/mimaken3/ShareIT-api/domain/model"
	"github.com/mimaken3/ShareIT-api/domain/repository"
)

type likeServiceStruct struct {
	likeRepo repository.LikeRepository
}

// Application層はこのInterfaceに依存
type LikeServiceInterface interface {
	// 各記事のいいね情報を取得
	GetLikeInfoByArtiles(userID uint, articles []model.Article) (updatedArticles []model.Article, err error)

	// いいねON/OFF
	ToggleLikeByArticle(userID uint, articleID uint, isLiked bool) (likeID uint, err error)

	// 記事のいいねを削除
	DeleteLikeByArticleID(articleID uint) (err error)

	// ユーザが付けたいいねを全削除
	DeleteLikeByUserID(userID uint) (err error)
}

// DIのための関数
func NewLikeService(l repository.LikeRepository) LikeServiceInterface {
	return &likeServiceStruct{likeRepo: l}
}
