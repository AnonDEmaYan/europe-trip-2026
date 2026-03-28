#!/bin/sh
set -e
USER="${TRIP_SITE_USER:-trip}"
PASS="${TRIP_SITE_PASSWORD:-changeme}"
htpasswd -bcB /tmp/.htpasswd "$USER" "$PASS" >/dev/null
