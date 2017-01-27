# Set config for gsutil
BOTO_CONFIG="/home/alexander_reijs/config/site-automator.boto"

# Remove latest files (in order to make sure they are uploaded them again)
#gsutil rm gs://site-automator-output/360-yield-ui/revenue/latest.xlsx
#gsutil rm gs://site-automator-output/360-yield-ui/weighted-impressions/latest.xlsx
#gsutil rm gs://site-automator-output/pubmatic-ui/kpis/latest.csv

# Copy site-automator-output to Google Storage
/usr/local/bin/gsutil -m cp -r ~/site-automator-output/* gs://site-automator-output/
