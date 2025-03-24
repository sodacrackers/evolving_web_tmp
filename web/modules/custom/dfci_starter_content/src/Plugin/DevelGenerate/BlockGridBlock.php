<?php

namespace Drupal\dfci_starter_content\Plugin\DevelGenerate;

use Drupal\block_content\Entity\BlockContent;

/**
 * Generates Storage Items.
 *
 * @DevelGenerate(
 *   id = "dfci_starter_grid_blocks",
 *   label = @Translation("DFCI Starter Grid Blocks"),
 *   url = "",
 *   permission = "administer devel_generate"
 * )
 */
class BlockGridBlock extends Block {

  /**
   * {@inheritdoc}
   */
  public function generate(array $values): void {
    $items = $this->generateStorage(4);
    $headline = 'Grid Block - ' . $this->generateReadableTitle(3, 3, TRUE);

    $this->block = BlockContent::create([
      'type' => 'grid_blocks',
      'info' => $headline,
      'field_grid_blocks' => $items,
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
      $headline = 'Grid Block Item ' . ($i + 1);
      $item = $storage->create([
        'type' => 'grid_block_item',
        'name' => $headline,
        'field_headline' => $headline,
        'field_body_text' => [
          'value' => $this->generateRandomParagraphHtml(1),
          'format' => 'basic_html',
        ],
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
