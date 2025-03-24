<?php

namespace Drupal\if_lagoonfactsgraph\Utilities;

use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Utilities for JSON data.
 */
class DataStreamer {

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
