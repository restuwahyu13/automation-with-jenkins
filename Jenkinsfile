pipeline {
  agent any

  environment {
    GITLAB_REGISTRY_URL = 'registry.gitlab.com'
    GITLAB_REPOSITORY_NAME = 'restuwahyu13/node-helloworld-api' // <- change with your repo
    DOCKER_COMPOSE_ORG_FILE = './node-helloworld-api/docker-compose.yml'
    DOCKER_COMPOSE_PROD_FILE = './node-helloworld-api/docker-compose.prod.yml'
    SLACK_CHANNELID = 'C06C4233F4L' // <- change with your slack channelid
    SLACK_MSG_SUCCESS = 'Your pipeline is running well'
    SLACK_MSG_FAILED = 'Your pipeline is not running well'
    SSH_HOST = '192.168.64.10' // <- change with your server ip address 
    DIRECTORY = './node-helloworld-api'
  }

  options {
    timestamps()
    quietPeriod(5)
    timeout(time: 30, unit: 'MINUTES')
    durabilityHint('PERFORMANCE_OPTIMIZED')
  }

  stages {
    stage('Clone Repository') {
      steps {
        git(branch: 'main', url: "https://gitlab.com/${GITLAB_REPOSITORY_NAME}", credentialsId: 'gitlab_credentials_id')
      }
    }

    stage('Build image') {
      steps {
        withCredentials([usernamePassword(usernameVariable: 'GITLAB_USERNAME', passwordVariable: 'GITLAB_PASSWORD', credentialsId: 'gitlab_credentials_id')]) {
          sh '''
            docker login --username ${GITLAB_USERNAME} --password ${GITLAB_PASSWORD} ${GITLAB_REGISTRY_URL}
            docker build -t ${GITLAB_REGISTRY_URL}/${GITLAB_REPOSITORY_NAME}:v${BUILD_NUMBER} --compress .
            docker push ${GITLAB_REGISTRY_URL}/${GITLAB_REPOSITORY_NAME}:v${BUILD_NUMBER}
            docker logout
          '''
        }
      }
    }

    stage('Deploy App') {
      steps {
        withCredentials([
            usernamePassword(usernameVariable: 'SSH_USERNAME', passwordVariable: 'SSH_PASSWORD', credentialsId: 'ssh_credentials_id'),
            usernamePassword(usernameVariable: 'GITLAB_USERNAME', passwordVariable: 'GITLAB_PASSWORD', credentialsId: 'gitlab_credentials_token_id')
        ]) {
          script {
            def remoteServer = [:]
            remoteServer.name = env.SSH_USERNAME
            remoteServer.host = env.SSH_HOST
            remoteServer.user = env.SSH_USERNAME
            remoteServer.password = env.SSH_PASSWORD
            remoteServer.allowAnyHosts = true

            def commandServer = """
              docker login --username ${GITLAB_USERNAME} --password ${GITLAB_PASSWORD} ${GITLAB_REGISTRY_URL}

              if [ -f "${DOCKER_COMPOSE_PROD_FILE}" ]
                then
                  cat ${DOCKER_COMPOSE_PROD_FILE}
                else
                  git clone https://${GITLAB_USERNAME}:${GITLAB_PASSWORD}@gitlab.com/restuwahyu13/node-helloworld-api.git
                  touch ${DOCKER_COMPOSE_PROD_FILE}
              fi

              awk '{gsub(/:v1/, ":v${BUILD_NUMBER}"); print}' ${DOCKER_COMPOSE_ORG_FILE} > ${DOCKER_COMPOSE_PROD_FILE}
              docker-compose -f ${DOCKER_COMPOSE_PROD_FILE} up --pull missing --remove-orphans --force-recreate --wait -d

              docker logout
              rm -rf ${DIRECTORY}
            """

            sshCommand(remote: remoteServer, command: commandServer)
          }
        }
      }
    }
  }

   post {
    success {
      slackSend(
        channel: "$SLACK_CHANNELID",
        color: "#13d43a",
        message: "ID: $BUILD_NUMBER \n Name: $JOB_NAME \n Status: Success \n Message: $SLACK_MSG_SUCCESS \n Report: $BUILD_URL",
        sendAsText: true
      )
    }

    failure {
      slackSend(
        channel: "$SLACK_CHANNELID",
        color: "#ed0c35",
        message: "ID: $BUILD_NUMBER \n Name: $JOB_NAME \n Status: Failure \n Message: $SLACK_MSG_FAILED \n Report: $BUILD_URL",
        sendAsText: true
      )
    }

    aborted {
      slackSend(
        channel: "$SLACK_CHANNELID",
        color: "#f5ea16",
        message: "ID: $BUILD_NUMBER \n Name: $JOB_NAME \n Status: Aborted \n Message: $SLACK_MSG_FAILED \n Report: $BUILD_URL",
        sendAsText: true
      )
    }

    unstable {
      slackSend(
        channel: "$SLACK_CHANNELID",
        color: "#a3a39d",
        message: "ID: $BUILD_NUMBER \n Name: $JOB_NAME \n Status: Unstable \n Message: $SLACK_MSG_FAILED \n Report: $BUILD_URL",
        sendAsText: true
      )
    }
  }
}
