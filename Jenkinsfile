@Library(["x-connext-docker-registry-jenkins-plugin@main", "x-connext-ops-bot-jenkins-plugin@main"]) _

def compress(tarName) {
  def excludes = [
    "dist",
    "node_modules"
  ];

  // Build the exclude options for the tar command
  def excludeArgs = excludes.collect { "--exclude='${it}'" }.join(' ');

  return "tar -cvf ${tarName} ${excludeArgs} *";
}

def TRIGGERS = [
  bitbucketPush()
];

def PROPERTIES = [
  pipelineTriggers(TRIGGERS),
  buildDiscarder(
    logRotator(numToKeepStr: '2')
  ),
  disableConcurrentBuilds(),
  disableResume()
];

properties(PROPERTIES);

node {
  def GIT = checkout(scm);

  if(GIT.GIT_COMMIT == GIT.GIT_PREVIOUS_COMMIT && currentBuild.getPreviousBuild().result == 'SUCCESS') {
    currentBuild.result = 'NOT_BUILT';
    return;
  }

  def DOCKER_NAME = "todo-list-webapp";
  def DOCKER_TAG = env.BRANCH_NAME.replace("/", "-");

  stage("Build") {
    def TAR_NAME = "${DOCKER_NAME}-${DOCKER_TAG}.tar.gz";
    def commands = [
      compress(TAR_NAME),
      buildAndPush(
        TAR_NAME,
        DOCKER_NAME,
        DOCKER_TAG
      )
    ];

    try {
      sh(commands.join(" && "));
    } catch(e) {
      currentBuild.result = "FAILURE";
    }
  }

  stage("Notify") {
    def dockerImageName = "${DOCKER_NAME}:${DOCKER_TAG}";
    def commit = sh(
        returnStdout: true,
        script: "git log -1 --pretty='%h'"
    ).trim();
    def commitBy = sh(
        returnStdout: true,
        script: "git log -1 --pretty='%an'"
    ).trim();
    def commitMessage = sh(
        returnStdout: true,
        script: "git log -1 --pretty='%s'"
    ).trim();
    def buildStatus = currentBuild.currentResult == "SUCCESS" ? true : false;
    def logUrl = "${env.BUILD_URL}console";

    sendBuildNotify(dockerImageName, commit, commitBy, commitMessage, buildStatus, logUrl);
  }
}
