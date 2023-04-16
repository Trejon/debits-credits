# 1st you'll need to run `docker build . -t trejonstalls/debits-credits-api` to build the image
# 2nd to run it you have to run `docker run -d -p 3001:3001 --name debits-credits-api-container trejonstalls/debits-credits-api`


testing kakfa

<!-- 
kafka-console-consumer --bootstrap-server kafka-broker:29092 \
                       --topic test-topic \
                       --from-beginning


kafka-console-producer --bootstrap-server broker:9092 \
                       --topic quickstart -->