<?php

namespace Drupal\dfci_starter_content\Traits;

use Drupal\Core\Render\Markup;

/**
 * Trait for creating text content.
 */
trait TextTrait {

  /**
   * Generate a readable random title.
   *
   * @param int $min
   *   The minimum number of words.
   * @param int $max
   *   The maximum number of words.
   * @param bool $titleCase
   *   Whether to capitalize all words.
   *
   * @return string
   *   A readable random title.
   */
  protected function generateReadableTitle(int $min = 3, int $max = 6, bool $titleCase = TRUE): string {
    $words = explode(' ', $this->getRandom()->sentences(1));
    $selectedWords = array_slice($words, 0, mt_rand($min, min($max, count($words))));
    $sentence = implode(' ', $selectedWords);
    return ($titleCase ? ucwords($sentence) : ucfirst($sentence));

  }

  /**
   * Generate random paragraphs.
   *
   * @param int $count
   *   The number of paragraphs to generate.
   *
   * @return string
   *   The generated paragraphs.
   */
  protected function generateRandomParagraphs(int $count = 1): string {
    return $this->getRandom()->paragraphs($count);
  }

  /**
   * Generate random paragraphs.
   *
   * @param int $count
   *   The number of paragraphs to generate.
   *
   * @return string
   *   The generated paragraphs.
   */
  protected function generateRandomParagraphHtml(int $count = 1): string {
    $paragraphs = $this->getRandom()->paragraphs($count);
    $arr = explode("\n\n", $paragraphs);
    $html = implode('', array_map(fn($p) => '<p>' . htmlspecialchars($p) . '</p>', $arr));
    return Markup::create($html);
  }

}
