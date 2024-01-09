pipeline {
  agent any
  options {
    timeout(5)
    gitLabConnection('GitLab')
  }
  environment {
    DATE = new Date().format('yy.M')
    TAG = "${DATE}"
  }
  triggers {
    gitlab(
      triggerOnPush: true,
      triggerOnMergeRequest: true,
      branchFilterType: 'All',
      addVoteOnMergeRequest: true
    )
  }
  stages {
    stage('Prepare') {
      agent {
        docker { image 'oven/bun:1' }
      }
      steps {
        sh 'bun i'
      }
    }
    stage('test') {
      agent {
        docker { image 'oven/bun:1' }
      }
      steps {
        sh 'bun test'
      }
    }
    stage ("Build") {
      agent {
        docker { image 'oven/bun:1' }
      }
      steps {
        sh 'bun run build'
      }
    }
    stage ('Docker Build') {
      steps {
        script {
          echo 'hkowalski/test-rest-api:${TAG}'
          docker.build('hkowalski/test-rest-api:${TAG}')
        }
      }
    }
    stage ('Pushing Docker Image to Dockerhub') {
      when {
        branch 'master'
      }
      steps {
        script {
          docker.withRegistry('https://registry.hub.docker.com', 'docker credential')
          docker.image('hkowalski/test-rest-api:${TAG}').push()
          docker.image('hkowalski/test-rest-api:${TAG}').push('latest')
        }
      }
    }
  }
}
