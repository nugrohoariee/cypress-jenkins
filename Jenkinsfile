pipeline {
   agent any

    options {
        timestamps()
    }

    environment {
        NODE_ENV = 'test'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                //sh 'npm ci'
                sh 'npm install'
                npx cypress install
                npx cypress verify
            }
        }

        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run --headless --browser chrome'
            }
        }

        stage('Archive Artifacts') {
            steps {
                // Simpan video/screenshot hasil test (kalau ada)
                archiveArtifacts artifacts: 'cypress/videos/**, cypress/screenshots/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            // Bersihkan workspace setelah build
            cleanWs()
        }
        failure {
            echo '❌ Cypress tests failed!'
        }
        success {
            echo '✅ Cypress tests passed!'
        }
    }
}
