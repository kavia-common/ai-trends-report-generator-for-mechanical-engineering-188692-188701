#!/bin/bash
cd /home/kavia/workspace/code-generation/ai-trends-report-generator-for-mechanical-engineering-188692-188701/frontend_react
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

