<?php

namespace Drupal\decorative_images\Hooks;

use Drupal\image\Plugin\Field\FieldType\ImageItem;
use Drupal\image\Plugin\Field\FieldWidget\ImageWidget;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class to handle widget-related hooks.
 */
class DecorativeWidgetFormAlter {

  /**
   * Alters the image field widget to add the 'Decorative' checkbox.
   */
  public static function alterForm(array &$element, FormStateInterface $form_state, array $context): void {
    $widget = $context['widget'] ?? NULL;

    if (!$widget instanceof ImageWidget || empty($context['items']) || empty($context['items']?->getName())) {
      return;
    }

    // Get the field config.
    $entity = $form_state->getFormObject()?->getEntity();
    $field_name = $context['items']?->getName();
    $field_definition = $entity?->getFieldDefinition($field_name);
    $field_config = \Drupal::entityTypeManager()->getStorage('field_config')->load($field_definition?->id());

    if (!$field_config || !$field_config->getThirdPartySetting('decorative_images', 'decorative_enabled')) {
      return;
    }

    // Get the file target_id.
    if (isset($context['items']) && isset($context["delta"]) && $context['items']->count() > 0) {
      $image = $context['items']->get($context["delta"]);
      if ($image instanceof ImageItem) {
        $target_id = $image->target_id;
        // Check fids for an uploaded, unsaved image.
        $fids = $image->fids ?? [];
        $fid = reset($fids);
      }
    }

    // Check if there's a file.
    if (empty($target_id) && empty($fid)) {
      return;
    }

    // Get the stored value.
    $decorative_value = \Drupal::service('keyvalue')->get('decorative_images')->get($target_id) ?? NULL;

    // Add our decorative field.
    $element['is_decorative'] = [
      '#type' => 'checkbox',
      '#title' => t('Decorative image'),
      '#default_value' => $decorative_value ?? 0,
    ];

    // Add our validation.
    $element['#element_validate'][] = [self::class, 'validateForm'];
  }

  /**
   * Custom validation function for the image widget.
   */
  public static function validateForm($element, FormStateInterface $form_state) {

    // Check if the form was submitted.
    $triggering_element = $form_state->getTriggeringElement();
    if (!in_array('::submitForm', $triggering_element['#submit'] ?? [])) {
      return;
    }

    // Get the field config.
    $entity = $form_state->getFormObject()?->getEntity();
    $field_name = $element['#field_name'] ?? '';
    $field_definition = $entity?->getFieldDefinition($field_name);
    $field_config = \Drupal::entityTypeManager()->getStorage('field_config')->load($field_definition?->id());

    if (!$field_config) {
      return;
    }

    // Only proceed if Alt or Decorative is required.
    if (!$field_config->getThirdPartySetting('decorative_images', 'decorative_or_alternative_required', 0)) {
      return;
    }

    $values = $form_state->getValue($element['#parents'] ?? []);

    if (empty($values['alt']) && empty($values['is_decorative'])) {
      $form_state->setError($element['alt'], t('Either Alternative text or Decorative must be completed.'));
    }
  }

}
