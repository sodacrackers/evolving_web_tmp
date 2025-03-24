<?php

namespace Drupal\if_swiftype\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a custom block.
 *
 * @Block(
 *   id = "homepage_search_block",
 *   admin_label = @Translation("Homepage search block"),
 *   category = @Translation("Interpersonal Frequency"),
 * )
 */
class HomepageSearchBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'label_display' => FALSE,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#theme' => 'if_swiftype_blocks__homepage_search_block',
      '#attached' => [],
    ];
  }

}
