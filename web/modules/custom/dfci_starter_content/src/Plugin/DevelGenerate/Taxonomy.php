<?php

namespace Drupal\dfci_starter_content\Plugin\DevelGenerate;

use Drupal\devel_generate\Plugin\DevelGenerate\TermDevelGenerate;
use Drupal\dfci_starter_content\Traits\TermTrait;
use Drupal\taxonomy\Entity\Term;

/**
 * Provides a TermDevelGenerate plugin.
 *
 * @DevelGenerate(
 *   id = "dfci_starter_terms",
 *   label = @Translation("DFCI Starter Terms"),
 *   url = "",
 *   permission = "administer devel_generate",
 * )
 */
class Taxonomy extends TermDevelGenerate {
  use TermTrait;

  /**
   * {@inheritdoc}
   */
  public function generate(array $values = []): void {

    // Create the "News" term.
    if (!$term = $this->getTermByLabel('News', 'news_type')) {
      $term = Term::create([
        'vid' => 'news_type',
        'name' => 'News',
      ]);
      $term->save();
    }
    \Drupal::messenger()->addMessage("Term # {$term->id()}: {$term->getName()}");

    // Create the "Events" term.
    if (!$term = $this->getTermByLabel('Event', 'news_type')) {
      $term = Term::create([
        'vid' => 'news_type',
        'name' => 'Event',
      ]);
      $term->save();
    }
    \Drupal::messenger()->addMessage("Term # {$term->id()}: {$term->getName()}");
  }

}
