<?php

namespace Drupal\dfci_starter_content\Traits;

use Drupal\menu_link_content\Entity\MenuLinkContent;

/**
 * Trait for creating text content.
 */
trait MenuTrait {

  /**
   * Adds a link to a specified menu.
   *
   * @param string $menu_name
   *   The machine name of the menu.
   * @param string $title
   *   The title of the menu link.
   * @param string $path
   *   The path for the menu link.
   * @param int $weight
   *   The weight of the menu link.
   */
  public function addLink(string $menu_name = 'navigation', string $title = '', string $path = '', int $weight = 0): void {
    // Create a menu link.
    $menuItem = MenuLinkContent::create([
      'title' => $title ?: $this->node->getTitle(),
      'menu_name' => $menu_name,
      'parent' => '',
    ]);

    // Set path if a node.
    if ($this->node?->id()) {
      $menuItem->set('title', $this->node->getTitle());
      $menuItem->set('link', ['uri' => 'internal:/node/' . $this->node->id()]);
    }

    // Set title if provided.
    if ($title) {
      $menuItem->set('title', $title);
    }

    // Set weight if provided.
    if ($weight) {
      $menuItem->set('weight', $weight);
    }

    // Set path if provided.
    if ($path) {
      $menuItem->set('link', ['uri' => 'internal:' . $path]);
    }

    $menuItem->save();
  }

}
