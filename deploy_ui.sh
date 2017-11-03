# To invoke this script as a one-liner through SSH:
# ssh -i ~/.ssh/<YOUR FIRST NAME>.pem <YOUR FIRST NAME>@ec2-18-216-3-210.us-east-2.compute.amazonaws.com -t 'echo <YOUR SERVER PASSWORD> | sudo -Su ubuntu /srv/SharedSpacesDeployment/deploy_ui.sh'
cd /srv/SharedSpacesDeployment/github-building/react-web
git pull
npm run build
rm -rf /srv/SharedSpacesDeployment/client
cp -r /srv/SharedSpacesDeployment/github-building/react-web/build /srv/SharedSpacesDeployment/client