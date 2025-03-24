<?php

namespace Drupal\if_swiftype\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a custom block.
 *
 * @Block(
 *   id = "swiftype_container",
 *   admin_label = @Translation("Swiftype Results Container"),
 *   category = @Translation("Interpersonal Frequency"),
 * )
 */
class SwiftypeContainer extends BlockBase {

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
      'div' => [
        '#type' => 'html_tag',
        '#tag' => 'div',
        '#attributes' => [
          'class' => ['if-swiftype-blocks', 'if-swiftype-container', 'search-result-page'],
          'id' => 'swiftype-container',
        ],
        '#attached' => [
          'library' => [
            'if_swiftype/swiftype-app',
          ],
        ],
      ],
    ];
  }

}
