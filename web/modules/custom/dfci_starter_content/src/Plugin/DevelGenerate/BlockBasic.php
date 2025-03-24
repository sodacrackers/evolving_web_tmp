<?php

namespace Drupal\dfci_starter_content\Plugin\DevelGenerate;

use Drupal\block_content\Entity\BlockContent;

/**
 * Generates Accordion blocks and related Accordion Items.
 *
 * @DevelGenerate(
 *   id = "dfci_starter_basic_block",
 *   label = @Translation("DFCI Starter Basic Blocks"),
 *   url = "",
 *   permission = "administer devel_generate"
 * )
 */
class BlockBasic extends Block {

  /**
   * {@inheritdoc}
   */
  public function generate(array $values): void {
    $headline = 'Basic Block ' . $this->getRandom()->sentences(4);

    $this->block = BlockContent::create([
      'type' => 'basic',
      'info' => $headline,
      'body' => [
        'value' => $this->generateRandomParagraphHtml(rand(1, 4)),
        'format' => 'basic_html',
      ],
      'label_display' => 'visible',
    ]);

    $this->block->save();
    \Drupal::messenger()->addMessage("Created {$this->block->label()} block # {$this->block->id()}");
  }

}
