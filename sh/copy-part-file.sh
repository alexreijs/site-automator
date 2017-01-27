#!/bin/bash
echo 'Looking for part files in /tmp folder for 90 seconds ...\n'
I=0
while [ $I -lt 90 ]
do
        DATE=`date +%Y-%m-%d`
        PART_FILE=`find /tmp/ -mmin -1 -name "*.$3.part"`
        DEST_FOLDER=~/site-automator-output/$1/$2
        DEST_FILE=$DEST_FOLDER/$DATE.$3

        if [ ${#PART_FILE} -gt 0 ]; then

                PART_FILE_SIZE_1=`wc -c < $PART_FILE`
                sleep 5
                PART_FILE_SIZE_2=`wc -c < $PART_FILE`

                if [ $PART_FILE_SIZE_1 -eq $PART_FILE_SIZE_2 ]; then

                        mkdir -p $DEST_FOLDER
                        #cp $PART_FILE $DEST_FILE
                        cp $PART_FILE $DEST_FOLDER/latest.$3
                        echo Copying file $PART_FILE to $DEST_FOLDER/latest.$3 ...
                        exit

                fi

        fi

        sleep 1
        I=$(($I + 1))
done

