pipeline {
   agent any

    options {
        ansiColor('xterm')
        timestamps()
    }

    environment {
        NODE_ENV = 'test'
        JAVA_HOME = '/opt/java/openjdk'        
        PATH = "${JAVA_HOME}/bin:${env.PATH}"
    }
    tools {
        allure 'allure'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                  node -v
                  npm -v
                  npm install
                  npx cypress install
                  npx cypress verify
                '''
            }
        }

        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run --headless'
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
            allure includeProperties:
                     false,
                     jdk: 'temurin21',
                     results: [[path: 'allure-results']]
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

