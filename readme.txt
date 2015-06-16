This is a small Node script for Mac OS X that records audio from the input jack and creates a properly tagged MP3. The recording automatically stops after 30 seconds of silence. I made it to simplify my process of digitizing hundreds of cassette tapes.

To run this:

First Time
==========

1. Install Homebrew, NodeJS and NPM

2. Install lame for MP3 compression:
	$ brew install lame

3. Install Sound Exchange, which we use to record audio:
	$ brew install sox —with-lame

4. Install EyeD3, which writes ID3 tags to the MP3.
	$ brew install eye-d3

5. Install the necessary Node modules:
	$ npm link

6. Open this folder in Terminal and run:
	$ node index.js


After the first time
====================

1. Open System Preferences > Sound and make sure the input jack is selected. This makes it the primary sound device. Or if you want it to record from the microphone select that.

2. Open this folder in Terminal and run:
	$ node index.js


General Instructions
====================

Run the program using Terminal, enter the information (Artist, Title, Year), make sure your cassette player is plugged in to your input jack and hit play.

Notes
=====

- The MP3s will be tagged with the album as “Old Cassettes”. I like to keep them all as part of a big album, but change this in the code if you want.

- You can uncomment the section that moves the resulting MP3 file. By default it will stay in the folder where this script is run.
