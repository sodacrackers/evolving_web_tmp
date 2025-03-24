<?php

namespace Drupal\if_swiftype\EventSubscriber\Theme;

use Drupal\core_event_dispatcher\Event\Theme\ThemeEvent;
use Drupal\core_event_dispatcher\ThemeHookEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Class SwiftypeBlocks.
 *
 * Implements hook_theme for swiftype blocks.
 */
class SwiftypeBlocks implements EventSubscriberInterface {

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    return [
      ThemeHookEvents::THEME => 'theme',
    ];
  }

  /**
   * Add twig templates for Swiftype blocks.
   */
  public function theme(ThemeEvent $event): void {
    $event->addNewThemes([
      'if_swiftype_blocks__swiftype_container' => [
        'path' => 'modules/custom/if_swiftype/templates',
        'template' => 'block--if-swiftype-blocks',
        'variables' => [
          'attributes' => [],
          'if_swiftype_blocks_body' => NULL,
        ],
      ],
      'if_swiftype_blocks__swiftype_autocomplete' => [
        'path' => 'modules/custom/if_swiftype/templates',
        'template' => 'block--if-swiftype-blocks',
        'variables' => [
          'attributes' => [],
          'if_swiftype_blocks_body' => NULL,
        ],
      ],
      'if_swiftype_blocks__homepage_search_block' => [
        'path' => 'modules/custom/if_swiftype/templates',
        'template' => 'block--homepage-search-block',
        'variables' => [],
      ],
    ]);
  }

}
