# Team01
The project of Team 01 in the Runestone project of the GSDP course, spring of 2019.

# Some Heroku commands :
# Login
heroku login

# Clone app repository
heroku git:clone -a [appname]

# Creation :
# Create an Heroku app
heroku create [appname]

# Deploy code
git push heroku master

# Ensure that at least one instance of the app is running (1 = on, 0 = off)
heroku ps:scale web=1

# Open
heroku open

# View logs
heroku logs --tail

# Get code
git pull heroku master


# Start app locally for python app:
# Some settings
python manage.py collectstatic

# Launch locally with Windows
heroku local web -f Procfile.windows

# Launch locally with Unix
heroku local web


# Start app locally for node.js app:
# Install dependencies
npm install

# Launch locally
heroku local web


# Link to local app
http://localhost:5000


# Update :
# Add everything to git repository
git add .
# Commit the changes with comment
git commit -m "Latest update."
# Deploy code
git push heroku master


# Some Git commands :
# Check which branch you're in, what you've changed
git branch
git status

# Change branch
git checkout server/master

# Pull
git pull

# Update :
# Add all to git
git add .
# Upload
git commit -m "Message"
# Push
git push

# Git repositories:
# List
git remote -v
# Remove
git remote rm [name]
# Add
git remote add [name]
