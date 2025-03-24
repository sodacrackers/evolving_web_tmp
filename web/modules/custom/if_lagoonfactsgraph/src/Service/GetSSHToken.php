<?php

namespace Drupal\if_lagoonfactsgraph\Service;

use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

/**
 * Fetch a token.
 */
class GetSSHToken {

  /**
   * The temporary token.
   *
   * @var string
   */
  public string $token = "";

  /**
   * The cache file.
   *
   * @var string
   */
  protected string $cacheFile = "";

  /**
   * The Symfony process for SSH.
   *
   * @var Symfony\Component\Process\Process
   */
  private Process $process;

  /**
   * Our contstructor.
   */
  public function __construct() {

    // Cache tokens for one hour.
    $this->cacheFile = sys_get_temp_dir() . "/" . date("y.m.d.h") . "token";
    $this->loadToken();

    // Fetch token if missing.
    if (!$this->token) {
      $this->refreshToken();
    }

  }

  /**
   * Get token value.
   */
  public function getToken() {

    return $this->token;

  }

  /**
   * Load cached token.
   */
  public function loadToken() {

    touch($this->cacheFile);
    $this->token = trim(str_replace(["\r", "\n"], "",
        file_get_contents($this->cacheFile)
      ));

    return $this;

  }

  /**
   * Fetch a new token.
   *
   * @return \Drupal\if_lagoonfactsgraph\Service\GetSSHToken
   *   Object.
   */
  public function refreshToken() {

    try {
      // Specify cache file to write to.
      $this->process = new Process(
        ["sh",
          "../lagoon/scripts/generate-graphql-bearer-token.sh",
          $this->cacheFile,
        ]);
      $this->process->mustRun();
      $this->loadToken();
    }

    catch (ProcessFailedException $exception) {
      $this->token = "Error fetching token: " . $exception->getMessage();
    }

    return $this;

  }

}
