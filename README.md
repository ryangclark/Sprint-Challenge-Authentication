# Sprint Challenge: Authentication - Dad Jokes

This challenge allows you to practice the concepts and techniques learned over the past week and apply them in a concrete project. This Sprint explored Authentication. During this Sprint, you studied Introduction to Authentication, Using Sessions and Cookies, Using JSON Web Tokens (JWT), and Client-side Authentication. In your challenge this week, you will demonstrate proficiency by creating an application that will give you a list of random dad jokes, as long as you are authorized.

- **DISCLAIMER** Authentication is a subject that many people spend a large amount time throughout their careers obtaining knowledge over. This is not something we expect you to have a mastery over, rather, we're preparing you to be able have an intelligent conversation about the subject.

## Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This is an individual assessment. All work must be your own. Your challenge score is a measure of your ability to work independently using the material covered through this sprint. You need to demonstrate proficiency in the concepts and objectives introduced and practiced in preceding days.

You are not allowed to collaborate during the Sprint Challenge. However, you are encouraged to follow the twenty-minute rule and seek support from your PM and Instructor in your cohort help channel on Slack. Your work reflects your proficiency w/ Authentication and your command of the concepts and techniques in the Introduction to Authentication, Using Sessions and Cookies, Using JSON Web Tokens (JWT), and Client-side Authentication modules.

You have three hours to complete this challenge. Plan your time accordingly.

## Commits

Commit your code regularly and meaningfully. This helps both you (in case you ever need to return to old code for any number of reasons and your project manager.

## Description

In this challenge, you build a real wise-guy application. _Dad jokes_ are all the rage these days. Currently the application is trying to receive some `Dad Jokes`, however we are currently locked out.

Implement an User Authentication System in order to access the jokes from the Jokes API that we want to consume. You will need to ensure that your system uses `bcrypt` for hashing and encrypting your user's passwords, as well as JWT for handling the authorization aspect of the app.

## Self-Study/Essay Questions

Demonstrate your understanding of this week's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

1. What is the purpose of using _sessions_?

  Sessions allow the server and the client to remember one another. HTML is stateless, and cannot maintain a conversation, if you will. Every request is a brand new interaction to HTML. With sessions, the client and the server can 'remember' one another using cookies. That means authentication and authorization are simpler and more seamless during the session.

2. What does bcrypt do to help us store passwords in a secure manner.

  bcrypt is a hashing function. We use the `bcryptjs` package to use that function to hash sensitive data, most commonly user passwords. Hashing is neat because it runs the data through a function that changes the password into something quite different from the original string. That new thing, called the hash, is _very_ difficult to reverse back to the original because _something, something, math_. 
  
  But! The hashing function can take the original and make the same hash every single time. So that allows us to store the hash relatively safely because we don't need to worry _too_ much about if a hacker steals the hash. What are they gonna do with that? It can take a looooong time to reverse the hash, or find a matching hash. But the user can provide their password to login, we run that through the hashing function, and if the output matches the stored hash, then we know their password is correct without actually knowing their plain-text password. Neat!

3. What does bcrypt do to slow down attackers?

  Uhh. See above.

4. What are the three parts of the JSON Web Token?

  1. **Header:** Carries the algorithm and token type. This allows libraries to verify the signature and use the payload.
  2. **Payload** What a fun name, no? This is where the actual content of the token lies. Things like the user's id or role.
  3. **Signature** The 'ol John Handcock. So this is created when the token is created by hashing the JWT with a SECRET and the algorithm indicated in the Header. The recipient, typically the same server, then can verify the contents of the JWT by hashing the Header and the Payload with the same SECRET, and, if the Signatures match,then the recipient can be relatively certain that the Payload hasn't been tampered with. But if a hacker knows the SECRET, then creating a properly signed Signature with any Payload they'd like, then there's no real way to know.

## Project Set Up

Follow these steps to set up and work on your project:

- [x] Create a forked copy of this project.
- [x] Add PM as collaborator on Github.
- [x] Clone your OWN version of Repo (Not Lambda's by mistake!).
- [x] Create a new Branch on the clone: git checkout -b `<firstName-lastName>`.
- [ ] Implement the project on this Branch, committing changes regularly.
- [ ] Push commits: git push origin `<firstName-lastName>`.

Follow these steps for completing your project:

- [ ] `cd` into the root of the project and run `yarn` to install dependencies.
- [ ] Once you have your `node_modules` go ahead and run `yarn server` or `npm run server` to start your node server.
- [ ] Submit a Pull-Request to merge <firstName-lastName> Branch into master (student's  Repo).
- [ ] Add your Project Manager as a Reviewer on the Pull-request
- [ ] PM then will count the HW as done by  merging the branch back into master.

Helpful Tip on Testing this Project:

- [ ] **TEST** this project using **`POSTMAN`**.

## Minimum Viable Product

- [ ] Implement the `register` function inside `/config/routes.js`.
- [ ] Implement the `login` function inside `/config/routes.js`.
- [ ] Use JSON Web Tokens for authentication.

**Note** The migrations and a database with empty users is already included

- [ ] Add the authentication related code. If everything is done correctly, visiting `/api/jokes` should return a list of jokes.

## Stretch Problem: Build a front end to interface with your User Auth System

- Add a React client that connects to your API and has pages for `Sign Up`, `Sign In` and showing a list of `Jokes`.
- Once you have the functionality down, style it!
