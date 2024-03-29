pipeline {
  agent any
  options {
    timeout(5)
    gitLabConnection('GitLab')
  }
  environment {
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
        docker { image 'oven/bun:1' }
      }
      steps {
        sh 'bun i'
      }
    }
    stage('Test') {
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
          docker.build("hubcio2115/test-rest-api:${TAG}")
        }
      }
    }
    stage ('Pushing Docker Image to Dockerhub') {
      when {
        branch 'main'
      }
      steps {
        script {
          docker.withRegistry("https://registry.hub.docker.com", "docker_credential") {
            docker.image("hubcio2115/test-rest-api:${TAG}").push()
          }
        }
      }
    }
  }
}
