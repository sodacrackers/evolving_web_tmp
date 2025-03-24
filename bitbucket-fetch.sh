#!/bin/bash

###
# Script to fetch Bitbucket API data.
#
# Provides a helper to search commits across all repositories. Output from API
# requests are cached; also returned from each command for pipes or use.
#
# @see https://developer.atlassian.com/cloud/bitbucket/rest/
# @see https://support.atlassian.com/bitbucket-cloud/docs/using-workspace-access-tokens/
#
# @usage
#   Open terminal and navigate to this script's directory. Run
#   `source bitbucket-fetch.sh` to load this script into your shell.
#   Run `tail -f $__BB_LOGFILE` to display script output in real time.
#
#  Bitbucket helper functions:
#   `__bb_refresh_api_data` - fetch and cache all Bitbucket data.
#   `__bb_fetch_repository_names` - get all repository names.
#   `__bb_fetch_commits` - get commits for current directory or a repository.
#   `__bb_find_commit_messages "zzzz"` - search commit messages from all repos.
#   `__bb_find_custom_files "zzzz"` - find custom files in the current directory.
#   `__bb_refresh_file_dates` - set directory contents to the repository's dates.
#
###

# Configure API access and workspace.
__BB_TOKEN="$BITBUCKET_WORKSPACE_READ_ONLY_TOKEN"
__BB_API_URL="https://api.bitbucket.org/2.0"
__BB_WORKSPACE="interpersonal-frequency"
__BB_CACHE_DIR="$HOME/__bb_bitbucket_data"
__BB_LOGFILE="$__BB_CACHE_DIR/__log.log"

# Open descriptor 3 for info logging
mkdir -p $__BB_CACHE_DIR
touch $__BB_LOGFILE
exec 3>>"$__BB_LOGFILE"

# Simple logging routine
__bb_log() {
    echo "[LOG] $1" >&3
}

# Get repository names
__bb_fetch_repository_names() {
    __bb_fetch_repositories | jq -r '.values[] .slug'
}

# Fetch repositories
__bb_fetch_repositories() {
    __bb_log "Fetching repositories..."
    __bb_make_api_request "$__BB_API_URL/repositories/$__BB_WORKSPACE?pagelen=100" true
}

# Fetch commits for repository
__bb_fetch_commits() {
    # Set the repo if not provided
    [[ "$1" ]] && local repo_slug=$1 || local repo_slug=${PWD##*/}
    __bb_log "Fetching commits for $repo_slug..."
    __bb_make_api_request "$__BB_API_URL/repositories/$__BB_WORKSPACE/$repo_slug/commits?pagelen=50" true
}

# Fetch pull requests for repository
__bb_fetch_pull_requests() {
    # https://jira.atlassian.com/browse/BCLOUD-22014
    # https://community.atlassian.com/t5/Bitbucket-questions/Re-Get-merge-checks-status-of-pull-request-via-api/qaq-p/2629020/comment-id/102243#M102243
    [[ "$1" ]] && local repo_slug=$1 || local repo_slug=${PWD##*/}
    __bb_log "Fetching pull requests for $repo_slug..."
    __bb_make_api_request "$__BB_API_URL/repositories/$__BB_WORKSPACE/$repo_slug/pullrequests?pagelen=50" true
}

# Wrapper to fetch repositories and commits
__bb_refresh_api_data() {
    __bb_log "Refreshing Bitbucket API data..."
    __bb_log "Fetching repositories..."
    __bb_fetch_repository_names | while IFS= read -r repo; do
        __bb_log "Fetching $repo commits..."
        __bb_fetch_commits $repo
    done
    # Now that we have recent commits, page for older results
    _bb_fetch_repository_names | while IFS= read -r repo; do
        __bb_log "Fetching older $repo commit history..."
        __bb_fetch_older_commits $repo
    done
    __bb_log "Repos data saved."
}

# Page through older commits
__bb_fetch_older_commits() {
    # Set the repo if not provided
    [[ "$1" ]] && local repo_slug=$1 || local repo_slug=${PWD##*/}
    local i=0
    local commits=$(__bb_fetch_commits $repo_slug)
    while ((i++ < 20)); do
        local next_url=$(echo "$commits" | jq -r '.next // empty')
        if [ -n "$next_url" ]; then
            __bb_log "Fetching $repo commits page $i..."
            commits=$(__bb_make_api_request "$next_url")
        fi
    done
}

# Wrapper function to make file dates match git
__bb_refresh_file_dates() {
    __bb_find_custom_files | while read -r file; do
        # __bb_log "Setting dates for ${file:0:100}..."
        __bb_touch_file "$file"
    done
}

# Touch a file to update its last modified time to the last git commit date
__bb_touch_file() {
    local file=$1
    local file_dir=$(dirname "$file")
    (
        cd $file_dir || return
        local last_commit_date=$(git log -1 --format="%at" -- "$file" 2>/dev/null)
        if [ -n "$last_commit_date" ]; then
            local date=$(date -d "@$last_commit_date" +%Y%m%d%H%M.%S)
            if [ -n "$date" ]; then
                touch -t $date "$file"
            fi
        fi
    )
}

# Search for files by name
__bb_find_custom_files() {
    local name_contains=$1
    local find_command="find . \
        -type f \
        ! -path '*/.git/*' \
        ! -path '*/vendor/*' \
        ! -path '*/build/*' \
        ! -path '*/static/*' \
        ! -path '*/node_modules/*' \
        ! -path '*/sites/default/files/*'
        "

    if [ -n "$name_contains" ]; then
        find_command+="\
            -printf '%TF %Tr %p\n' \
            | grep -i $name_contains \
            | sort"
    fi
    eval $find_command
}

# Search for commits having a string
__bb_find_commit_messages() {
    local search_string=$1
    __bb_log "Searching commits for '$search_string'"

    local results=()
    for file in $__BB_CACHE_DIR/*commits*.json; do

        # Skip files with no match
        if ! grep -q "$search_string" "$file"; then
            continue
        fi

        # Test if the file contains valid JSON
        if jq empty "$file" >/dev/null 2>&1 || true; then

            local filtered_values=$(jq -c '.values[]' "$file" | jq -c '
                select(.message | test("'$search_string'"; "i"))
            ' || true)

            local result=$(echo "$filtered_values" | jq '{
                type: .type,
                hash: .hash,
                date: .date,
                repository: .repository.name,
                message: .message,
                author: .author.raw,
                link: .links.html.href
            }' || true)

            if [ -n "$result" ]; then
                results+=($result)
            fi
        else
            __bb_log "Invalid json in $file"
        fi
    done
    local file="$__BB_CACHE_DIR/__search_results.json"
    echo ${results[@]} | jq -s 'sort_by(.date)' >$file

    cat $file | jq 'group_by(.repository) | map(sort_by(.date) | .[-1])'
    __bb_log "Search results count: ${#results[@]}"
    __bb_log "Full search result saved to $file"
}

# Clone and download all repositories
__bb_clone_all_repositories() {
    __bb_log "Cloning all repositories..."
    repo_names=$(__bb_fetch_repository_names)
    echo $repo_names | while IFS= read -r repo; do
        __bb_log "Cloning repository: $repo"
        git clone git@bitbucket.org:$__BB_WORKSPACE/$repo.git
    done
}


# Convert a URL to a safe filename
__bb_clean_filename() {
    local name=$1
    # Extract the page parameter value
    local page_num=$(echo $url | grep -o 'page=[^&]*')
    local file="${url/$__BB_API_URL/}"
    file="${file%%\?*}"
    file="${file//\//_}"
    file="${file//[^_a-zA-Z0-9]/}"
    file="${file/#_/}"
    file="$file$page_param"
    file="$__BB_CACHE_DIR/$file.json"
    echo $file
}

# Wrapper function to make API requests
__bb_make_api_request() {
    local url=$1
    local no_cache=$2
    local file=$(__bb_clean_filename $url)

    __bb_log "Fetching $url"

    if [ -f "$file" ] && [ -z "$no_cache" ]; then
        __bb_log "Using cached $file"
        cat $file
        return
    fi

    local response=$(
        curl \
            --silent \
            --header "Authorization: Bearer $__BB_TOKEN" \
            --header "Accept: application/json" \
            $url
    )

    local json=$(
        echo $response |
            sed 's/\\n/\\\\n/g' |
            tr -d '\000-\037' |
            jq -c . 2>/dev/null
    )

    if [ $? -ne 0 ]; then
        __bb_log "Failed to parse JSON from: $url"
        return 1
    fi

    __bb_log "Saving result to $file"
    echo $json >$file
    echo $json
}
