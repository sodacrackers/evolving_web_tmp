<?php

namespace Drupal\dfci_starter_content\Plugin\DevelGenerate;

use Drupal\block_content\Entity\BlockContent;

/**
 * Generates Storage Items.
 *
 * @DevelGenerate(
 *   id = "dfci_starter_content_feature",
 *   label = @Translation("DFCI Starter Content Feature"),
 *   url = "",
 *   permission = "administer devel_generate"
 * )
 */
class BlockContentFeature extends Block {

  /**
   * {@inheritdoc}
   */
  public function generate(array $values): void {
    $items = $this->generateStorage(rand(2, 4));
    $headline = 'Content Feature - ' . $this->generateReadableTitle(3, 3, TRUE);

    $this->block = BlockContent::create([
      'type' => 'content_feature',
      'info' => $headline,
      'field_headline' => $headline,
      'field_content_feature_items' => $items,
    ]);

    $this->block->save();
    \Drupal::messenger()->addMessage("Created {$this->block->label()} block # {$this->block->id()}");
  }

  /**
   * Generate Storage Items.
   *
   * @param int $count
   *   The number of items to generate.
   */
  protected function generateStorage(int $count): array {
    $items = [];
    $storage = \Drupal::entityTypeManager()->getStorage('storage');

    for ($i = 0; $i < $count; $i++) {
      $headline = 'Content Feature Item ' . ($i + 1);

      $item = $storage->create([
        'type' => 'content_feature_item',
        'name' => $headline,
        'field_headline' => $headline,
        'field_description' => $this->generateRandomParagraphs(1),
        'field_cta' => [
          'uri' => 'http://example.com',
          'title' => 'Learn More',
        ],
        'field_cta_style' => 'button',
        'field_image' => [
          'target_id' => $this->getRandomEntity('media', 'image')->id(),
        ],
        'field_image_shape' => 'rectangle',
      ]);

      $item->save();
      $items[] = $item->id();
    }

    return $items;
  }

}
