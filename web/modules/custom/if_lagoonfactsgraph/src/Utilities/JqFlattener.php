<?php

namespace Drupal\if_lagoonfactsgraph\Utilities;

use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

/**
 * Utilities for JSON data.
 *
 * Due to memory, uses jq and the shell for json strings.
 */
class JqFlattener {

  /**
   * Transform the JSON string.
   */
  public static function jqFlattenFacts(string $json): array {

    $jqCommand = <<<EOF
    [
      .data.allProjects[] |
      {ProjectID: .id, ProjectName: .name} as \$proj |
      .environments[] |
      {EnvironmentID: .id, EnvironmentName: .name} as \$env |
      .facts[] |
      \$proj + \$env + .
    ]
    EOF;

    $tempFile = tempnam(sys_get_temp_dir(), __FUNCTION__);
    file_put_contents($tempFile, $json);

    $process = new Process(["jq",
      $jqCommand,
      $tempFile,
    ]);

    $process->run();

    if (!$process->isSuccessful()) {
      throw new ProcessFailedException($process);
    }

    $result = $process->getOutput();

    return json_decode($result, TRUE) ?: [];

  }

  /**
   * Transform the JSON string.
   */
  public static function jqFlattenProjects(string $json): array {

    $jqCommand = <<<EOF
    [.data.allProjects []
    | {
        ("project_id"): .id,
        ("project_name"): .name,
        ("project_gitUrl"): .gitUrl,
        ("project_branches"): .branches,
        ("project_pullrequests"): .pullrequests,
        ("project_availability"): .availability,
        ("project_created"): .created,
        ("project_productionEnvironment"): .productionEnvironment
      } as \$project
    | if .environments? and .environments != null then
        .environments[]
        | \$project + .
      else
        \$project
    end]
    EOF;

    // tempnam(sys_get_temp_dir(), __FUNCTION__);.
    $tempFile = "../tempFile.json";
    file_put_contents($tempFile, $json);

    $process = new Process(["jq",
      $jqCommand,
      $tempFile,
    ]);

    $process->run();

    if (!$process->isSuccessful()) {
      throw new ProcessFailedException($process);
    }

    $result = $process->getOutput();

    return json_decode($result, TRUE) ?: [];

  }

}
