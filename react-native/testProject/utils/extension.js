import _ from 'lodash';
// const _ = require('lodash');

//=============================================
//=============================================
const orchConfig = {
    entry: {
        input: 'https://www.amazon.com/',
        checkBy: {
            includes: true,
            regex: false,
            equals: false
        }
    },
    main: [
        {
            type: 'if',
            ifTheseSucceed: ['checkIfLoggedIn'],
            thenExecute: 'exit'
        },
        {
            type: 'script',
            scriptName: 'notLoggedIn'
        }

        // document['querySelector']('')['innerText'] = Password | document.
        // document['querySelector']('#nav-link-accountList-nav-line-1').innerText | equals()

        // if (x, then, y, then, z, then)

        //  this is a problem of scopes. Scopes {} are a collection of actions that can result in success or failure.

        // therefore, an if (x, y, z) is actually a collection of orchestrations, each with a success or failure result (akin to true, false) that can be grouped and we can orchestrate between the results of each smaller orchestration.

            // const resultA = orchestrate(xCommands); ...resultB...
            // if (x, y, z) {}
    ],
    exit: [
        {
            type: 'exit'
        }
    ],
    checkIfLoggedIn: [
        // check if already logged in
        {
            type: 'executeDocumentCommand',
            functionName: 'querySelector',
            input: '#nav-link-accountList-nav-line-1',
            actionType: 'execute', //()
            checkResult: true
        },
        {
            type: 'executeDocumentCommand',
            functionName: 'innerText',
            actionType: 'get',
            executeOnLocalState: true,
            checkResult: true
        },
        {
            type: 'comparison',
            comparisonType: 'equal',
            input: 'Hello, Sharlene'
        }
    ],
    notLoggedIn: [
        // click login
        {
            type: 'executeDocumentCommand',
            functionName: 'getElementById',
            input: 'nav-link-accountList',
            actionType: 'execute',
            checkResult: true
        },
        {
            type: 'executeDocumentCommand',
            functionName: 'click',
            actionType: 'execute',
            executeOnLocalState: true
        },

        // check
        {
            type: 'elementExists',
            elementById: 'continue',
            retries: 2,
            checkResult: true
        },
        // {
        //     type: 'waitForTransition',
        //     howLongToWaitToCheck: 4000
        // },

        // set the email
        {
            type: 'executeDocumentCommand',
            functionName: 'querySelector',
            input: '#ap_email',
            actionType: 'execute',
            checkResult: true
        },
        {
            type: 'executeDocumentCommand',
            functionName: 'value',
            input: 'max.shar.tam@gmail.com',
            actionType: 'set',
            executeOnLocalState: true
        },


        {
            type: 'exit'
        },

        // click on Continue
        {
            type: 'executeDocumentCommand',
            functionName: 'getElementsByTagName',
            input: 'input',
            actionType: 'execute',
            checkResult: true
        },
        {
            type: 'getAtPathAndSetToLocalState',
            path: '[9]'
        },
        {
            type: 'executeDocumentCommand',
            functionName: 'click',
            actionType: 'execute',
            executeOnLocalState: true
        },

        // check
        // {
        //     type: 'elementExists',
        //     querySelector: '#authportal-main-section > div:nth-child(2) > div > div > div > form > div > div.a-section.a-spacing-large > div.a-row > div.a-column.a-span5 > label',
        //     retries: 2,
        //     checkResult: true
        // },

        // validate we are on password page
        {
            type: 'executeDocumentCommand',
            functionName: 'querySelector',
            input: '#authportal-main-section > div:nth-child(2) > div > div > div > form > div > div.a-section.a-spacing-large > div.a-row > div.a-column.a-span5 > label',
            actionType: 'execute',
            checkResult: true
        },
        {
            type: 'executeDocumentCommand',
            functionName: 'innerText',
            actionType: 'get',
            executeOnLocalState: true,
            checkResult: true
        },
        {
            type: 'comparison',
            comparisonType: 'equal',
            input: 'Password'
        },

        // set password
        {
            type: 'executeDocumentCommand',
            functionName: 'querySelector',
            input: '#ap_password',
            actionType: 'execute',
            checkResult: true
        },
        {
            type: 'executeDocumentCommand',
            functionName: 'value',
            input: 'lotabota8',
            actionType: 'set',
            executeOnLocalState: true
        },

        // click on Sign-In
        {
            type: 'executeDocumentCommand',
            functionName: 'querySelector',
            input: '#signInSubmit',
            actionType: 'execute',
            checkResult: true
        },
        {
            type: 'executeDocumentCommand',
            functionName: 'click',
            actionType: 'execute',
            executeOnLocalState: true
        }
    ]
};

const userConfigTest = {
    global: {
        commands: []
    },
    "amazon": {
        contextUrls: [
            'https://www.amazon.com/*',
        ],
        commands: [
            {
                commandName: 'login',
                orchConfig: orchConfig
            }
        ]
    }
};
//=============================================
//=============================================

const formatTranscription = (transcriptionText) => {
    /*
    remove punctuation
    - punctuation usually is next to a word => "amazon?"
    */
    const mapOfPunctuation = {
        '.': true,
        ',': true,
        '!': true,
        '?': true
    };
    let formattedText = '';
    _.forEach(transcriptionText, (char) => {
        if (!mapOfPunctuation[char]) {
            formattedText = formattedText + char;
        }
    });

    // lowercase all letters
    return _.toLower(formattedText);
};

const commandToListOfWords = (transcriptionText) => {
    /*
    we have to separate words from spaces because when doing a match of words,
    we need to make sure a match is not apart of another word:

    ex. _.include("on Amazon", "on") => returns true, but matches both "on" and Amaz"on".

    Assumption: the transcriptionText by Google only contains valid words in the dictionary. Therefore, we can confidently split on a space (" ") and have a list of valid words.
    */
    return transcriptionText.split(' ');
};

const wordIsPreposition = (word) => {
    const mapOfPrepositions = {
        'on': true,
        'with': true,
        'using': true,
        'in': true,
    };
    return mapOfPrepositions[word] || false;
};

const parseCommand = (listOfCommandWords) => {
    /*
    listOfCommandWords = ["open", "a", "new", "tab", "on", "amazon"]
        parseCommand return => { command: ["open", "a", "new", "tab"], appName: amazon }
    listOfCommandWords = ["open", "a", "new", "tab"]
        parseCommand return => { command: ["open", "a", "new", "tab"], appName: null }
    */

    /*
    - detect preposition to determine if command is for a specific app
    ------------------
    - ex. login on amazon => where login = command, on = preposition, amazon = app name

    Assumption: we assume that there will only be 1 preposition in a transcription and that prepositions are only used in a command to define an app and not in a command itself.
    */
    let includesAPrep = false;
    const dataToReturn = {
        command: [],
        appName: [],
    };

    _.forEach(listOfCommandWords, word => {
        if (wordIsPreposition(word)) {
            includesAPrep = true;
            // skip prepositions
            return;
        }


        if (includesAPrep) {
            dataToReturn.appName.push(word)
        } else {
            dataToReturn.command.push(word)
        }
    });

    return dataToReturn;
};

/*
listOfWordsOfCommand: ["login"]

mapOfUserCommands: {
    login: orchConfig, // app-level
    "go to my account page": orchConfig, // app-level
    "open a new tab": orchConfig, // global
}
*/
const matchListOfWordsToCommand = (listOfWordsOfCommand, mapOfUserCommands) => {
    /*
    dataToReturn = {
        report: {
            login: {
                matchedWords: [ "login" ],
                matchedCount: 1,
                orchConfig: { ... }
            }, ...
        },
        matchedCommandOrchConfig: { ... }
    }
    */
    const dataToReturn = {
        report: {},
        matchedCommandOrchConfig: null
    };

    _.forIn(mapOfUserCommands, (orchConfig, userCommandString) => {
        let listOfWordsForUserCommand = commandToListOfWords(formatTranscription(userCommandString));
        listOfWordsForUserCommand.command;

        /*
        The order of matching matters.

        Assumption: the user's command is the shorter list of words compared to the listOfWordsOfCommand.
        */
        const wordsOfCommandThatMatch = [];
        let idxOfWordToMatch = 0;
        _.forEach(listOfWordsOfCommand, (inputWord) => {
            if (inputWord === listOfWordsForUserCommand[idxOfWordToMatch]) {
                wordsOfCommandThatMatch.push(inputWord);
                idxOfWordToMatch++;
            }
        });

        // for reporting:
        // --------------
        dataToReturn.report[userCommandString] = {
            matchedWords: wordsOfCommandThatMatch,
            matchedCount: `${wordsOfCommandThatMatch.length} out of ${listOfWordsForUserCommand.length}`,
            orchConfig
        };
        // --------------

        // if the matched words match the count of user command words
        if (wordsOfCommandThatMatch.length === listOfWordsForUserCommand.length) {
            dataToReturn.matchedCommandOrchConfig = orchConfig;

            return false; // exit _.forEach loop early on first match
        }
    });

    return dataToReturn;
};

/*
needed when trying to determine intent for a request that does not specify an app

> open a new tab <= global or app level version to use?

> global will always be chosen over same command at app level.

Therefore, if users want the same command at app level, they need to utter what appName they want to target.
*/
const getListOfApplicableCommandsBasedOnUrl = (currentUrl, userConfig) => {
    // applicable commands are global and also context based commands
    const listOfGlobalCommands = userConfig.global.commands;
    let listOfApplicableAppLevelCommands = [];

    // get app-level applicable commands
    _.forIn(userConfig, (obj, appName) => {
        if (appName !== 'global') {
            const contextUrls = _.get(obj, 'contextUrls', []);
            const appCommands = _.get(obj, 'commands', []);

            // check if this app's commands are applicable based on the contextUrls
            let appCommandsAreApplicable = false;
            _.forEach(contextUrls, urlToCompareAgainst => {
                if (_.includes(urlToCompareAgainst, '*')) {
                    // remove the asterisk
                    urlToCompareAgainst = urlToCompareAgainst.split('*')[0];

                    // check by seeing it currentUrl includes the wildcard
                    if (_.includes(currentUrl, urlToCompareAgainst)) {
                        appCommandsAreApplicable = true;
                    }
                } else {
                    // check by deep-equal
                    if (currentUrl === urlToCompareAgainst) {
                        appCommandsAreApplicable = true;
                    }
                }

                if (appCommandsAreApplicable) {
                    return false; //exit _.forEach early
                }
            });

            // if the app's commands are applicable
            if (appCommandsAreApplicable) {
                /*
                we only select the first app that has contextUrls that include the currentUrl. This is to prevent complexity (eg. 2 apps with overlapping commands). This also enforces a single app name per site. And if you want something overlapping, put it into the global space.
                */
                listOfApplicableAppLevelCommands = appCommands;

                return false; //exit _.forEach early
            }
        }
    });

    /*
    for overlapping commands, apply global > app-level using _.uniqBy
    */
    return _.uniqBy([...listOfGlobalCommands, ...listOfApplicableAppLevelCommands], 'commandName');
};

const getOrchConfigToUseFromVerbalCmd = (transcriptionText, currentUrl, userConfig) => {
    const { command, appName } = parseCommand(commandToListOfWords(formatTranscription(transcriptionText)));


    // get a list of all applicable commands based on appName or contextUrl
    // ------------------------
    let listOfApplicableCommands = [];
    if (!_.isEmpty(appName)) {
        // get commands using appName
        listOfApplicableCommands = _.get(userConfig, [appName[0], 'commands'], []);
    } else {
        // get commands using current url
        listOfApplicableCommands = getListOfApplicableCommandsBasedOnUrl(currentUrl, userConfig);
    }

    // create map of applicable commands
    // ------------------------
    /*
    mapOfApplicableCommands = {
        "login": orchConfigForLogin,
        "open a new tab": orchConfigForOpenANewTab,
        ...
    }
    */
    const mapOfApplicableCommands = {};
    _.forEach(listOfApplicableCommands, (commandObj) => {
        mapOfApplicableCommands[commandObj.commandName] = commandObj.orchConfig;
    });

    // get the orch config to use
    // ------------------------
    /*
    result = {
        report: {
            login: {
                matchedWords: [],
                matchedCount: '0 out of 1',
                orchConfig: { login: true }
            },
            'open a new tab': {
                matchedWords: [ 'open', 'a', 'new', 'tab' ],
                matchedCount: '4 out of 4',
                orchConfig: { openANewTabInAmazon: true }
            }
        },
        matchedCommandOrchConfig: { openANewTabInAmazon: true }
    }
    */
    const result = matchListOfWordsToCommand(command, mapOfApplicableCommands);
    const util = require('util');
    console.log('\n');
    console.log('---------------->');
    console.log('matchListOfWordsToCommand =>');
    console.log(util.inspect(result, {showHidden: false, depth: null}));
    console.log('<----------------');

    return result.matchedCommandOrchConfig;
};

// standardize messages
const assistantFromName = 'assistantApp';
const createMessage = (type, data) => {
    return {
        from: assistantFromName,
        type,
        data,
    };
};

const sendCommandToCS = (orchConfigToExecute) => {
    /*
    send a message to CS via window.post, then CS will sendMessage to background
    */
    window.postMessage(createMessage('commandFromTheAssistant', orchConfigToExecute), "*");
};

export const executeCommand = (transcriptionText, currentUrl, userConfig) => {
// module.exports = executeCommand = (transcriptionText, currentUrl, userConfig) => {
    // DELETE THIS AFTER TESTING
    transcriptionText = 'login';
    userConfig = userConfigTest;
    currentUrl = 'https://www.amazon.com/login/apple';

    // get the orch config to use
    const orchConfigToUse = getOrchConfigToUseFromVerbalCmd(transcriptionText, currentUrl, userConfig);

    let returnVal = 'successfully sent command to content-script';
    if (orchConfigToUse) {
        sendCommandToCS(orchConfigToUse)
    } else {
        returnVal = 'error - could not match command to transcription';
    }

    return returnVal;
};

//========================================
//========================================
// TESTS
//========================================
//========================================
// if (false) {
//     // translation
//     // ------------
//     // const textWithAppName = 'Open a document on Amazon?';
//     // const textWithoutAppName = 'Open a new tab with amazon';
//     // const textWithoutAppName = 'Open a new tab';
//     const textWithoutAppName = 'login';

//     // currentURL
//     // ------------
//     const currentUrl = 'https://www.amazon.com/login/apple';
//     // const currentUrl = undefined;

//     // user's orch config
//     // ------------
//     const userConfig = {
//         global: {
//             commands: [
//                 {
//                     commandName: "open a new tab",
//                     orchConfig: { openANewTab: true }
//                 }
//             ]
//         },
//         "amazon": {
//             // context urls provide a way for many domain names owned by a company to group commands by appName given the multiple domain names
//             contextUrls: [
//                 'https://www.amazon.com/*',
//             ],
//             commands: [
//                 {
//                     commandName: 'login',
//                     orchConfig: { login: true }
//                 },
//                 {
//                     commandName: "open a new tab",
//                     orchConfig: { openANewTabInAmazon: true }
//                 },
//                 {
//                     commandName: "go to my account page",
//                     orchConfig: { goToMyAccountPage: true }
//                 }
//             ]
//         }
//     };

//     const result = getOrchConfigToUseFromVerbalCmd(textWithoutAppName, currentUrl, userConfig);

//     const util = require('util');
//     console.log('\n');
//     console.log('---------------->');
//     console.log('result =>');
//     console.log(util.inspect(result, {showHidden: false, depth: null}));
//     console.log('<----------------');
//     console.log('\n');
// }
// //========================================
// //========================================
// //========================================
// //========================================
// if (false) {
//     const text = 'Open a document on Amazon?';
//     const mapOfCommands = {
//         login: { login: true },
//         "open a new tab": { tab: true },
//         "open a document": { document: true },
//         "open a document here": { document: true },
//     };
//     const { command, appName } =  parseCommand(commandToListOfWords(formatTranscription(text)));

//     const result = matchListOfWordsToCommand(command, mapOfCommands);

//     const util = require('util');
//     console.log('\n');
//     console.log('---------------->');
//     console.log('result =>');
//     console.log(util.inspect(result, {showHidden: false, depth: null}));
//     console.log('<----------------');
//     console.log('\n');
// }
