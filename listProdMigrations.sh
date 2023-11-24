#!/bin/bash

function main() {
    echo
    echo "Enter the production Mongo URI:"
    read mongoUri

    migrationListProd=$(migrate list -f ./ts-migrate-mongoose-config.ts -d "$mongoUri"| sed 's/up/\nup/g')

    echo $migrationListProd
    return 0
}

main
