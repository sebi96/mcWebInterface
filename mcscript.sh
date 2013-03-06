# License Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0.html)
# Script from Hount (http://www.minecraftwiki.net/wiki/User:Hount)
# Get the script from http://www.minecraftwiki.net/wiki/Tutorials/Server_startup_script#Script


#!binbash
# etcinit.dminecraft
# version 0.3.9 2012-08-13 (YYYY-MM-DD)

### BEGIN INIT INFO
# Provides   minecraft
# Required-Start $local_fs $remote_fs
# Required-Stop  $local_fs $remote_fs
# Should-Start   $network
# Should-Stop    $network
# Default-Start  2 3 4 5
# Default-Stop   0 1 6
# Short-Description    Minecraft server
# Description    Starts the minecraft server
### END INIT INFO

#Settings
SERVICE='minecraft_server.jar'
OPTIONS='nogui'
USERNAME='minecraft'
WORLD='world'
MCPATH='homeminecraftminecraft'
BACKUPPATH='mediaremote.shareminecraft.backup'
MAXHEAP=2048
MINHEAP=1024
HISTORY=1024
CPU_COUNT=1
INVOCATION=java -Xmx${MAXHEAP}M -Xms${MINHEAP}M -XX+UseConcMarkSweepGC 
-XX+CMSIncrementalPacing -XXParallelGCThreads=$CPU_COUNT -XX+AggressiveOpts 
-jar $SERVICE $OPTIONS

ME=`whoami`
as_user() {
  if [ $ME == $USERNAME ] ; then
    bash -c $1
  else
    su - $USERNAME -c $1
  fi
}

mc_start() {
  if  pgrep -u $USERNAME -f $SERVICE  devnull
  then
    echo $SERVICE is already running!
  else
    echo Starting $SERVICE...
    cd $MCPATH
    as_user cd $MCPATH && screen -h $HISTORY -dmS minecraft $INVOCATION
    sleep 7
    if pgrep -u $USERNAME -f $SERVICE  devnull
    then
      echo $SERVICE is now running.
    else
      echo Error! Could not start $SERVICE!
    fi
  fi
}

mc_saveoff() {
  if pgrep -u $USERNAME -f $SERVICE  devnull
  then
    echo $SERVICE is running... suspending saves
    as_user screen -p 0 -S minecraft -X eval 'stuff say SERVER BACKUP STARTING. Server going readonly...015'
    as_user screen -p 0 -S minecraft -X eval 'stuff save-off015'
    as_user screen -p 0 -S minecraft -X eval 'stuff save-all015'
    sync
    sleep 10
  else
    echo $SERVICE is not running. Not suspending saves.
  fi
}

mc_saveon() {
  if pgrep -u $USERNAME -f $SERVICE  devnull
  then
    echo $SERVICE is running... re-enabling saves
    as_user screen -p 0 -S minecraft -X eval 'stuff save-on015'
    as_user screen -p 0 -S minecraft -X eval 'stuff say SERVER BACKUP ENDED. Server going read-write...015'
  else
    echo $SERVICE is not running. Not resuming saves.
  fi
}

mc_stop() {
  if pgrep -u $USERNAME -f $SERVICE  devnull
  then
    echo Stopping $SERVICE
    as_user screen -p 0 -S minecraft -X eval 'stuff say SERVER SHUTTING DOWN IN 10 SECONDS. Saving map...015'
    as_user screen -p 0 -S minecraft -X eval 'stuff save-all015'
    sleep 10
    as_user screen -p 0 -S minecraft -X eval 'stuff stop015'
    sleep 7
  else
    echo $SERVICE was not running.
  fi
  if pgrep -u $USERNAME -f $SERVICE  devnull
  then
    echo Error! $SERVICE could not be stopped.
  else
    echo $SERVICE is stopped.
  fi
}

mc_update() {
  if pgrep -u $USERNAME -f $SERVICE  devnull
  then
    echo $SERVICE is running! Will not start update.
  else
    MC_SERVER_URL=https3.amazonaws.comMinecraftDownloadlauncherminecraft_server.jarv=`date  sed s[^a-zA-Z0-9]_g`
    as_user cd $MCPATH && wget -q -O $MCPATHminecraft_server.jar.update $MC_SERVER_URL
    if [ -f $MCPATHminecraft_server.jar.update ]
    then
      if `diff $MCPATH$SERVICE $MCPATHminecraft_server.jar.update devnull`
      then 
        echo You are already running the latest version of $SERVICE.
      else
        as_user mv $MCPATHminecraft_server.jar.update $MCPATH$SERVICE
        echo Minecraft successfully updated.
      fi
    else
      echo Minecraft update could not be downloaded.
    fi
  fi
}

mc_backup() {
   mc_saveoff
   
   NOW=`date +%Y-%m-%d_%Hh%M`
   BACKUP_FILE=$BACKUPPATH${WORLD}_${NOW}.tar
   echo Backing up minecraft world...
   #as_user cd $MCPATH && cp -r $WORLD $BACKUPPATH${WORLD}_`date +%Y.%m.%d_%H.%M`
   as_user tar -C $MCPATH -cf $BACKUP_FILE $WORLD

   echo Backing up $SERVICE
   as_user tar -C $MCPATH -rf $BACKUP_FILE $SERVICE
   #as_user cp $MCPATH$SERVICE $BACKUPPATHminecraft_server_${NOW}.jar

   mc_saveon

   echo Compressing backup...
   as_user gzip -f $BACKUP_FILE
   echo Done.
}

mc_command() {
  command=$1;
  if pgrep -u $USERNAME -f $SERVICE  devnull
  then
    pre_log_len=`wc -l $MCPATHserver.log  awk '{print $1}'`
    echo $SERVICE is running... executing command
    as_user screen -p 0 -S minecraft -X eval 'stuff $command015'
    sleep .1 # assumes that the command will run and print to the log file in less than .1 seconds
    # print output
    tail -n $[`wc -l $MCPATHserver.log  awk '{print $1}'`-$pre_log_len] $MCPATHserver.log
  fi
}

#Start-Stop here
case $1 in
  start)
    mc_start
    ;;
  stop)
    mc_stop
    ;;
  restart)
    mc_stop
    mc_start
    ;;
  update)
    mc_stop
    mc_backup
    mc_update
    mc_start
    ;;
  backup)
    mc_backup
    ;;
  status)
    if pgrep -u $USERNAME -f $SERVICE  devnull
    then
      echo true
    else
      echo false
    fi
    ;;
  command)
    if [ $# -gt 1 ]; then
      shift
      mc_command $
    else
      echo Must specify server command (try 'help')
    fi
    ;;

  )
  echo Usage $0 {startstopupdatebackupstatusrestartcommand server command}
  exit 1
  ;;
esac

exit 0