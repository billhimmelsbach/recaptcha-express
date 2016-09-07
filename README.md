# Setting Up reCAPTCHA for Express

* Setting up reCAPTCHA for Express with the express-recaptcha npm package? It's a little harder than in rails, but still easier than it sounds! Follow the instructions below with your own project. You could also clone this project, add your own public and private keys, and test it out. Message Bill with any questions! Let's destroy the bots together!

<img src="https://38.media.tumblr.com/89ee74469c4d32a56a83108119fac659/tumblr_n33c6bvBvG1qcga5ro1_500.gif" width="300px" />


## Basic Setup Instructions

* Request a free reCAPTCHA key from Google: https://www.google.com/recaptcha/admin
* Setup your reCAPTCHA key to work with localhost and any other domains you want:
![reCAPTCHA key setup:](https://i.imgur.com/AYg4eZe.png)
* Run this command in your Terminal in the root directory of your Express app:

```
npm install express-recaptcha --save
```

#### Important note! Always protect your secret reCAPTCHA key! Otherwise bots might find their way in!

* We're going to create a module with our secret key in it, then git ignore it. First, create a env.js file in the root directory of your app.

* In the env.js file, include the following code:

```JavaScript
var keys = {
  recaptchaKey: "YOUR_PRIVATE_KEY"
};
module.exports = keys;
```

* Include the env.js file in your .gitignore, to be absolutely sure it's not being uploaded to GitHub.

```
# See https://help.github.com/articles/ignoring-files for more about ignoring files.
#
# If you find yourself ignoring temporary files generated by your text editor
# or operating system, you probably want to add a global ignore instead:
#   git config --global core.excludesfile '~/.gitignore_global'

# Ignore bundler config.
/.bundle

# Ignore all logfiles and tempfiles.
/log/*
!/log/.keep
/tmp
env.js
```

* Now let's require the env module we just created in your server.js, as well as requiring and initializing the reCAPTCHA package. Put the following code near the top of your server.js. I put mine just below the require for body-parser:

```JavaScript
var recaptcha = require('express-recaptcha');
var keys = require('./env.js');
recaptcha.init('YOUR_PUBLIC_KEY', keys.recaptchaKey);
```

* Now let's add logic to our server that ensure that the user passes the reCAPTCHA before allowing them to post:

```JavaScript
app.post('/api/switts', function(req, res) {
  recaptcha.verify(req, function(error){
    if(!error) {
			var newSwitt = new db.Switt({
				name: req.body.name,
				super_power: req.body.super_power,
			});
			newSwitt.save(function(err, savedSwitt) {
				if (err) {
					res.sendStatus(404);
				}
				res.json(savedSwitt);
			});
		}
    else {
			console.log("Captcha failure");
		}
	});
});
```

* Almost done! Lastly, let's add the reCAPTCHA to our HTML for the form. Code will be added in two places. First, include the reCAPTCHA CDN in the header of your site:

```HTML
<!-- APPLICATION SCRIPTS -->
<script src="scripts/app.js"></script>
<script src='https://www.google.com/recaptcha/api.js'></script>
```

* Lastly, include the reCAPTCHA widget wherever you want it on the form:

```HTML
  <div class="g-recaptcha" data-sitekey="YOUR_PUBLIC_KEY"></div>
```

* You did it! Bots can eat it. Ask Bill if you have any questions!

<img src="https://www.google.com/recaptcha/intro/images/hero-recaptcha-demo.gif" width="300px" />


## Links to Developer’s Github :octocat:
* [Bill Himmelsbach] (https://github.com/billhimmelsbach)
