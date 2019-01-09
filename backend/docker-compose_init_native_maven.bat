docker-machine start default 

mvn clean package -Dmaven.test.skip=true
call docker-compose up --build
