Lines should be broken at or before 110 characters.
variablesFunctionsAndTheLikeInSnakeCase();
Spaces between:
    functions and argument lists
    argument lists and function block start
    between individual arguments
    before and after assignment ops
    Example:
        function (arg1, arg2 = 'default') {
Spaces between:
    operators
    Examples:
        var a = 1000;
        const cat = a + (35 / ( a / b))
Blocks:
    starting block { on same line as function delcaration
    ending block } on it's own line, algined with the line containing the opening block.
    Examples:
        function someThing (arg1, arg 2) {
            // Do stuff
            if (cat !== dog) {
                // do stuff
            }
        };
Semicolons:
    Use them. Yes, I know they are "optional" in JavaScript. In asynchronous code with callbacks, which are
    already a PITA to read, they are essential to your sanity. The only exception is in "chaining" commands
    to Browser/Client in test cases.
    Examples:
        browser
            .waitForElementVisible('some css selector', "A message")
            .click('some css selector')
            .assert.visible('some other css selector);
    is the same as:
        browser.waitForElementVisible('some css selector', "A message");
        browser.click('some css selector');
        browser.assert.visible('some other css selector);
    and either can be used. You will see most examples in the world done with chaining. But sometime you HAVE
    to break chain, like when using browser.pause():
        browser
            .waitForElementVisible('some css selector', "A message")
            .click('some css selector');
        browser.pause|(5000);  // if you chain this, it will not pause when ran. Yay asynch code!!!!
        browser
            .assert.visible('some other css selector);
