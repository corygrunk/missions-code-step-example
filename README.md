Missions Example Code Step
==========================

This Glitch project is an example Code Step for Missions (https://missions.ai).

Links
-----

- Missions: https://missions.ai
- Missions Dev Quickstart: https://missions.ai/developers/
- Glitch Project: https://glitch.com/edit/#!/simple-turner
- Video Tutorial: https://youtu.be/jVT0z6wIIxU

Missions Developers
-------------------

As a developer, you can write custom Code step types. They work like this:

1. When the step is run during a Mission, a POST is sent to an end-point of your app. This POST will contain a Verify Token (that is specified by you) and any of the “input” values from the Mission.
2. Your app receives the request and your code tells your app what to do.
3. Optionally, your app can return values back to missions via the “output”.

Quick-start
-----------

Let’s write an example Code Step that receives the user’s favorite movie from a previous step, and returns the string “<movie> is a really good movie.” For this example, we’ll host our app at https://glitch.com. Glitch is an awesome service from Fog Creek that lets you run/remix Node apps in the cloud.

Our sample app is very simple. It consists of:
- package.json (describing you app and loading any dependencies)
- server.js (this is the app that receives and responds to POST requests)
- .env (this is the file where you can save private variables like your Verify Token)

Mission Setup
-------------
1. Go to https://missions.ai, signin, add to Slack, and click to create a new Mission.
2. We'll name this Mission "Sample Code Mission".
3. Click "Save".
4. First we'll create a Todo step where we can ask the user what their favorite movie is. Click to "Add a step".
5. Choose Todo from the list of Building Blocks.
6. For the step instructions, enter: "Everyone likes movies."
7. Click "+ Add form field" and select "Short Text".
8. Enter "What's your favorite movie?" in the "Short Text" input box.
9. Leave the "Button Label" as is.
10. In the "Assigned to" dropdown, select "Person who launched the Mission".
11. Click "Save step".

This will create your first Missions step that will ask the Launcher of the Mission what their favorite movie is. Next we'll create a "Code Step" that sends the favorite movie to your Glitch app.

Glitch App Setup
---------------

Before we setup the Code Step in Missions, let's create a Glitch Project that will be app to receive and respond to the Code Step.

1. Go to https://glitch.com/edit/#!/simple-turner
2. Click "Remix this" to fork our project.
3. Click on the ".env" file.
4. After "VERIFY_TOKEN=" enter 123456789.
5. Click on "Logs" and verify that you don't see any errors and "Your app is listening on port 3000" appears.
6. Click on "Show Live" to open a new window with your app.
7. Copy the URL to your new app to the clipboard.

Awesome, now you have your app running and you've copied your app's end-point to the clipboard. We'll use that back at Missions.

Missions Code Step
------------------

Now we'll setup a custom Code Step on Missions that will take the user's favorite movie, send it to your Glitch app, and return a string back to Missions.

1. Go back to your Mission.
2. Click "Add a step".
3. Click "Code" from the list of Building Blocks.
4. Give the new step a short description like "A sample code step running on Glitch."
5. Click "+ Add Input". This is where you choose what Missions data to send to your app.
6. In the "Name" field, enter "movie".
7. In the "Value" field, click the lightning bolt buttton, and choose "1 Everyone likes movies" > "What's your favorite movie?"
8. In the "Webhook Endpoint" field, enter the URL to your Glitch app that you copied to your clipboard.
9. In the "Verify Token" field, enter "123456789". You can enter anything in this field as long as it matches the "VERIFY_TOKEN" value in the ".env" file of your Glitch app.
10. Click the "+ Add an output" button. This is where you'll specify the output from your app.
11. Enter "movie_string" in the Outputs Name field.
12. Click "Save Step".

Now you've completed setting up your "Code Step." It will take the user's favorite movie, send it to your app, and your app will return the string "<movie> is a great movie." Next we have to receive that string value in Missions.

Receive an Output
-----------------

1. Click "Add a step".
2. This time choose the "Notify" Building Block.
3. In the "Step Instructions" field, click the lightning bolt button.
4. Click "2 A sample code step running on Glitch. > movie_string".
5. In the "Notify" dropdown, select "Person who launched the Mission".
6. Click "Save step".

Everything should be wired up now. You've created a Mission that will ask the Launcher what their favorite movie is, send that response to your app, your app will respond with a string, and finally Missions will use that string in a "Notify step".

Let's test it out
-----------------

1. Click "Launch".
2. Select yourself in the "Launch on behalf of" dropdown.
3. Click "Launch in Slack".
4. You'll get a Slack message asking for your favorite movie. After responding, you should get a reply from your app!

