<?php

namespace Drupal\dfci_starter_content\Drush\Commands;

use Drush\Commands\DrushCommands;
use Drupal\user\Entity\User;

/**
 * Defines Drush commands.
 */
class ContentCommands extends DrushCommands {

  /**
   * The Devel Generate plugin manager.
   *
   * @var \Drupal\devel_generate\DevelGeneratePluginManager
   */
  protected $develGenerator;

  /**
   * Account id used for some generated content.
   *
   * @var bool
   */
  protected $accountId = 1;

  /**
   * Indicates if the minimum content should be generated.
   *
   * @var bool
   */
  private $addMinimumContent = FALSE;

  /**
   * ContentCommands constructor.
   */
  public function __construct() {
    $this->develGenerator = \Drupal::service('plugin.manager.develgenerate');
  }

  /**
   * Wrapper function to create starter content.
   *
   * @command dfci-starter:create-minimal-starter-content
   */
  public function generateMinimal() {
    // Set minimal install flag.
    $this->addMinimumContent = TRUE;

    // Generate dependencies.
    $this->generateMedia();
    $this->generateTerms();
    $this->generateContributorUser();

    // Generate content.
    $this->generateHeroBlocks();
    $this->generateBasicBlocks();
    $this->generateTeamPage();
    $this->generateSupportPage();
    $this->generateResearchPage();
    $this->generatePublicationsPage();
    $this->generateContactUs();
    $this->generateHomePage();

    // Cleanup content.
    $this->cleanupContent();
  }

  /**
   * Wrapper function to create starter content.
   *
   * @command dfci-starter:create-starter-content
   */
  public function generate() {
    // Generate dependencies.
    $this->generateMedia();
    $this->generateTerms();
    $this->generateContributorUser();

    // Generate content.
    $this->generateHeroBlocks();
    $this->generateGalleryBlocks();
    $this->generateBasicBlocks();
    $this->generateContentFeatureBlocks();
    $this->generateGridBlocks();
    $this->generateAccordion();
    $this->generateEventPages();
    $this->generateNewsPages();
    $this->generateTeamPage();
    $this->generateSupportPage();
    $this->generateResearchPage();
    $this->generatePublicationsPage();
    $this->generateContactUs();
    $this->generateHomePage();

    // Cleanup content.
    $this->cleanupContent();
  }

  /**
   * Create a user account.
   *
   * @command dfci-starter:create--contributor-account
   */
  public function generateContributorUser() {
    // Create a user account.
    $user = User::create([
      'name' => 'dfcontributor',
      'mail' => 'support+dfci@thirdandgrove.com',
      'status' => 1,
      'roles' => ['contributor'],
    ]);
    $user->save();
    $this->accountId = $user->id();
  }

  /**
   * Create starter content.
   *
   * @command dfci-starter:create-media
   */
  public function generateMedia() {

    // Set defaults.
    $media = $this->develGenerator->createInstance('media');
    $params = [
      'media_types' => [
        'document' => 'document',
        'image' => 'image',
      ],
      'skip_fields' => [],
      'base_fields' => [],
      'add_type_label' => TRUE,
      'name_length' => 3,
      'num' => 2,
      'kill' => TRUE,
    ];

    // Generate media.
    $params['media_types'] = ['document' => 'document'];
    $media->generate($params);

    // Generate media.
    $params['media_types'] = ['image' => 'image'];
    $params['bundles'] = ['image'];
    $params['num'] = 6;
    $media->generate($params);
  }

  /**
   * Create starter content.
   *
   * @command dfci-starter:create-blocks
   */
  public function generateHeroBlocks() {

    // Set defaults.
    $blocks = $this->develGenerator->createInstance('block_content');
    $params = [
      'block_types' => ['hero' => 'hero'],
      'add_type_label' => TRUE,
      'skip_fields' => [],
      'base_fields' => [],
      'title_length' => 3,
      'num' => 1,
      'kill' => TRUE,
    ];

    // Generate blocks.
    $blocks->generate($params);
  }

  /**
   * Create starter content.
   *
   * @command dfci-starter:create-gallery-block
   */
  public function generateGalleryBlocks() {

    // Set defaults.
    $blocks = $this->develGenerator->createInstance('block_content');
    $params = [
      'block_types' => ['media_gallery' => 'media_gallery'],
      'add_type_label' => TRUE,
      'skip_fields' => [],
      'base_fields' => [],
      'title_length' => 3,
      'num' => 1,
      'kill' => TRUE,
    ];

    // Generate blocks.
    $blocks->generate($params);
  }

  /**
   * Create starter content.
   *
   * @command dfci-starter:create-terms
   */
  public function generateTerms() {
    $this->develGenerator->createInstance('dfci_starter_terms')
      ->generate([]);
  }

  /**
   * Create starter content.
   *
   * @command dfci-starter:create-basic-blocks
   */
  public function generateBasicBlocks() {
    $this->develGenerator->createInstance('dfci_starter_basic_block')
      ->generate([]);
  }

  /**
   * Create starter content.
   *
   * @command dfci-starter:create-content-feature-blocks
   */
  public function generateContentFeatureBlocks() {
    $this->develGenerator->createInstance('dfci_starter_content_feature')
      ->generate([]);
  }

  /**
   * Create starter content.
   *
   * @command dfci-starter:create-grid-blocks
   */
  public function generateGridBlocks() {
    $this->develGenerator->createInstance('dfci_starter_grid_blocks')
      ->generate([]);
  }

  /**
   * Create starter content.
   *
   * @command dfci-starter:create-accordions
   */
  public function generateAccordion() {
    $this->develGenerator->createInstance('dfci_starter_accordions')
      ->generate([]);
  }

  /**
   * Create starter content.
   *
   * @command dfci-starter:create-news-pages
   */
  public function generateNewsPages() {
    $this->develGenerator->createInstance('dfci_starter_news')
      ->generateMultiple(4);
  }

  /**
   * Create starter content.
   *
   * @command dfci-starter:create-event-pages
   */
  public function generateEventPages() {
    $this->develGenerator->createInstance('dfci_starter_events')
      ->generateMultiple(4);
  }

  /**
   * Create starter content.
   *
   * @command dfci-starter:create-home-page
   */
  public function generateHomePage() {
    $page = $this->develGenerator->createInstance('dfci_starter_pages');
    $blocks = $this->develGenerator->createInstance('dfci_starter_blocks');

    // Generate page.
    $page->generate(['title' => 'Home', 'alias' => '/home']);
    $page->addLink('main', 'Home', '/<front>', -99);
    $page->addLink('footer', 'Home', '/<front>', -99);

    // Add blocks.
    $page->insertLayoutComponents([$blocks->getRandomEntity('block_content', 'hero')]);
    $page->insertLayoutComponents([$blocks->getRandomEntity('block_content', 'basic')]);

    // Set front page.
    \Drupal::configFactory()->getEditable('system.site')
      ->set('page.front', '/node/' . $page->getNodeId())->save();

    if (!$this->addMinimumContent) {
      $blocks = $this->develGenerator->createInstance('dfci_starter_news_block');
      $blocks->generate([]);
      $block_news = $blocks->getBlockComponent();

      $page->insertLayoutComponents([
        $blocks->getRandomEntity('block_content', 'basic'),
        $blocks->getRandomEntity('block_content', 'basic'),
        $blocks->getRandomEntity('block_content', 'basic'),
      ]);
      $page->insertLayoutComponents([$blocks->getRandomEntity('block_content', 'content_feature')]);
      $page->insertLayoutComponents([$block_news]);
      $page->insertLayoutComponents([$blocks->getRandomEntity('block_content', 'grid_blocks')]);
      $page->insertLayoutComponents([$blocks->getRandomEntity('block_content', 'basic')]);
      $page->insertLayoutComponents([$blocks->getRandomEntity('block_content', 'media_gallery')]);
      $page->insertLayoutComponents([$blocks->getRandomEntity('block_content', 'basic')]);
    }

  }

  /**
   * Create starter content.
   *
   * @command dfci-starter:create-research-page
   */
  public function generateResearchPage() {
    $page = $this->develGenerator->createInstance('dfci_starter_pages');
    $blocks = $this->develGenerator->createInstance('dfci_starter_blocks');

    // Generate page.
    $page->generate(['title' => 'Research', 'alias' => '/research']);
    $page->addLink('main', 'Research', '/research');
    $page->addLink('footer', 'Research', '/research');

    // Add blocks.
    $page->insertLayoutComponents([$blocks->getRandomEntity('block_content', 'hero')]);
    $page->insertLayoutComponents([$blocks->getRandomEntity('block_content', 'basic')]);
  }

  /**
   * Create starter content.
   *
   * @command dfci-starter:create-contact-us-page
   */
  public function generateContactUs() {
    $blocks = $this->develGenerator->createInstance('dfci_starter_contact_us_block');
    $page = $this->develGenerator->createInstance('dfci_starter_pages');

    // Generate page.
    $page->generate(['title' => 'Contact', 'alias' => '/contact']);
    $page->addLink('main', 'Contact', '/contact', 50);
    $page->addLink('footer', 'Contact', '/contact', 50);

    // Add blocks.
    $blocks->generate([]);
    $block_contact_us = $blocks->getBlockComponent();

    $page->insertLayoutComponents([$blocks->getRandomEntity('block_content', 'hero')]);
    $page->insertLayoutComponents([$block_contact_us]);

  }

  /**
   * Create starter content.
   *
   * @command dfci-starter:create-support-page
   */
  public function generateSupportPage() {
    $page = $this->develGenerator->createInstance('dfci_starter_pages');
    $blocks = $this->develGenerator->createInstance('dfci_starter_blocks');

    // Generate page.
    $page->generate(['title' => 'Support', 'alias' => '/support']);
    $page->addLink('main', 'Support', '/support');
    $page->addLink('footer', 'Support', '/support');

    // Add blocks.
    $page->insertLayoutComponents([$blocks->getRandomEntity('block_content', 'hero')]);
    $page->insertLayoutComponents([$blocks->getRandomEntity('block_content', 'basic')]);
  }

  /**
   * Create starter content.
   *
   * @command dfci-starter:create-publications-page
   */
  public function generatePublicationsPage() {
    $page = $this->develGenerator->createInstance('dfci_starter_pages');
    $blocks = $this->develGenerator->createInstance('dfci_starter_publications_block');

    // Generate page.
    $page->generate(['title' => 'Publications', 'alias' => '/publications']);
    $page->addLink('main', 'Publications', '/publications');
    $page->addLink('footer', 'Publications', '/publications');

    // Add blocks.
    $page->insertLayoutComponents([$blocks->getRandomEntity('block_content', 'hero')]);
    $page->insertLayoutComponents([$blocks->getRandomEntity('block_content', 'basic')]);

    if (!$this->addMinimumContent) {
      $blocks->generate([]);
      $block_publications = $blocks->getBlockComponent();
      $page->insertLayoutComponents([$block_publications]);
    }
  }

  /**
   * Create starter content.
   *
   * @command dfci-starter:create-team-page
   */
  public function generateTeamPage() {
    $page = $this->develGenerator->createInstance('dfci_starter_pages');
    $blocks = $this->develGenerator->createInstance('dfci_starter_blocks');

    // Generate page.
    $page->generate(['title' => 'People', 'alias' => '/people']);
    $page->addLink('main', 'People', '/people');
    $page->addLink('footer', 'People', '/people');

    // Add blocks.
    $page->insertLayoutComponents([$blocks->getRandomEntity('block_content', 'basic')]);

    if (!$this->addMinimumContent) {
      // Generate person nodes.
      $this->develGenerator
        ->createInstance('content')
        ->generate([
          'node_types' => ['person' => 'person'],
          'bundles' => ['person' => 'person'],
          'skip_fields' => [],
          'base_fields' => [],
          'add_type_label' => FALSE,
          'authors' => [],
          'roles' => [],
          'max_comments' => 0,
          'title_length' => 4,
          'num' => 4,
          'kill' => TRUE,
        ]);

      // Generate team block.
      $this->develGenerator
        ->createInstance('block_content')
        ->generate([
          'block_types' => ['team' => 'team'],
          'add_type_label' => TRUE,
          'skip_fields' => [],
          'base_fields' => ['name' => 'Team'],
          'name_length' => 3,
          'title_length' => 3,
          'num' => 1,
          'kill' => TRUE,
        ]);

      // Add block to page.
      $page->insertLayoutComponents([$blocks->getRandomEntity('block_content', 'team')]);
    }
  }

  /**
   * Cleanup content.
   *
   * @command dfci-starter:cleanup-content
   */
  public function cleanupContent() {

    /***
     * Devel generate does not set a uid for some entity types so,
     * lets set it manually.
     */
    $entity_types = ['node', 'block_content', 'media'];
    foreach ($entity_types as $entity_type) {
      $storage = \Drupal::entityTypeManager()->getStorage($entity_type);
      $entities = $storage->loadMultiple();
      foreach ($entities as $entity) {
        if ($entity->hasField('uid')) {
          $entity->set('uid', $this->accountId);
          $entity->save();
        }
      }
    }
  }

}
