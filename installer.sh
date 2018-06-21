#!/bin/bash

clear
echo "Preparing stage for installation"
cd ~/public_html
currentDate=`date '+%Y%m%d%H%M%S'`

echo "Removing old backup"
rm -rf backup*.tar

echo "Taking new backup"
`tar -cvf backup${currentDate}.tar ../portfolio/`
rm -rf portfolio

echo "Unpacking latest"
mkdir portfolio
`tar -xvzf deploy_build.tar -C portfolio`

echo "restart PM2"
pm2 restart npm
