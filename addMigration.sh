#!/bin/bash

function main() {
    echo "Creating a migration file. Enter a name for the migration: "
    read migrationFileName

    # Replace spaces with dashes and make lower case
    migrationFileName=$(echo "$migrationFileName" | tr '[:space:]' '-' | tr '[:upper:]' '[:lower:]')
    # Removing trailing dash
    migrationFileName=${migrationFileName%%-}

    _createMigrationFile $migrationFileName
    echo
    echo "Remember to remove test migrations files after testing"
    return 0
}

function _createMigrationFile() {
  if [ -z "$1" ]; then
    echo "Error: must enter migration name"
    return 1
  fi
  
  echo 
  echo "Creating Migration File"
  echo
  echo $(migrate create "$1" -f ./ts-migrate-mongoose-config.ts -m ./migration/migrations -a true | sed 's/Run migrate up '$1' to apply the migration//g')
  return 0
}

main
