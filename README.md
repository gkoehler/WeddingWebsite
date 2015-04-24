# GavinAndMichaela.com

Here's our awesome wedding site. A running example of it can be found here: [GavinAndMichaela.com](http://gavinandmichaela.com)

## Features

* Scales nicely down to tablet and mobile sizes
* Holds as many photos as you like, and automatically resizes them as-needed
* Single-page, with hyperlinks at the top that let you "jump" to a section
* RSVP system allows guests to confirm their attendance, and their guest count, just by using their name
* Every RSVP action is logged, and can be undone; and an email is sent to you as each one comes in

Technical features:

* Based on bootstrap
* Uses LESS and grunt to make client-side development nice and keep your markup clean
* RSVP system uses Django, which means easy admin forms, if you want to view/change the data

# Importing Your Guest List

Select your columns in Excel / Google Docs and [convert to JSON](http://shancarter.github.io/mr-data-converter/). Then, run something like this to re-map into fixtures, which Django can import:

    var data = [your_data_here];
    var counter = 0;
    var fixture = $.map(data, function(person) {
        return {
            "model": "rsvps.Invitee",
            "pk": ++counter,
            "fields": {
                "name":person.Titles + ' ' + person["Name(s)"],
                "num_allowed":person["No."],
                "was_submitted":false,
                "num_rsvpd":0
            }
        }
    });
    console.log(JSON.stringify(fixture));

(you'll want to replace "Name(s)" and "No." with the column names you used)

Save the resulting output as `gamapi/rsvps/fixtures/inviteefixture.json` and run `python manage.py loaddata inviteefixture`.

# Running

Load `build/index.html` in your browser.

# Editing

Open iTerm to the `Website` directory and type `grunt`. Will automatically insert livereload stuff, so your browser will refresh as you save files.

In the event you want to add a grunt plugin: `npm install grunt-plugin-name --save-dev`

To run the API, you'll need to start the Django app. I recommend using virtualenv, then using pip to install all packages.

# Publishing

If you want to do a lot of iterative deploys, Fabric is recommended for publishing. If you're sending over a large batch of images, I recommend a tar/untar action, using a combination of `with_statement` and `put`.



