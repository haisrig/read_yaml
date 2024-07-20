const fs = require('fs');
const yaml = require('js-yaml');
const core = require('@actions/core');

function run() {
    const branchName = core.getInput('branch_name');
    let branchType = "feature";
    if(branchName == "develop") {
        branchType = "develop";
    } else if (branchName.startsWith("release")) {
        branchType = "release";
    } else if (branchName == "prod" || branchName == "master" || branchName == "main") {
        branchType = "prod";
    }

    const fileName = core.getInput('file_name');
    console.log("File Name: ", fileName);
    const repoConfig = yaml.load(fs.readFileSync(fileName, 'utf8'));
    const branchConfig = repoConfig.branches.filter(branch => branch.type == branchType)[0];
    console.log(branchConfig);
    core.setOutput("build_type", repoConfig.build_type);
    core.setOutput("static_code_analysis", repoConfig.static_code_analysis);
    core.setOutput("build", branchConfig.build.toString());
    core.setOutput("unit_test", branchConfig.unit_tests.toString());
    core.setOutput("code_analysis", branchConfig.code_analysis.toString());
    core.setOutput("store_artifact", branchConfig.store_artifact.toString());
}

run()