bowling score website

note to self:
configuring SSL, use standalone certbot, restart the instance to turn off routing.
../../../etc/letsencrypt/live/onthelanes.xyz
where the keys are

to move the finished build into the nginx directory on aws:
sudo rm -r /var/www/html/_
sudo mv ./build/_ /var/www/html
sudo systemctl restart nginx
