#!/bin/bash

TODAY=`date +%Y-%m-%d_%H-%M-%S`
LOGFILE="/var/log/api.log"

echo "Running script $TODAY" >> $LOGFILE

echo | tee -a $LOGFILE
echo ">> Backup repos" | tee -a $LOGFILE
if [ -d /home/dtovbein ];
then
    tar cvf /home/dtovbein/backups/backup_$TODAY.tar /home/dtovbein/repos/*
    rm -rf /home/dtovbein/repos
fi
    mkdir -p /home/dtovbein/repos

echo | tee -a $LOGFILE
echo ">> Cloning repos" | tee -a $LOGFILE
cd /home/dtovbein/repos
https://github.com/GreenpeaceSkunk/greenpeace-skunk-api


echo | tee -a $LOGFILE
echo "> Trying to stop Docker processes" | tee -a $LOGFILE
Docker_process="`sudo docker ps -aq`"
if [ "$Docker_process" != "" ];
then
    echo ">> Stopping Dockers processes" | tee -a $LOGFILE
    sudo docker stop $(sudo docker ps -aq) | tee -a $LOGFILE
    sleep 5
else
    echo ">>> Docker is not running *" | tee -a $LOGFILE
fi

echo "> Trying to remove Docker images" | tee -a $LOGFILE
Docker_images="`sudo docker images -q`"
if [ "$Docker_images" != "" ];
then
    echo | tee -a $LOGFILE
    echo ">> Deleting <Docker images" | tee -a $LOGFILE
    sudo docker rmi $(sudo docker images -q)
fi

echo "" | tee -a $LOGFILE



