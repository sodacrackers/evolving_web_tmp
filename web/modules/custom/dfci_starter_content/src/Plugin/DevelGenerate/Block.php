<?php

namespace Drupal\dfci_starter_content\Plugin\DevelGenerate;

use Drupal\devel_generate\Plugin\DevelGenerate\BlockContentDevelGenerate;
use Drupal\dfci_starter_content\Traits\IdTrait;
use Drupal\dfci_starter_content\Traits\TextTrait;

/**
 * Generates Accordion blocks and related Accordion Items.
 *
 * @DevelGenerate(
 *   id = "dfci_starter_blocks",
 *   label = @Translation("DFCI Starter Blocks"),
 *   url = "",
 *   permission = "administer devel_generate"
 * )
 */
class Block extends BlockContentDevelGenerate {
  use IdTrait;
  use TextTrait;

  /**
   * The generated block.
   *
   * @var \Drupal\block_content\Entity\BlockContent
   */
  protected $block;

  /**
   * {@inheritdoc}
   */
  public function generate(array $values): void {
    throw new \BadMethodCallException("This method should be implemented by subclasses.");
  }

  /**
   * Generate multiple block contents.
   *
   * @param int $num
   *   The number of blocks to generate.
   * @param array $values
   *   The values for block generation.
   */
  public function generateMultiple(int $num = 1, array $values = []): void {
    do {
      $this->generate($values);
    } while (--$num > 0);
  }

}
