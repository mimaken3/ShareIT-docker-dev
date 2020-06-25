# 使用するGolangのイメージを指定する
FROM golang:1.13

# 必要なパッケージなどなどをインストールする
RUN apt-get update -qq && \
    apt-get install -y default-mysql-client vim

# ワーキングディレクトリを指定する
WORKDIR /go/src/share_it_server

ADD . .

#set variable for HotReload
ENV GO111MODULE=on

# ホットリロード用
RUN go get github.com/pilu/fresh 
RUN go mod init sample

# 環境変数を設定
ENV PATH /go/bin:$PATH

CMD ["sh", "./start_app.sh"]
