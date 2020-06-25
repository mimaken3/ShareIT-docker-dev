package service

import (
	"os"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"google.golang.org/appengine"
)

func GetHeaderIconURL(iconName string) (preSignedURL string, err error) {
	var bucketName string

	accessKey := os.Getenv("AWS_S3_ACCESS_KEY_ID")
	secretAccessKey := os.Getenv("AWS_S3_SECRET_ACCESS_KEY")
	region := "ap-northeast-1"

	if appengine.IsAppEngine() {
		// 本番
		bucketName = os.Getenv("PROD_BUCKET_NAME")
	} else {
		// 開発
		bucketName = os.Getenv("DEV_BUCKET_NAME")
	}

	s3Config := &aws.Config{
		Credentials: credentials.NewStaticCredentials(accessKey, secretAccessKey, ""),
		Region:      aws.String(region),
	}

	newSession, err := session.NewSession(s3Config)
	if err != nil {
		return "", err
	}

	s3Client := s3.New(newSession)

	req, _ := s3Client.GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String("user-icons/" + iconName),
	})

	preSignedURL, _, err = req.PresignRequest(72 * time.Hour)

	return
}
