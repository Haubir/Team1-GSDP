# Team01
The project of Team 01 in the Runestone project of the GSDP course, spring of 2019.

# Some Heroku commands :

# Login
heroku login

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

# Update :
# Add everything to git repository
git add .
# Commit the changes with comment
git commit -m "Latest update."
# Deploy code
git push heroku master
