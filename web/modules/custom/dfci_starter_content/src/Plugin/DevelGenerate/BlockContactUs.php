<?php

namespace Drupal\dfci_starter_content\Plugin\DevelGenerate;

use Drupal\block_content\Entity\BlockContent;
use Drupal\layout_builder\SectionComponent;

use Drupal\dfci_starter_content\Traits\TermTrait;

/**
 * Generates starter content.
 *
 * @DevelGenerate(
 *   id = "dfci_starter_contact_us_block",
 *   label = @Translation("DFCI Starter Contact Us Block"),
 *   url = "",
 *   permission = "administer devel_generate"
 * )
 */
class BlockContactUs extends Block {
  use TermTrait;

  /**
   * {@inheritdoc}
   */
  public function generate(array $values): void {

    // $this->block = BlockContent::load('contact');
    $this->block = BlockContent::create([
      'type' => 'embedded_form',
      'info' => 'Contact Us Block',
      'field_form' => [
          [
            'target_id' => 'contact',
          ],
      ],
      'label_display' => 'visible',
    ]);
    $this->block->save();

    \Drupal::messenger()->addMessage("Created {$this->block->label()} block # {$this->block->id()}");

  }

  /**
   * Get the block configuration.
   *
   * @return \Drupal\layout_builder\SectionComponent
   *   The block layout component.
   */
  public function getBlockComponent(): SectionComponent {

    return new SectionComponent(
      \Drupal::service('uuid')->generate(),
      'content',
      [
        'id' => 'inline_block:embedded_form',
        'label' => 'Contact Us',
        'label_display' => 'visible',
        'provider' => 'layout_builder',
        'view_mode' => 'full',
        'block_revision_id' => $this->block->getRevisionId(),
        'context_mapping' => [],
      ]
    );

  }

}
