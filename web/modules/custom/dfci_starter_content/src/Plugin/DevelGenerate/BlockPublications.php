<?php

namespace Drupal\dfci_starter_content\Plugin\DevelGenerate;

use Drupal\block\Entity\Block as DrupalBlock;
use Drupal\layout_builder\SectionComponent;

/**
 * Generates Accordion blocks and related Accordion Items.
 *
 * @DevelGenerate(
 *   id = "dfci_starter_publications_block",
 *   label = @Translation("DFCI Starter Publications Blocks"),
 *   url = "",
 *   permission = "administer devel_generate"
 * )
 */
class BlockPublications extends Block {

  /**
   * {@inheritdoc}
   */
  public function generate(array $values): void {
    $headline = 'Publications Block ' . $this->getRandom()->sentences(2);
    $profile_id = '40535411';

    $this->block = DrupalBlock::create([
      'id' => 'custom_publications_block.' . \Drupal::service('uuid')->generate(),
      'type' => 'dfci_publications_block',
      'theme' => \Drupal::theme()->getActiveTheme()->getName(),
      'info' => $headline,
      'plugin' => 'dfci_publications_block',
      'settings' => [
        'provider' => 'dfci_blocks',
        'label' => $headline,
        'label_display' => 'visible',
        'profile_id' => $profile_id,
        'additional_publications' => [],
      ],
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
    $settings = $this->block->get('settings');

    return new SectionComponent(
      \Drupal::service('uuid')->generate(),
      'content',
      [
        'id' => 'dfci_publications_block',
        'label' => $this->block->label(),
        'label_display' => 'visible',
        'provider' => 'dfci_blocks',
        'profile_id' => $settings['profile_id'],
        'additional_publications' => [
          'value' => '',
          'format' => 'basic_html',
        ],
        'context_mapping' => [],
      ]
    );
  }

}
