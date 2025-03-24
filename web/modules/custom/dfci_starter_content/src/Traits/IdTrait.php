<?php

namespace Drupal\dfci_starter_content\Traits;

use Drupal\Core\Entity\EntityInterface;

/**
 * Provides methods to get the ID of the generated node or block.
 */
trait IdTrait {

  /**
   * Get the ID of the generated node.
   *
   * @return int|null
   *   The node ID or NULL if no node is generated.
   */
  public function getNodeId(): ?int {
    return $this->node ? $this->node->id() : NULL;
  }

  /**
   * Get the ID of the generated block.
   *
   * @return int|null
   *   The block ID or NULL if no block is generated.
   */
  public function getBlockId(): ?int {
    return $this->block ? $this->block->id() : NULL;
  }

  /**
   * Load an entity by type and bundle.
   *
   * @param string $entity_type
   *   The entity type.
   * @param string $bundle
   *   The bundle.
   *
   * @return \Drupal\Core\Entity\EntityInterface|null
   *   The loaded entity or null if not found.
   */
  public function getRandomEntity(string $entity_type, string $bundle): ?EntityInterface {
    $storage = \Drupal::entityTypeManager()->getStorage($entity_type);

    // Use the correct field for filtering by bundle.
    $entities = $entity_type === 'media'
      ? $storage->loadByProperties(['bundle' => $bundle])
      : $storage->loadByProperties(['type' => $bundle]);

    return reset($entities) ?: NULL;
  }

}
