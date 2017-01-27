#!/bin/bash

echo '\nRunning script: 360-Yield-UI Revenue script\n'

# Start looking for part file in background
CMD="sh /usr/local/repos/site-automator/sh/copy-part-file.sh 360-yield-ui revenue xlsx"
$CMD &

# Run SlimerJS
xvfb-run -a /usr/local/bin/slimerjs /usr/local/repos/site-automator/360-yield-ui.js metric=Revenue

echo '\nRunning script: 360-Yield-UI Weighted Impressions\n'

# Start looking for part file in background
CMD="sh /usr/local/repos/site-automator/sh/copy-part-file.sh 360-yield-ui weighted-impressions xlsx"
$CMD &

# Run SlimerJS
xvfb-run -a /usr/local/bin/slimerjs /usr/local/repos/site-automator/360-yield-ui.js metric='Weighted Impressions'
