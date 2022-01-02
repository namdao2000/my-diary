pipeline {
    agent any

    stages {
//     Make sure to set JWT_TOKEN in Jenkins env config
        stage('Set Env Variables') {
            steps {
               sh 'echo "JWT_SECRET=${JWT_SECRET}" > ./backend/.env'
            }
        }
        stage('Build & Deploy') {
            steps {
                sh 'sh start.sh'
            }
        }
    }
}