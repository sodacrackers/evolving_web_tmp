<?php

namespace Drupal\if_lagoonfactsgraph\Service;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

/**
 * Fetch graph data.
 */
class GetGraphQL {

  /**
   * The host to use.
   *
   * @var string
   */
  private string $graphURL = "https://api.lagoon.amazeeio.cloud/graphql";

  /**
   * The token to use.
   *
   * @var string
   */
  public string $bearerToken = "";

  /**
   * The graph query.
   *
   * @var string
   */
  public string $graphQuery = "";

  /**
   * The query response.
   *
   * @var string
   */
  protected string $graphResult = "";

  /**
   * The query response.
   *
   * @var string
   */
  protected string $facts = "";

  /**
   * The HTTP client.
   *
   * @var \GuzzleHttp\Client
   */
  protected $httpClient;

  /**
   * The constructor.
   *
   * @param \GuzzleHttp\Client $http_client
   *   A Guzzle client object.
   */
  public function __construct(Client $http_client) {

    $this->httpClient = $http_client;

  }

  /**
   * Prepare a query.
   *
   * @return \Drupal\if_lagoonfactsgraph\Service\GetGraphQL
   *   The current class.
   */
  public function whatIsThere() {

    $this->graphQuery = str_replace(["\r", "\n"], "",
    <<<EOD
      query whatIsThere {
        allProjects {
            id
            name
            gitUrl
            branches
            pullrequests
            availability
            created
            productionEnvironment
            environments {
                id
                name
                created
                updated
                deleted
                environmentType
                deployType
                route
                routes
            }
        }
    }
    EOD
    );

    $this->fetchResult();
    return $this;

  }

  /**
   * Prepare a query.
   *
   * @return \Drupal\if_lagoonfactsgraph\Service\GetGraphQL
   *   The current class.
   */
  public function getFacts() {

    $this->graphQuery = str_replace(["\r", "\n"], "",
    <<<EOD
      query AllProjects {
        allProjects {
            id
            name
            productionEnvironment
            environments(type: PRODUCTION) {
                id
                name
                facts {
                    name
                    value
                    source
                    description
                    category
                }
            }
        }
    }
    EOD
    );

    $this->fetchResult();
    return $this;

  }

  /**
   * Get the result value.
   */
  public function getResult() {

    return $this->graphResult;

  }

  /**
   * Fetch a query result.
   *
   * @return \Drupal\if_lagoonfactsgraph\Service\GetGraphQL
   *   The current class.
   */
  protected function fetchResult() {

    $this->graphResult = "";

    $data = [
      "headers" => [
        "Authorization" => "Bearer $this->bearerToken",
        "Content-Type" => "application/json",
      ],
      "body" => "{ \"query\": \"$this->graphQuery\" }",
    ];

    try {
      $response = $this->httpClient->post($this->graphURL, $data);
      $result = $response->getBody()->getContents();
      $cleaned = str_replace([",", "|"], [", ", " | "], $result);
      $this->graphResult = $cleaned;
    }
    catch (ClientException $error) {
      $response = $error->getResponse();
      $this->graphResult = $response->getBody()->getContents();
    }
    catch (\Exception $error) {
      $this->graphResult = $error->getMessage();
    }

    return $this;

  }

}
