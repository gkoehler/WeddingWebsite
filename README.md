# GavinAndMichaela.com

Here's our awesome wedding site. Some of the neat features:

* Single-page, with hyperlinks at the top that let you "jump" to a section
* Scales nicely down to tablet and mobile sizes
* Based on bootstrap
* Uses LESS and grunt 

# Importing Data

Select your columns in Excel / Google Docs and [convert to JSON](http://shancarter.github.io/mr-data-converter/). Then, run something like this to re-map into fixtures:

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

Save the resulting output as `gamapi/rsvps/fixtures/inviteefixture.json` and run `python manage.py loaddata inviteefixture`.

# Running

Load `build/default.html` in your browser.

# Editing

Open iTerm to the `Website` directory and type `grunt`. Will automatically insert livereload stuff. 

Adding a grunt plugin: `npm install grunt-plugin-name --save-dev`

# Publishing

Publishing updates to the site:

    cd Website
    fab deploy_prod

If the images need to be re-transferred:

    fab deploy_prod:True

