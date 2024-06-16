pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/CodewithSegNet/portfolio.github.io'
        GITHUB_CREDENTIALS = 'github-credentials'
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

                        // check if the 'gh-pages' branch exists
                        script {
                            def branch = 'gh-pages'
                            if (sh(script: "git show-ref --verify --quiet refs/heads/${branch}", returnStatus: true) !=0) {
                                echo "'${branch}' branch does not exist, creating it"
                                sh "git checkout -b ${branch}"
                            } else {
                                echo "'${branch}' branch already exists, switching to it."
                                sh "git checkout ${branch}"
                            }
                        }

                        sh """
                            git push -f https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/CodewithSegNet/portfolio.github.io gh-pages

                        """
                    }
                }
            }
        }
}