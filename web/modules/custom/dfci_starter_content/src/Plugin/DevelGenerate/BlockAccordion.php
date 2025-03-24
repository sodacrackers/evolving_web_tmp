<?php

namespace Drupal\dfci_starter_content\Plugin\DevelGenerate;

use Drupal\block_content\Entity\BlockContent;

/**
 * Generates Accordion blocks and related Accordion Items.
 *
 * @DevelGenerate(
 *   id = "dfci_starter_accordions",
 *   label = @Translation("DFCI Starter Accordions"),
 *   url = "",
 *   permission = "administer devel_generate"
 * )
 */
class BlockAccordion extends Block {

  /**
   * {@inheritdoc}
   */
  public function generate(array $values): void {
    $accordion_items = $this->generateStorage(rand(2, 3));
    $headline = 'Accordion - ' . $this->generateReadableTitle(3, 3, TRUE);

    $this->block = BlockContent::create([
      'type' => 'accordion',
      'info' => $headline,
      'field_headline' => $headline,
      'field_accordion_items' => $accordion_items,
    ]);

    $this->block->save();
    \Drupal::messenger()->addMessage("Created {$this->block->label()} block # {$this->block->id()}");
  }

  /**
   * Generate related Accordion Items.
   *
   * @param int $count
   *   The number of Accordion Items to generate.
   *
   * @return array
   *   An array of entity references for the Accordion Items.
   */
  protected function generateStorage(int $count): array {
    $items = [];
    $storage = \Drupal::entityTypeManager()->getStorage('storage');

    for ($i = 0; $i < $count; $i++) {
      $headline = 'Accordion Item ' . $i + 1;
      $paragraphs = $this->generateRandomParagraphHtml(rand(1, 4));

      $item = $storage->create([
        'type' => 'accordion_item',
        'name' => $headline,
        'field_headline' => $headline,
        'field_body_text' => [
          'value' => $paragraphs,
          'format' => 'basic_html',
        ],
      ]);

      $item->save();
      $items[] = $item->id();
    }

    return $items;
  }

}
