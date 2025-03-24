<?php

namespace Drupal\dfci_starter_content\Traits;

use Drupal\taxonomy\Entity\Term;

/**
 * Trait for creating text content.
 */
trait TermTrait {

  /**
   * Get a term by its label and vocabulary.
   *
   * @param string $label
   *   The term label.
   * @param string $vocabulary
   *   The vocabulary ID.
   *
   * @return \Drupal\taxonomy\Entity\Term|null
   *   The term entity, or NULL if not found.
   */
  protected function getTermByLabel(string $label, string $vocabulary): ?Term {
    $terms = \Drupal::entityTypeManager()
      ->getStorage('taxonomy_term')
      ->loadByProperties([
        'name' => $label,
        'vid' => $vocabulary,
      ]);

    return $terms ? reset($terms) : NULL;
  }

}
