pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/CodewithSegNet/portfolio.github.io'
        GITHUB_CREDENTIALS = 'git-credentials'
    }
        stages{
            stage('checkout') {
                steps {
                    checkout scm
                }
            }

            stage('build') {
                steps {
                    // build commands here
                    sh 'echo "Building portfolio project"'
                }
            }


            stage('deploy') {
                steps {
                    withCredentials([usernamePassword(credentialsId: "${GITHUB_CREDENTIALS}", usernameVariable: 'GiTHUB_USER', passwordVariable: "GITHUB_TOKEN" )]) {
                        sh 'git config --global user.email "segun@yahoo.com"'
                        sh 'git config --global user.name "jenkins"'

                        sh """
                            git checkout -b gh-pages
                            git add -f build
                            git commit -m "Deploy to Github Pages"
                            git push -f https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/CodewithSegNet/portfolio.github.io gh-pages

                        """
                    }
                }
            }
        }
}