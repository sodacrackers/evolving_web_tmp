#
# Shell script functions for various tasks
#

# Create a directory and change into it.
m_kd () {
	mkdir -p $1 && cd $1
}

# Create directories to a file.
m_kf () {
	local dir=basename($1)
	mkdir -p $dir
	touch $1
}

# Search files for string #2, if the path contains string #1.
m_path_contains_then_file_contains () {
    local path_contains=$1
    local file_contains=$2
    local results=$(
        find . \
            -type f \
            -path '*/web/*/custom/*' \
            ! -path '*/.git/*' \
            ! -path '*/core/*' \
            ! -path '*/vendor/*' \
            ! -path '*/node_modules/*' \
            ! -path '*/build/*' \
            ! -path '*/static/*' \
            ! -path '*/sites/default/files/*'
    )

    if [ -n "$path_contains" ]; then
        echo "Searching file paths for $path_contains..."
        results=$(echo $results | grep -i $path_contains)
    fi

    if [ -n "$file_contains" ]; then
        echo "Searching file contents for $file_contains..."
        echo $results | while IFS= read -r file; do
            grep -H -B 3 -A 3 "$file_contains" $file
        done
    fi
}

# Disable user 1 and create a personal admin account.
m_uli () {
    echo "Preparing script to create a Drupal account............."

    [[ "$1" && "$1" != "-" ]] && local PROJECT=$1 || local PROJECT=$(basename "$(pwd)")
    [[ "$2" && "$2" != "-" ]] && local ENVIRONMENT=$2 || local ENVIRONMENT=$(git rev-parse --abbrev-ref HEAD)
    [[ "$3" && "$3" != "-" ]] && local MAIL=$3 || MAIL=$(whoami)@noname.me
    ENVIRONMENT=${ENVIRONMENT//\//-} # Replace "/" with "-"

    local SCRIPT=~/uli.sh
    touch $SCRIPT
    cat <<EOF >$SCRIPT

#!/bin/sh

drush sql:query "update users_field_data set mail='' where uid=1;"
drush user:create $MAIL --mail=$MAIL

ROLES=\$(drush sql:query "select roles_target_id from user__roles group by roles_target_id;")
for role in \$ROLES; do drush user:role:add \$role $MAIL; done;

printf "\n\nUSER INFORMATION:\n"
drush user:information --mail=$MAIL

printf "\n\nLOGIN LINK:\n"
printf "drush user:login --mail=$MAIL\n"

drush user:login --mail=$MAIL

EOF

    echo "Running script on env............."

    local CMD="ssh \\
        -o UserKnownHostsFile=/dev/null \\
        -o StrictHostKeyChecking=no \\
        -o LogLevel=FATAL \\
        -p 32222 \\
        $PROJECT-$ENVIRONMENT@ssh.client.amazeeio.cloud < $SCRIPT
        "

    [[ -z "$1" ]] &&
        CMD="lando ssh < $SCRIPT"

    echo $CMD && eval $CMD

}
