<?php

namespace Drupal\uwmcs_extension;

use Drupal\node\Entity\Node;
use Drupal\Component\Render\FormattableMarkup;
use Drupal\Component\Utility\Html;
use Drupal\Core\Render\Markup;
use Drupal\Core\Url;
use Drupal\uwmcs_reader\Controller\UwmMapper;

/**
 * Provides custom twig filters or functions to themes.
 */
class TwigExtension extends \Twig_Extension {

  /**
   * Generates a list of all Twig functions that this extension defines.
   *
   * @return array
   *   A key/value array that defines custom Twig functions. The key denotes the
   *   function name used in the tag, e.g.:
   *
   * @code
   *   {{ uwm_test_func() }}
   * @endcode
   *
   *   The value is a standard PHP callback that defines what the function does.
   */
  public function getFunctions() {
    return [
      new \Twig_SimpleFunction(
        'uwm_test_func', [$this, 'testFunction']),
      new \Twig_SimpleFunction(
        'uwm_get_path_nid', [$this, 'getPathNid']),
      new \Twig_SimpleFunction(
        'uwm_plugin_block', [$this, 'getBlock']),
      new \Twig_SimpleFunction(
        'uwm_get_api_nid', [$this, 'getApiPathNid']),
      new \Twig_SimpleFunction(
        'uwm_extract_parts', [$this, 'extractArrayValues']),
      new \Twig_SimpleFunction(
        'uwm_sort_by_list', [$this, 'sortArrayByList']),
      new \Twig_SimpleFunction(
        'uwm_referenced_titles_array', [
          $this,
          'getEntityReferenceTitlesArray',
        ]),
      new \Twig_SimpleFunction(
        'uwm_get_sharepoint_location_image', [
          $this,
          'getSharepointLocationImage',
        ]),
      new \Twig_SimpleFunction(
        'uwm_cta_link', [
          $this,
          'getCustomLinkRenderArray',
        ]),
    ];
  }

  /**
   * Generates a list of all Twig filters that this extension defines.
   *
   * @return array
   *   A key/value array that defines custom Twig filters. The key denotes the
   *   filter name used in the tag, e.g.:
   *
   * @code
   *   {{ foo|uwm_test_filter }}
   * @endcode
   *
   *   The value is a standard PHP callback that defines what the filter does.
   */
  public function getFilters() {
    return [
      new \Twig_SimpleFilter(
        'uwm_test_filter', [$this, 'testFilter']),
      new \Twig_SimpleFilter(
        'uwm_replace_markup', [$this, 'convertInlineStyles']),
      new \Twig_SimpleFilter(
        'uwm_join_parts', [$this, 'joinArray']),
      new \Twig_SimpleFilter(
        'uwm_sort_parts', [$this, 'sortArrayByValues']),
      new \Twig_SimpleFilter(
        'uwm_format_phone', [$this, 'formatPhone']),
      new \Twig_SimpleFilter(
        'uwm_url_decode', [$this, 'decodeUrl']),
      new \Twig_SimpleFilter(
        'uwm_arraycount_styles', [$this, 'collectionCssClasses']),
      new \Twig_SimpleFilter(
        'uwm_format_accent_class', [$this, 'formatAccentClass']),
      new \Twig_SimpleFilter(
        'uwm_filter_non_numeric_keys', [$this, 'filterNonNumericKeys']),
      new \Twig_SimpleFilter(
        'uwm_replace_links_with_text', [$this, 'replaceLinkWithText']),

    ];
  }

  /**
   * Gets a unique identifier for this Twig extension.
   *
   * @return string
   *   A unique identifier for this Twig extension.
   */
  public function getName() {
    return 'uwmcs_extension';
  }

  /**
   * Description text.
   */
  public static function testFunction(string $linkText = '', string $linkUrl = '') {

    // @TODO Draft. Needs updates.
    // Url::fromRoute('examples.description').
    return [
      '#title' => $linkText,
      '#type' => 'link',
      '#url' => $linkUrl,
    ];
  }

  /**
   * Description text.
   *
   * @param string $string
   *   Description text.
   *
   * @return string
   *   Description text.
   */
  public static function testFilter(string $string) {
    return strtolower($string);
  }

  /**
   * Description text.
   *
   * @param string $string
   *   Description text.
   *
   * @return string
   *   Description text.
   */
  public static function getPathNid(string $string = NULL) {

    if ($string) {
      return UwmMapper::getNidByPathAlias($string);
    }

  }

  /**
   * Description text.
   *
   * @param string $string
   *   Description text.
   *
   * @return array
   *   Description here.
   */
  public static function getBlock(string $string = NULL) {

    if ($string) {

      $blockManager = \Drupal::service('plugin.manager.block');

      $pluginBlock = $blockManager->createInstance($string, []);

      $accessResult = $pluginBlock->access(\Drupal::currentUser());

      if (is_object($accessResult) && $accessResult->isForbidden() || is_bool($accessResult) && !$accessResult) {
        return [];
      }
      $render = $pluginBlock->build();

      return $render;
    }

  }

  /**
   * Description text.
   *
   * @param string $string
   *   Description text.
   *
   * @return string
   *   Description text.
   */
  public static function getApiPathNid(string $string = NULL) {

    if ($string) {
      return UwmMapper::getNidByInformationManagerUri($string);
    }

  }

  /**
   * Description text.
   *
   * @param string $string
   *   Description text.
   *
   * @return string
   *   Description text.
   */
  public static function convertInlineStyles(string $string = NULL) {

    $patterns = [
      '/(style="[^"]?italic[^>]+>)([^<]+)/',
      '/(style="[^"]?bold[^>]+>)([^<]+)/',
      '/<style .*style>/s',
    ];

    $replacements = [
      '$1<em>$2</em>',
      '$1<strong>$2</strong>',
      '',
    ];

    return preg_replace($patterns, $replacements, $string);

  }

  /**
   * Description text.
   *
   * @param array $parts
   *   Description text.
   * @param string $separator
   *   Description text.
   *
   * @return string
   *   Description text.
   */
  public static function joinArray(array $parts = NULL, string $separator = ', ') {

    $cleanArr = [];

    foreach ((array) $parts as $part) {
      if (is_array($part)) {
        $part = self::joinArray($part, $separator);
      }
      $cleanPart = trim(
        preg_replace('/\s+/', ' ', $part)
      );
      if (!empty($cleanPart)) {
        $cleanArr[] = $cleanPart;
      }
    }

    return implode($separator, $cleanArr);

  }

  /**
   * Description here.
   *
   * @param mixed $data
   *   Description here.
   * @param string|null $desiredKeyName
   *   Description here.
   * @param array $resultArray
   *   Description here.
   *
   * @code
   *   These are all valid:
   *   {{ uwm_extract_parts(clinic, 'expertiseName') | uwm_join_parts(',<br>') |
   *   raw }}
   *   {{ uwm_extract_parts(clinic.expertise, 'expertiseName') | slice(0, 4) |
   *   uwm_join_parts(',<br>') | raw }}
   * @endcode
   *
   * @return array
   *   Description here.
   */
  public static function extractArrayValues($data = [], string $desiredKeyName = NULL, array &$resultArray = []) {

    foreach ((array) $data as $key => $value) {

      if ($key === $desiredKeyName) {
        if (is_array($value)) {
          $resultArray = $resultArray + $value;
        }
        else {
          $resultArray[] = $value;
        }
      }
      elseif (is_array($value) || is_object($value)) {

        self::extractArrayValues($value, $desiredKeyName, $resultArray);

      }

    }

    return (array) $resultArray;

  }

  /**
   * Try to get a clinic image URL SharePoint or return generic placeholder.
   *
   * @param string $clinicUrl
   *   A clinicUrl formatted like /locations/clinic-name.
   *
   * @return string
   *   Returns a URL for either the clinic image or a generic placeholder.
   */
  public static function getSharepointLocationImage(string $clinicUrl = NULL) {

    $imageUrl = NULL;
    if ($clinicUrl) {
      $url = 'https://www.uwmedicine.org' . $clinicUrl . '/PublishingImages/splash1.jpg';
      $responseCode = get_headers($url);
      $imageExists = $responseCode[0] == ('HTTP/2 200' or 'HTTP/1.1 200 OK');
      if ($imageExists) {
        $imageUrl = $url;
      }
    }
    else {
      $imageUrl = "/themes/custom/uwmed/dist/assets/missing-img-horizontal.png";
    }
    return $imageUrl;
  }

  /**
   * Description here.
   *
   * @param mixed $data
   *   Description here.
   * @param string|null $sortKey
   *   Description here.
   *
   * @return mixed
   *   Description here.
   */
  public static function sortArrayByValues($data = [], string $sortKey = NULL) {

    if (!is_array($data)) {
      return $data;
    }

    usort($data, function ($a, $b) use ($sortKey) {

      if (isset($sortKey)) {

        if (is_array($a) && isset($a[$sortKey])) {

          return $a[$sortKey] <=> $b[$sortKey];

        }
        elseif (is_object($a) && isset($a->{$sortKey})) {

          return $a->{$sortKey} <=> $b->{$sortKey};

        }
      }

      return $a <=> $b;

    });

    return $data;

  }

  /**
   * Description here.
   *
   * @param array $data
   *   Description here.
   *
   * @return array
   *   Description here.
   */
  public static function filterNonNumericKeys(array $data = []) {

    $returnArray = [];

    if (!is_array($data)) {
      return $data;
    }

    foreach ($data as $key => $value) {

      if (is_numeric($key)) {
        $returnArray[] = $value;
      }

    }

    return $returnArray;

  }

  /**
   * Replace a link render array with the title string.
   *
   * @param array $data
   *   Description here.
   *
   * @return array|string
   *   Description here.
   */
  public static function replaceLinkWithText(array $data = []) {

    $returnArray = $data;

    if (isset($data['#type']) && $data['#type'] === 'link') {

      $title = $data['#title'];
      $returnArray = Markup::create($title);

    }
    elseif (isset($data[0]['#type'])) {

      foreach ($returnArray as $key => $value) {

        if (isset($value['#type']) && $value['#type'] === 'link') {

          $title = $value['#title'];
          $returnArray[$key] = Markup::create($title);

        }

      }
    }

    return $returnArray;

  }

  /**
   * Description text.
   *
   * @param string $phone
   *   Description text.
   * @param string $separator
   *   Description text.
   *
   * @return null|string
   *   Description text.
   */
  public static function formatPhone(string $phone = '', string $separator = '-') {

    $digits = preg_replace('/[^0-9]/', '', $phone);

    if (strlen($digits) > 10) {
      return implode(
        [
          substr($digits, 0, strlen($digits) - 10),
          '(' . substr($digits, -10, 3) . ')',
          substr($digits, -7, 3),
          substr($digits, -4, 4),
        ], $separator);

    }
    elseif (strlen($digits) == 10) {
      return implode(
        [
          substr($digits, 0, 3),
          substr($digits, 3, 3),
          substr($digits, 6, 4),
        ], $separator);

    }
    elseif (strlen($digits) == 7) {
      return implode(
        [
          substr($digits, 0, 3),
          substr($digits, 3, 4),
        ], $separator);
    }

    return NULL;
  }

  /**
   * Description text.
   *
   * @param string $url
   *   Description text.
   *
   * @return string
   *   Description text.
   */
  public static function decodeUrl(string $url = '') {

    return urldecode($url);
  }

  /**
   * Description text.
   *
   * @param mixed|null $collectionItems
   *   Description text.
   *
   * @return array
   *   Description text.
   */
  public static function collectionCssClasses($collectionItems = NULL) {

    $cssClasses = [];

    if (method_exists($collectionItems, 'getValue')) {
      $collectionItems = $collectionItems->getValue();
    }

    $collection = (array) $collectionItems;
    $cssClasses[] = 'group-of-' . count($collection) . '-total';
    for ($i = 2; $i <= 10; $i++) {
      if (count($collection) % $i === 0) {
        $cssClasses[] = 'group-of-' . $i . 's';
      }
    }

    return $cssClasses;

  }

  /**
   * Description text.
   *
   * @param string|null $accentColor
   *   Description text.
   *
   * @return string
   *   Description text.
   */
  public static function formatAccentClass(string $accentColor = '') {

    $suffixPattern = '/(.*)\s\(.*\)/';
    $suffixReplacement = '${1}';
    $accentClass = preg_replace($suffixPattern, $suffixReplacement, $accentColor);

    $spacePattern = '/\s/';
    $spaceReplacement = '-';
    $accentClass = preg_replace($spacePattern, $spaceReplacement, $accentClass);
    return strtolower($accentClass);

  }

  /**
   * Sort an array using a different array of values.
   *
   * @param array $originalList
   *   The array to sort.
   * @param array $preferredSort
   *   An array with the preferred order.
   * @param string|null $sortKey
   *   Array key having the sorting value.
   *
   * @return array
   *   The sorted array or, original array if sort failed.
   */
  public static function sortArrayByList(array $originalList = [], array $preferredSort = [], string $sortKey = NULL) {

    $newList = [];
    $tmpArray = $originalList;

    foreach ($preferredSort as $preferred) {
      foreach ($originalList as $key => $item) {
        $a = strtolower($preferred);
        $b = strtolower($item[$sortKey]);

        if (stripos($b, $a) !== FALSE) {
          $newList[] = $item;
          unset($tmpArray[$key]);

        }
      }
    }
    foreach ($tmpArray as $item) {
      $newList[] = $item;
    }
    if (count($newList) === count($originalList)) {
      return $newList;
    }

    return $originalList;

  }

  /**
   * Generates a Drupal "link" render element for theming.
   *
   * Many parts of the theme have links in twig templates. This twig
   * function can be used normalizing CTA button links. We try to
   * add classes useful in theming and for finding buttons in
   * third-party tools like Google Tag Manager. We return a Drupal
   * render array, so twig routines like `addClasses()` can be
   * applied.
   *
   * Minimally, we should be able to provide a link with the classes
   *    `.cta-from-`
   *    `.cta-to-bios`
   *
   * <code>
   * In a *.twig file, create a UWM CTA link as follows:
   *
   * {{ uwm_cta_link('Search our locations', '/search/locations') }}
   * OR
   *
   * {% set cta = uwm_cta_link('Search our locations', '/search/locations') %}
   * {{ cta.addClasses(['one', 'two']) }}
   *
   * </code>
   *
   * @param string $linkText
   *   The link text.
   * @param string $linkUrl
   *   The link path.
   * @param array $linkClasses
   *   Array of CSS classes for link.
   * @param array $attributes
   *   Array to merge with link attributes.
   *
   * @return array
   *   A Drupal link render array.
   *
   * @example See snippet above.
   * @see \Drupal\Core\Render\Element\Link
   * @see \Drupal\Core\Utility\LinkGeneratorInterface
   */
  public static function getCustomLinkRenderArray(string $linkText = '', string $linkUrl = '', array $linkClasses = [], array $attributes = []) {

    $destinationUrl = NULL;
    $destinationUrlString = NULL;
    $destinationTitle = NULL;
    $destinationClasses = ['uwm-cta'];
    try {
      /***
       * The link render array requires a \Drupal\Url object containing
       * URL information pointing to a internal or external link. Try to
       * create one using $linkUrl.
       */
      if (in_array($linkUrl[0], ['/', '#', '?'])) {
        // Links such as '/node/1'.
        $destinationUrl = Url::fromUserInput($linkUrl);
      }
      else {
        // Links such as 'http://www.google.com' or 'tel:800-555-1111'.
        $destinationUrl = Url::fromUri($linkUrl);
      }

      $destinationUrlString = $destinationUrl->toString();
      $destinationPath = parse_url($destinationUrlString, PHP_URL_PATH);

      /***
       * It's useful for analytics to have the link title on
       * a CTA like "Location Details." Try to add the destination
       * title here.
       */
      $destinationAlias = \Drupal::service('path.alias_manager')->getPathByAlias($destinationPath);
      if (preg_match('/node\/(\d+)/', $destinationAlias, $matches)) {
        $node = Node::load($matches[1]);
        if ($node && $node->id()) {
          $destinationTitle = trim($node->getTitle());
        }
      }

    }
    catch (\Exception $exception) {
      // @TODO: Add Drupal watchdog message.
      $i = NULL;
    }

    /***
     * Add CSS classes for third-party tools
     * to help distinguish this CTA in markup.
     */
    if ($destinationUrl && $destinationUrlString) {

      $destPath = ltrim(parse_url($destinationUrlString, PHP_URL_PATH), '/');
      $destHost = parse_url($destinationUrlString, PHP_URL_HOST);
      if ($destHost) {
        // Add hostname to css classes.
        // For https://ecare.uwmedicine.org/prod01/OpenScheduling/SignupAndSchedule/EmbeddedSchedule?vt=9000&view=plain&dept=#4011041,4011060,4011043
        // add to-ecareuwmedicineorg.
        $destinationClasses[] = 'cta-to-' . Html::getClass($destHost);
      }

      // Add basename to css classes.
      // For https://ecare.uwmedicine.org/prod01/OpenScheduling/SignupAndSchedule/EmbeddedSchedule?vt=9000&view=plain&dept=#4011041,4011060,4011043
      // add to-prod01-openscheduling-signupandschedule-embeddedschedule.
      if ($destPath) {
        $destinationClasses[] = Html::getClass('cta-to-' . $destPath);
      }
    }

    $currentPath = ltrim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
    if ($currentPath) {
      $destinationClasses[] = Html::getClass('cta-from-' . $currentPath);
    }

    // Append classes from caller:
    $flattenedArray = self::flattenArray($linkClasses);
    $destinationClasses = array_merge($destinationClasses, $flattenedArray);

    $attributes = array_merge([
      'class' => $destinationClasses,
      'data-context-title' => trim($destinationTitle),
    ],
    $attributes);

    /***
     * Return a Drupal render array for theming.
     */
    return [
      '#type' => 'link',
      '#title' => new FormattableMarkup($linkText, []),
      '#url' => $destinationUrl,
      '#attributes' => $attributes,
    ];

  }

  /**
   * Utility function to flatten multi-dimensional arrays.
   *
   * @param array $array
   *   Array to flatten.
   *
   * @return array
   *   A single-dimension array.
   */
  private static function flattenArray(array $array) {
    $return = [];
    array_walk_recursive($array, function ($a) use (&$return) {
      $return[] = $a;
    });
    return $return;
  }

}
