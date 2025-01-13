#!/bin/bash 

# Variables
aws_arn="885134767910.dkr.ecr.ap-south-1.amazonaws.com"

# ECR Login
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin "$aws_arn"

# Variables to edit
project_name="cs"
repo_name="ui"

# Varibles to NOT edit
container_name="$project_name"_"$repo_name"
deployment_group_name="$DEPLOYMENT_GROUP_NAME"
release_version=$(aws ssm get-parameter --name "$container_name"_"$deployment_group_name" --query "Parameter.Value" --output text)

#Pulling image from ECR
docker pull "$aws_arn"/"$project_name"-"$deployment_group_name":"$container_name"_v_"$release_version"

#Changing image tag
docker image tag "$aws_arn"/"$project_name"-"$deployment_group_name":"$container_name"_v_"$release_version" $container_name:"$release_version"

#Remove unknown 
sudo aa-remove-unknown

#Stop current container 
docker stop "$container_name"

#Stop and remove the current container 
docker rm -f "$container_name"

#Creating and starting a docker container using a new image
docker run -d -p 4343:80 --name "$container_name" "$container_name":"$release_version"

#Remove all unused images 
docker image prune -af