package service

import (
	"log"

	"github.com/mimaken3/ShareIT-api/domain/model"
)

// 全ユーザを取得
func (u *userServiceStruct) FindAllUsersService(refPg int) (users []model.User, allPagingNum int, err error) {
	users, allPagingNum, err = u.userRepo.FindAllUsers(refPg)
	if err != nil {
		log.Println(err)
	}

	for i := 0; i < len(users); i++ {
		// 署名付きURLを取得
		users[i].IconName, err = GetPreSignedURL(users[i].IconName)

		users[i].Email = ""

		// セキュリティのためパスワードを返さない
		users[i].Password = ""
	}

	return
}
