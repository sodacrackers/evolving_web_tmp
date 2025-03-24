<?php

namespace Drupal\if_swiftype\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a custom block.
 *
 * @Block(
 *   id = "swiftype_autocomplete",
 *   admin_label = @Translation("Swiftype Autocomplete"),
 *   category = @Translation("Interpersonal Frequency"),
 * )
 */
class SwiftypeAutocomplete extends BlockBase {

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
        '#id' => 'swiftype-autocomplete',
        '#attributes' => [
          'class' => ['if-swiftype-blocks', 'if-swiftype-autocomplete'],
          'id' => 'swiftype-autocomplete',
        ],
      ],
      '#attached' => [
        'library' => [
          'if_swiftype/swiftype-app',
        ],
        'drupalSettings' => [
          'if_swiftype' => [
            'engineKey' => getenv('SWIFTYPE_ENGINE_KEY'),
          ],
        ],
      ],
    ];
  }

}
