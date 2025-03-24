<?php

namespace Drupal\dfci_starter_content\Plugin\DevelGenerate;

use Drupal\node\Entity\Node;

/**
 * Defines a generator for nodes.
 *
 * @DevelGenerate(
 *   id = "dfci_starter_news",
 *   label = @Translation("DFCI Starter News"),
 *   url = "",
 *   permission = "administer devel_generate"
 * )
 */
class ContentNews extends Content {

  /**
   * {@inheritdoc}
   */
  public function generate(array $values): void {
    $this->node = Node::create([
      'type' => 'news_and_events',
      'title' => 'News ' . $this->generateReadableTitle(),
      'field_body' => [
        'value' => $this->generateRandomParagraphHtml(1),
        'format' => 'basic_html',
      ],
      'field_cta' => [
        'uri' => 'http://example.com',
        'title' => 'Read more',
      ],
      'field_date' => [
      [
        'value' => date('Y-m-d\TH:i:s'),
      ],
      ],
      'field_file' => [
        'target_id' => $this->getRandomEntity('media', 'document')->id(),
      ],
      'field_image' => [
        'target_id' => $this->getRandomEntity('media', 'image')->id(),
      ],
      'field_type' => [
        'target_id' => $this->getTermByLabel('News', 'news_type')->id(),
      ],
      'field_show_in_feed' => 1,
      'status' => 1,
      'moderation_state' => [
        [
          'state' => 'published',
        ],
      ],
    ]);

    $this->node->save();
    \Drupal::messenger()->addMessage("Created {$this->node->bundle()} node # {$this->node->id()}: {$this->node->getTitle()}");
  }

}
