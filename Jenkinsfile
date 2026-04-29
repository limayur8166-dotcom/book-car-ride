pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Stop Old App') {
            steps {
                sh 'pkill node || true'
            }
        }

        stage('Run App') {
            steps {
                dir('backend') {
                    sh 'nohup npm start > app.log 2>&1 &'
                }
            }
        }
    }
}