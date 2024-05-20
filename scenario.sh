#!/bin/bash

# Check if the correct number of arguments are provided
if [ "$#" -lt 2 ]; then
    echo "Usage: $0 <path-to-yaml-file> <new-version> [<new-version> ...]"
    exit 1
fi

# Assign arguments to variables
yaml_file=$1
shift
new_versions=("$@")

# Validate the YAML file exists
if [ ! -f "$yaml_file" ]; then
    echo "File not found: $yaml_file"
    exit 1
fi

# Original image pattern to search
original_image="gcr.io/heptio-images/ks-guestbook-demo:0.1"

# Loop through each new version and update the image
for new_version in "${new_versions[@]}"; do
    # New image tag
    new_image="gcr.io/heptio-images/ks-guestbook-demo:$new_version"

    # Replace the image in the YAML file
    sed -i.bak "s|$original_image|$new_image|" "$yaml_file"

    # Check if the replacement was successful
    if grep -q "$new_image" "$yaml_file"; then
        echo "Updated image to $new_image in $yaml_file"
    else
        echo "Failed to update image to $new_image in $yaml_file"
        exit 1
    fi

    # Add changes to git
    git add "$yaml_file"

    # Commit the changes
    commit_message="Updated image in $yaml_file to $new_image"
    git commit -m "$commit_message"

    # Push the changes
    git push

    # Provide feedback
    if [ $? -eq 0 ]; then
        echo "Changes pushed successfully for version $new_version."
    else
        echo "Failed to push changes for version $new_version."
        exit 1
    fi

    # Set the original image to the new image for the next iteration
    original_image=$new_image
done
