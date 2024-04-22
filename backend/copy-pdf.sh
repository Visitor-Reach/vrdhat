#!/bin/bash

# Define the directory and S3 bucket
DIRECTORY="./"
S3_BUCKET="s3://vr-pdf"

# Iterate over all PDF files in the directory
for file in $DIRECTORY/*.pdf
do
  # Upload each file to S3
  aws s3 cp "$file" "$S3_BUCKET"
done

