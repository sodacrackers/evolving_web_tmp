<?php

namespace Drupal\if_lagoonfactsgraph\Utilities;

use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Utilities for JSON data.
 */
class DataTable {

  /**
   * Array to a Drupal table render array.
   */
  public static function renderTable(array $data = NULL) {

    $header = $rows = [];
    foreach ($data as $key => $value) {
      if ($key === 0) {
        $header = array_keys($value);
      }
      $rows[] = array_values($value);
    }

    $build['table'] = [
      '#type' => 'table',
      '#header' => $header,
      '#rows' => $rows,
      '#empty' => t('No content has been found.'),
      '#sticky' => TRUE,
    ];

    return [
      '#type' => '#markup',
      '#markup' => \Drupal::service('renderer')->render($build),
    ];
  }

  /**
   * Convert array to csv.
   *
   * @param array $data
   *   The source array.
   */
  public static function streamCsvData(array $data) {

    $response = new StreamedResponse();
    $response->headers->set('Content-Type', 'text/csv');

    $response->setCallback(function () use ($data) {
      $stream = fopen('php://output', 'w+');

      // Write the header row.
      $header = array_keys($data[0]);
      fputcsv($stream, $header);

      // Write data rows.
      foreach ($data as $row) {
        fputcsv($stream, $row);
        ob_flush();
        flush();
      }

      fclose($stream);
    });

    return $response;
  }

}
