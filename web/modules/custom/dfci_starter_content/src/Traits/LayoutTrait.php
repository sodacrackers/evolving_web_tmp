<?php

namespace Drupal\dfci_starter_content\Traits;

use Drupal\block_content\Entity\BlockContent;
use Drupal\layout_builder\Section;
use Drupal\layout_builder\SectionComponent;
use Drupal\node\Entity\Node;

/**
 * Adds sections to a layout.
 */
trait LayoutTrait {

  /**
   * Add components or blocks to node.
   *
   * @param array<BlockContent|SectionComponent> $items
   *   An array of components or blocks to add.
   */
  public function insertLayoutComponents(array $items): void {
    $node = Node::load($this->node->id());

    // Create the section.
    $section = new Section('layout_onecol');

    // Append the section.
    foreach ($items as $current_item) {

      if ($current_item instanceof SectionComponent) {
        $component = $current_item;
      }

      elseif ($current_item instanceof BlockContent) {

        // Update the block's title.
        $block_type = \Drupal::entityTypeManager()
          ->getStorage('block_content_type')
          ->load($current_item->bundle());
        $label = $block_type->label();
        $label = str_replace('WYSIWYG', '', $label);
        $current_item->set('info', $node->getTitle() . ' - ' . rtrim($label, 's'));
        $current_item->save();

        // Define the component.
        $component = new SectionComponent(
          \Drupal::service('uuid')->generate(),
          'content',
          [
            'id' => 'inline_block:' . $current_item->bundle(),
            'label' => $current_item->label(),
            'label_display' => 'visible',
            'provider' => 'layout_builder',
            'view_mode' => 'full',
            'block_revision_id' => $current_item->getRevisionId(),
            'context_mapping' => [],
          ]
        );
      }

      // Append the component.
      $section->appendComponent($component);
      \Drupal::logger('custom_module')->notice("Adding component to node {$node->id()}: {$component->getPluginId()}");
    }

    // Append the section.
    $sections = $node->get('layout_builder__layout')->getValue();
    $sections[] = $section;

    // Save the node.
    $node->set('layout_builder__layout', $sections);
    $node->save();
  }

}
