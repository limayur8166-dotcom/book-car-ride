pipeline {
    agent any

    stages {

        stage('Clone Code') {
            steps {
                git 'https://github.com/limayur8166-dotcom/book-car-ride.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Stop Old App') {
            steps {
                sh 'pkill node || true'
            }
        }

        stage('Run App') {
            steps {
                sh 'nohup npm start > app.log 2>&1 &'
            }
        }
    }
}