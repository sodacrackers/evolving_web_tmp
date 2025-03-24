<?php

namespace Drupal\if_swiftype\Controller;

use Drupal\Core\Block\BlockManager;
use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provide a page for Search React components.
 */
class IfSwiftypeController extends ControllerBase {

  /**
   * The BlockManager for this controller.
   *
   * @var \Drupal\Core\Block\BlockManager
   */
  private $blockManager;

  /**
   * Constructs a new IfSwiftypeController.
   *
   * @param \Drupal\Core\Block\BlockManager $block_manager
   *   The BlockManager for this instance.
   */
  public function __construct(BlockManager $block_manager) {
    $this->blockManager = $block_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static($container->get('plugin.manager.block'));
  }

  /**
   * Returns a render array for the page.
   */
  public function content() {
    $block = $this->blockManager->createInstance('swiftype_container')->build();
    return $block;
  }

}
