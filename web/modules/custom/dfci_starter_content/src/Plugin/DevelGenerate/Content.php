<?php

namespace Drupal\dfci_starter_content\Plugin\DevelGenerate;

use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\devel_generate\Plugin\DevelGenerate\ContentDevelGenerate;
use Drupal\dfci_starter_content\Traits\IdTrait;
use Drupal\dfci_starter_content\Traits\LayoutTrait;
use Drupal\dfci_starter_content\Traits\MenuTrait;
use Drupal\dfci_starter_content\Traits\TermTrait;
use Drupal\dfci_starter_content\Traits\TextTrait;

/**
 * Defines a base class for node content generation.
 */
abstract class Content extends ContentDevelGenerate {
  use IdTrait;
  use LayoutTrait;
  use MenuTrait;
  use TermTrait;
  use TextTrait;
  use StringTranslationTrait;

  /**
   * The generated node.
   *
   * @var \Drupal\node\Entity\Node
   */
  protected $node;

  /**
   * {@inheritdoc}
   */
  public function generate(array $values): void {
    // This method should be implemented by subclasses.
  }

  /**
   * Generate multiple content nodes.
   *
   * @param int $num
   *   The number of nodes to generate.
   * @param array $values
   *   Any special parameters.
   */
  public function generateMultiple(int $num = 1, array $values = []): void {
    do {
      $this->generate($values);
    } while (--$num > 0);
  }

  /**
   * {@inheritdoc}
   */
  public function validateDrushParams(array $args, array $options = []): array {
    // Implement validation logic if needed.
    return [];
  }

}
