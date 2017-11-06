# To invoke this script as a one-liner through SSH:
# ssh -i ~/.ssh/<YOUR FIRST NAME>.pem <YOUR FIRST NAME>@ec2-18-216-3-210.us-east-2.compute.amazonaws.com -t 'echo <YOUR SERVER PASSWORD> | sudo -Su ubuntu /srv/SharedSpacesDeployment/deploy_backend.sh'
cd /srv/SharedSpacesDeployment/github-building/server-side
git pull
cp -a /srv/SharedSpacesDeployment/github-building/server-side/. /srv/SharedSpacesDeployment/server
sudo cp nginx.conf /etc/nginx/sites-available/tutorial