pipeline {
  agent any
  options {
    timeout(5)
    gitLabConnection('GitLab')
  }
  environemnt {
    DATE = new Date().format('yy.M')
    TAG = "${DATE}.${BUILD_NUMBER}"
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
        docker { image 'bun:latest' }
      }
      steps {
        sh 'bun i'
      }
    }
    stage('test') {
      agent {
        docker { image 'bun:latest' }
      }
      steps {
        sh 'bun test'
      }
    }
    stage ("Build") {
      agent {
        docker { image 'bun:latest' }
      }
      steps {
        sh 'bun run build'
      }
    }
    stage ('Docker Build') {
      steps {
        script {
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
          docker.withRegistry(https://registry.hub.docker.com, 'docker credential')
          docker.image('hkowalski/test-rest-api:${TAG}').push()
          docker.image(''hkowalski/test-rest-api:${TAG}').push('latest')
        }
      }
    }
  }
}