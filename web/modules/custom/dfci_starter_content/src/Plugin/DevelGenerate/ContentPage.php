<?php

namespace Drupal\dfci_starter_content\Plugin\DevelGenerate;

use Drupal\node\Entity\Node;

/**
 * Defines a generator for page nodes.
 *
 * @DevelGenerate(
 *   id = "dfci_starter_pages",
 *   label = @Translation("DFCI Starter Pages"),
 *   url = "",
 *   permission = "administer devel_generate"
 * )
 */
class ContentPage extends Content {

  /**
   * {@inheritdoc}
   */
  public function generate(array $values): void {
    $this->node = Node::create([
      'type' => 'page',
      'title' => $values['title'] ?? 'Starter Page ' . $this->generateReadableTitle(),
      'body' => [
        'value' => $this->generateRandomParagraphs(1),
        'format' => 'full_html',
      ],
      'status' => 1,
      'moderation_state' => [
        [
          'state' => 'published',
        ],
      ],
    ]);

    $this->node->save();

    // Add alias.
    if (!empty($values['alias'])) {
      $this->node->set('path', [
        'alias' => $values['alias'],
        'pathauto' => FALSE,
      ]);
      $this->node->save();
    }

    \Drupal::messenger()->addMessage("Created {$this->node->bundle()} node # {$this->node->id()}: {$this->node->getTitle()}");
  }

}
