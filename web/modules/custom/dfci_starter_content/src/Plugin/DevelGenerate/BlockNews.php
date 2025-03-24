<?php

namespace Drupal\dfci_starter_content\Plugin\DevelGenerate;

use Drupal\block\Entity\Block as DrupalBlock;
use Drupal\layout_builder\SectionComponent;

use Drupal\dfci_starter_content\Traits\TermTrait;

/**
 * Generates Accordion blocks and related Accordion Items.
 *
 * @DevelGenerate(
 *   id = "dfci_starter_news_block",
 *   label = @Translation("DFCI Starter News Blocks"),
 *   url = "",
 *   permission = "administer devel_generate"
 * )
 */
class BlockNews extends Block {
  use TermTrait;

  /**
   * {@inheritdoc}
   */
  public function generate(array $values): void {
    $headline = 'News Block ' . $this->getRandom()->sentences(2);

    $this->block = DrupalBlock::create([
      'id' => 'custom_news_block.' . \Drupal::service('uuid')->generate(),
      'theme' => \Drupal::theme()->getActiveTheme()->getName(),
      'type' => 'dfci_news_and_events_block',
      'info' => $headline,
      'plugin' => 'dfci_news_and_events_block',
      'settings' => [
        'provider' => 'dfci_blocks',
        'label' => $headline,
        'label_display' => 'visible',
        'headline' => $headline,
        'number_of_items' => 10,
        'type_filter' => $this->getTermByLabel('News', 'news_type')->id(),
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
        'id' => 'dfci_news_and_events_block',
        'label' => $this->block->label(),
        'label_display' => 'visible',
        'provider' => 'dfci_blocks',
        'headline' => $settings['headline'],
        'number_of_items' => $settings['number_of_items'],
        'type_filter' => $settings['type_filter'],
        'context_mapping' => [],
      ]
    );
  }

}
