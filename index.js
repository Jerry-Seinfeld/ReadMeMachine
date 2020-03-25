const fs = require('fs');

const axios = require("axios");

const inquirer = require('inquirer');

const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile)

var user = (data) => {
    var queryUrl = `https://api.github.com/users/${data.username}`;
    return axios.get(queryUrl)
}


const generateMarkdown = (data, image, email) => {
    console.log(data)
    return `
# ${data.title}
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)]

## Description
  ${data.description}

  ## Table of Contents
  *[Installation](#installation)
  *[Usage](#usage)
  *[License](#license)
  *[Contributing](#contributing)
  *[Tests](#tests)
  *[Questions](#questions)
  
## Installation
To install run in the terminal:
${data.installation}

## Usage
${data.usage}

## License
${data.usage} 

## Contributing
${data.contributing}

## Tests
Run the command:
${data.tests}

    ## Questions
<img src="${image}" alt="avatar" style="border-radius: 16px" width="30"/>
For questions or concerns contact me at
[${data.username}]${email}
  `
};

function repoQuestions() {
    return inquirer.prompt ([
        
    
        {type: "input",
            name: "GithubUser",
            message: "What is your Github Username?"},
        {type: "input",
            name: "title",
            message: "The Title of your project?"},
        {type: "input",
            name: "description",
            message: "Describe your project"},
        {type: "input",
            name: "license",
            message: "What kind of license should your project have?"},
        {type: "input",
            name: "installation",
            message: "What command should be run to install"},
        {type: "input",
            name: "tests",
            message: "Write a desired command that will run the tests"},
        {type: "input",
            name: "usage",
            message: "What does the user need to know about using the repo?"},
        {type: "input",
            name: "contributing",
            message: "What should the user know about contributing to the repo?"},
        
    ])
    };


  async function init() {
  console.log("Generating your README please wait")
  try {
     
    const data = await repoQuestions();

    const res =  await user(data);

    const md =  generateMarkdown(data,res.data.avatar_url,res.data.html_url);

    await writeFileAsync("README.md", md);

    console.log("Success!");
  } catch(err) {
    console.log(err);
  }
}

init();