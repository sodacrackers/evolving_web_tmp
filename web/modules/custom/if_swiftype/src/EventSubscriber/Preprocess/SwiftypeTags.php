<?php

namespace Drupal\if_swiftype\EventSubscriber\Preprocess;

/**
 * @file
 * Page html head tags for Swiftype.
 *
 * This file adds metatags to pages read by the third-party search crawler,
 * Swiftype. It adds Swiftype metatags to pages, nodes, and views for indexing.
 * There're some business rules for special content types or fields, to leverage
 * features in Swiftype like "boosting" or "exclusion".
 *
 * We also make read SimpleSitemap settings to determine rules on a per-page
 * basis.
 *
 * @see https://swiftype.com/documentation/site-search/guides/schema-design
 * @see https://api.druphelp.com/api/hook_event_dispatcher/modules%21core_event_dispatcher%21src%21Event%21Theme%21PageAttachmentsEvent.php/class/PageAttachmentsEvent/3.x
 * @see https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Render%21theme.api.php/function/hook_page_attachments/10
 */

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Controller\TitleResolverInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\FieldableEntityInterface;
use Drupal\Core\File\FileUrlGeneratorInterface;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\core_event_dispatcher\Event\Theme\PageAttachmentsEvent;
use Drupal\core_event_dispatcher\PageHookEvents;
use Drupal\if_components\Service\ComponentDataHelper;
use Drupal\simple_sitemap\Manager\Generator;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Class SwiftypeTags.
 *
 * Preprocess pages to add swiftype tags for crawling.
 */
final class SwiftypeTags implements EventSubscriberInterface {

  /**
   * Component data helper.
   *
   * @var \Drupal\if_components\Service\ComponentDataHelper
   */
  protected $componentDataHelper;

  /**
   * The request stack.
   *
   * @var \Symfony\Component\HttpFoundation\RequestStack
   */
  protected $requestStack;
  /**
   * Sitemap module default configuration name.
   *
   * @var string
   */
  protected const SIMPLE_SITEMAP_XML_CONFIGURATION_KEY = "default";

  /**
   * The current route match.
   *
   * @var \Drupal\Core\Routing\CurrentRouteMatch
   */
  protected $routeMatch;
  /**
   * The title resolver.
   *
   * @var \Drupal\Core\Controller\TitleResolverInterface
   */
  protected $titleResolver;

  /**
   * The simple_sitemap generator.
   *
   * @var \Drupal\simple_sitemap\Manager\Generator
   */
  protected $sitemapGenerator;

  /**
   * The config factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * File generator service.
   *
   * @var \Drupal\Core\File\FileUrlGeneratorInterface
   */
  protected $fileUrlGenerator;

  /**
   * Our class constructor.
   *
   * @param \Drupal\if_components\Service\ComponentDataHelper $component_data_helper
   *   Component data helper.
   * @param \Symfony\Component\HttpFoundation\RequestStack $request_stack
   *   The request stack.
   * @param \Drupal\Core\Controller\TitleResolverInterface $title_resolver
   *   The title resolver.
   * @param \Drupal\Core\Routing\CurrentRouteMatch $currentRouteMatch
   *   The current route match.
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The config factory.
   * @param \Drupal\simple_sitemap\Manager\Generator $sitemapGenerator
   *   The simple_sitemap generator.
   * @param \Drupal\Core\File\FileUrlGeneratorInterface $file_url_generator
   *   File generator service.
   */
  public function __construct(ComponentDataHelper $component_data_helper, RequestStack $request_stack, TitleResolverInterface $title_resolver, CurrentRouteMatch $currentRouteMatch, ConfigFactoryInterface $config_factory, Generator $sitemapGenerator, FileUrlGeneratorInterface $file_url_generator) {
    $this->componentDataHelper = $component_data_helper;
    $this->requestStack = $request_stack;
    $this->titleResolver = $title_resolver;
    $this->routeMatch = $currentRouteMatch;
    $this->configFactory = $config_factory;
    $this->sitemapGenerator = $sitemapGenerator;
    $this->fileUrlGenerator = $file_url_generator;
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    return [
      PageHookEvents::PAGE_ATTACHMENTS => ['preprocessPageAttachments'],
    ];
  }

  /**
   * Preprocessor to add Swiftype tags.
   *
   * @param \Drupal\core_event_dispatcher\Event\Theme\PageAttachmentsEvent $event
   *   The preprocess page event.
   */
  public function preprocessPageAttachments(PageAttachmentsEvent $event): void {

    $tags = [];
    $attached =& $event->getAttachments();
    $html_head =& $attached['#attached']['html_head'] ?? [];

    /***
     * We provide Swiftype tags for every entity. Below the entity type is
     * added as a Swiftype tag and also some special fields. Since SimpleSitemap
     * is also fetched below, it may provide a Swiftype exclude rule.
     */
    foreach ($this->routeMatch->getParameters() as $parameter) {
      if ($parameter instanceof EntityInterface) {
        $entity = $parameter;
        break;
      }
    }

    // Setup title metatag.
    $html_head[] = $this->getTitleTag();

    if (empty($entity) || !($entity instanceof FieldableEntityInterface)) {
      $html_head[] = [
        [
          '#tag' => 'meta',
          '#attributes' => [
            'class' => ['swiftype'],
            'name' => 'type',
            'data-type' => 'enum',
            'content' => ['#plain_text' => 'Page'],
          ],
        ],
        'swiftype-type',
      ];
      return;
    }

    // Setup type metatag.
    $tags[] = $this->getTypeTag($entity);

    // Setup summary metatag.
    $tags[] = $this->getFieldTag($entity, 'field_summary', 'summary');

    // Setup image metatag.
    $tags[] = $this->getImageTag($entity, 'field_image', 'field_media_image', 'image');

    // Setup created metatag.
    $tags[] = $this->getFieldTag($entity, 'created', 'date', 'date');

    // Setup department metatag.
    $tags[] = $this->getReferenceTags($entity, 'field_department', 'department');

    // Collect category metadata.
    if ($entity->bundle() == 'article') {
      $tags[] = $this->getReferenceTags($entity, 'field_article_categories', 'category');
    }
    if ($entity->bundle() == 'resource') {
      $tags[] = $this->getReferenceTags($entity, 'field_resource_categories', 'category');
    }
    if ($entity->bundle() == 'event') {
      $tags[] = $this->getFieldTag($entity, 'field_start_date', 'event-date', 'date');
      $tags[] = $this->getReferenceTags($entity, 'field_event_category', 'category');
      $tags[] = $this->getReferenceTags($entity, 'field_audience', 'audience');
      $tags[] = $this->getReferenceTags($entity, 'field_location', 'location');
    }

    // Setup sitemap metatag.
    $tags[] = $this->getSimpleSitemapTags($entity);

    // Add tags to head.
    $addSwiftypeTags = function ($array) use (&$addSwiftypeTags, &$html_head) {
      foreach ($array as $item) {
        if (is_array($item)) {
          if (is_string($item[1]) && strpos($item[1], 'swiftype-') === 0) {
            $html_head[] = $item;
          }
          else {
            $addSwiftypeTags($item);
          }
        }
      }
    };

    $addSwiftypeTags($tags);
  }

  /**
   * Provides meta tags.
   *
   * @return array
   *   Swiftype tags.
   */
  private function getTitleTag() {

    $request = $this->requestStack->getCurrentRequest();
    $title = $this->titleResolver->getTitle($request, $this->routeMatch->getRouteObject());
    $siteName = $this->configFactory->get('system.site')->get('name');
    $title = str_replace($siteName, '', $title);
    $title = preg_replace('/[^a-zA-Z0-9]+$/', '', $title);

    return [
      [
        '#tag' => 'meta',
        '#attributes' => [
          'class' => ['swiftype'],
          'name' => 'title',
          'data-type' => 'string',
          'content' => ['#plain_text' => $title],
        ],
      ],
      'swiftype-title',
    ];
  }

  /**
   * Provides meta tags.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   The node to validate.
   *
   * @return array
   *   Swiftype tags.
   */
  private function getTypeTag(EntityInterface $entity) {

    if (in_array($entity->bundle(), ['basic_page', 'landing_page'])) {
      $type = 'Page';
    }
    else {
      $type = str_replace('_', ' ', ucfirst($entity->bundle()));
    }

    return [
      [
        '#tag' => 'meta',
        '#attributes' => [
          'class' => ['swiftype'],
          'name' => 'type',
          'data-type' => 'enum',
          'content' => ['#plain_text' => $type],
        ],
      ],
      'swiftype-type',
    ];
  }

  /**
   * Provides meta tags.
   *
   * Ensure UTC dates and provide an ISO 8601 format.
   *
   * @param \Drupal\Core\Entity\FieldableEntityInterface $entity
   *   The node to validate.
   * @param string $fieldName
   *   The field to query.
   * @param string $key
   *   The Swiftype field name.
   * @param string $fieldType
   *   The Swiftype tag type.
   *
   * @return array
   *   Swiftype tags.
   *
   * @see https://swiftype.com/documentation/site-search/guides/schema-design#date
   */
  private function getFieldTag(FieldableEntityInterface $entity, string $fieldName = "", $key = NULL, string $fieldType = "text") {

    if (!$entity->hasField($fieldName)) {
      return [];
    }

    $value = $entity->get($fieldName)->value;

    if (empty($value)) {
      return [];
    }

    if ($fieldType === "date") {
      $isUnixTimeStamp = function ($timestamp) {
        return ((string) (int) $timestamp === $timestamp)
        && ($timestamp <= PHP_INT_MAX)
        && ($timestamp >= ~PHP_INT_MAX);
      };
      $timestamp = $isUnixTimeStamp($value) ? $value : strtotime($value);
      $value = date("Y-m-d\TH:i:s", $timestamp);
    }

    return [
        [
          "#tag" => "meta",
          "#attributes" => [
            "class" => ["swiftype"],
            "name" => $key,
            "data-type" => $fieldType,
            "content" => $this->getCleanString($value),
          ],
        ], "swiftype-" . $key,
    ];
  }

  /**
   * Provides meta tags.
   *
   * @param \Drupal\Core\Entity\FieldableEntityInterface $entity
   *   The entity to inspect.
   * @param string $fieldName
   *   The entity field name.
   * @param string $key
   *   The swiftype key name.
   *
   * @return array
   *   Swiftype tags.
   */
  private function getReferenceTags(FieldableEntityInterface $entity, string $fieldName, $key) {

    if (!method_exists($entity, "hasField") || !$entity->hasField($fieldName)) {
      return [];
    }

    $tags = [];
    $items = $entity->get($fieldName)?->referencedEntities();
    foreach ($items as $item) {
      if ($item->hasField("name")) {
        $value = $this->getCleanString($item->get("name")->value);
      }
      if ($item->hasField("title")) {
        $value = $this->getCleanString($item->get("title")->value);
      }
      if (empty($value)) {
        continue;
      }
      $tags[] = [
        [
          "#tag" => "meta",
          "#attributes" => [
            "class" => ["swiftype"],
            "name" => $key,
            "data-type" => "enum",
            "content" => ucwords($value),
          ],
        ], "swiftype-" . $key . "-" . $value,
      ];

    }

    return $tags;
  }

  /**
   * Provides meta tags.
   *
   * @param \Drupal\Core\Entity\FieldableEntityInterface $entity
   *   The entity to inspect.
   * @param string $mediaFieldName
   *   The entity field name.
   * @param string $imageFieldName
   *   The entity field name.
   * @param string $key
   *   The swiftype key name.
   *
   * @return array
   *   Swiftype tags.
   */
  private function getImageTag(FieldableEntityInterface $entity, string $mediaFieldName, string $imageFieldName, $key) {

    // Get media entity.
    if ($entity->hasField($mediaFieldName)) {
      $media = $entity
        ->get($mediaFieldName)
        ->entity;
    }

    // Get image entity.
    if (!empty($media) && $media->hasField($imageFieldName)) {
      $image = $media->get($imageFieldName)->entity;
    }

    if (empty($image)) {
      return [];
    }

    $url = $this
      ->fileUrlGenerator
      ->generateAbsoluteString(
        $image->getFileUri()
      ) ?? "";

    return [
      [
        "#tag" => "meta",
        "#attributes" => [
          "class" => ["swiftype"],
          "name" => "image",
          "data-type" => "enum",
          "content" => $url,
        ],
      ], "swiftype-image",
    ];
  }

  /**
   * Provides meta tags.
   *
   * @param \Drupal\Core\Entity\FieldableEntityInterface $entity
   *   The entity to inspect.
   *
   * @return array
   *   Swiftype tags.
   */
  private function getSimpleSitemapTags(EntityInterface $entity) {

    if (!$this->sitemapGenerator) {
      return [];
    }

    $sitemapValues = $this->sitemapGenerator
      ->setVariants()
      ->entityManager()
      ->getEntityInstanceSettings(
        $entity->getEntityTypeId(), $entity->id()
      );

    $sitemapValues = $sitemapValues[self::SIMPLE_SITEMAP_XML_CONFIGURATION_KEY] ?? [];

    if (empty($sitemapValues)) {
      return [];
    }

    // Check for no-index setting.
    if (!$sitemapValues["index"]) {
      return $this->getExcludeTag();
    }

    // Check for priority setting.
    if (isset($sitemapValues["priority"])) {

      $values = [
        "0.0" => 0,
        "0.1" => 1,
        "0.2" => 2,
        "0.3" => 3,
        "0.4" => 4,
        "0.5" => 5,
        "0.6" => 6,
        "0.7" => 7,
        "0.8" => 8,
        "0.9" => 9,
        "1.0" => 10,
      ];
      $priority = $values[$sitemapValues["priority"]] ?? 5;
      return [
        [
          "#tag" => "meta",
          "#attributes" => [
            "class" => ["swiftype"],
            "name" => "priority",
            "data-type" => "number",
            "content" => $priority,
          ],
        ], "swiftype-priority",
      ];
    }

    return [];
  }

  /**
   * Provides meta tags.
   *
   * @return array
   *   Swiftype tags.
   */
  private function getExcludeTag() {

    return [
      [
        '#tag' => 'meta',
        '#attributes' => [
          'name' => 'st:robots',
          'content' => ['#plain_text' => "noindex"],
        ],
      ],
      "swiftype-exclude",
    ];
  }

  /**
   * Get safe, trimmed string.
   *
   * @return string
   *   Trimmed string.
   */
  private function getCleanString(string $input = "") {

    $value = strip_tags((string) $input);
    $value = htmlspecialchars_decode($value);
    $value = preg_replace("#\r|\n#", " ", $value);
    if (strlen($value) > 600) {
      $value = substr($value, 0, 600) . "...";
    }
    return $value;
  }

}
