<?php

namespace Drupal\if_lagoonfactsgraph\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Render\Markup;
use Drupal\if_lagoonfactsgraph\Service\GetGraphQL;
use Drupal\if_lagoonfactsgraph\Service\GetSSHToken;
use Drupal\if_lagoonfactsgraph\Utilities\DataStreamer;
use Drupal\if_lagoonfactsgraph\Utilities\DataTable;
use Drupal\if_lagoonfactsgraph\Utilities\Dumper;
use Drupal\if_lagoonfactsgraph\Utilities\JqFlattener;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Provides route responses for the module.
 */
class FactsController extends ControllerBase {


  /**
   * The token service.
   *
   * @var \Drupal\if_lagoonfactsgraph\Service\GetSSHToken
   */
  protected $tokens;

  /**
   * The GraphQL service.
   *
   * @var \Drupal\if_lagoonfactsgraph\Service\GetGraphQL
   */
  protected $graph;

  /**
   * The GraphQL routeMatch.
   *
   * @var \Drupal\Core\Routing\CurrentRouteMatch
   */
  protected $routeMatch;

  /**
   * The current request.
   *
   * @var \Symfony\Component\HttpFoundation\Request
   */
  protected $currentRequest;

  /**
   * The request format.
   *
   * @var string
   */
  protected $requestFormat;

  /**
   * FactsController constructor.
   *
   * @param \Drupal\if_lagoonfactsgraph\Service\GetSSHToken $tokens
   *   Graph helper.
   * @param \Drupal\if_lagoonfactsgraph\Service\GetGraphQL $graphql
   *   Graph helper.
   * @param \Symfony\Component\HttpFoundation\RequestStack $request_stack
   *   The request.
   */
  public function __construct(GetSSHToken $tokens, GetGraphQL $graphql, RequestStack $request_stack) {

    $this->tokens = $tokens;
    $this->graph = $graphql;

    $request = $request_stack->getCurrentRequest();
    $this->requestFormat = $request->query->get("format");

    $this->graph->bearerToken = $request->query->get("token") ?? $this->tokens->token;

  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {

    return new static(
      $container->get("if_lagoonfactsgraph.token_service"),
      $container->get("if_lagoonfactsgraph.graph_service"),
      $container->get('request_stack')
    );
  }

  /**
   * Get graph result.
   */
  public function projects() {

    $data = $this->graph
      ->whatIsThere()
      ->getResult();

    $data = JqFlattener::jqFlattenProjects($data);

    if ($this->requestFormat === "json") {
      return new JsonResponse($data);
    }

    if ($this->requestFormat === "csv") {
      return DataStreamer::streamCsvData($data);
    }

    return [
      [
        DataTable::renderTable($data),
      ],
      [
        "#markup" => Markup::create(
          '<h3>Debugging</h3>
          <pre>' . Dumper::print($data) . '</pre>'
        ),
      ],
      [
        "#markup" => Markup::create(
          '<h3>Debugging</h3>
          <pre>' . Dumper::print($this) . '</pre>'
        ),
      ],
    ];
  }

  /**
   * Get graph result.
   */
  public function facts() {

    $data = $this->graph
      ->getFacts()
      ->getResult();

    $data = JqFlattener::jqFlattenFacts($data);

    if ($this->requestFormat === "json") {
      return new JsonResponse($data);
    }

    if ($this->requestFormat === "csv") {
      return DataStreamer::streamCsvData($data);
    }

    // Making HTML requires too much memory. Dump it instead.
    return [
      [
        "#markup" => Markup::create(
          '<h3>Debugging</h3>
          <p>Facts are too to print. You may search the debugger using Ctrl+F, or download the <a href="?format=json">JSON</a> or <a href="?format=csv">CSV</a> instead.</p>
          <pre>' . Dumper::print($data) . '</pre>'
        ),
      ],
      [
        "#markup" => Markup::create(
          '<h3>Debugging</h3>
          <pre>' . Dumper::print($this) . '</pre>'
        ),
      ],
    ];
  }

  /**
   * Get token result.
   */
  public function token() {

    $data = $this->tokens
      ->refreshToken();

    return [
      [
        "#markup" => Markup::create(
          '<h3>Debugging</h3>
          <pre>' . Dumper::print($data) . '</pre>'
        ),
      ],
      [
        "#markup" => Markup::create(
          '<h3>Debugging</h3>
          <pre>' . Dumper::print($this) . '</pre>'
        ),
      ],
    ];
  }

}
