#!/bin/bash

function main() {
    migrationListLocal=$(migrate list -f ./ts-migrate-mongoose-config.ts | sed 's/up/\nup/g')

    echo $migrationListLocal
    return 0
}

main
