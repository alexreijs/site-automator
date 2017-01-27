#!/bin/bash

echo '\nRunning script: Pubmatic-UI KPI script\n'

# Start looking for part file in background
CMD="sh /usr/local/repos/site-automator/sh/copy-part-file.sh pubmatic-ui kpis csv"
$CMD &

# Run SlimerJS
xvfb-run -a /usr/local/bin/slimerjs /usr/local/repos/site-automator/pubmatic-ui.js
