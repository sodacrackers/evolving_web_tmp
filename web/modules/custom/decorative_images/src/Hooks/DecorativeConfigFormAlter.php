<?php

namespace Drupal\decorative_images\Hooks;

use Drupal\field\Entity\FieldConfig;
use Drupal\Core\Form\FormStateInterface;

/**
 * Manage image field configuration.
 */
class DecorativeConfigFormAlter {

  /**
   * Alters the image field configuration form.
   */
  public static function alterForm(array &$form, FormStateInterface $form_state, string $form_id): void {
    if ($form_id !== 'field_config_edit_form') {
      return;
    }

    $field_config = $form_state->getFormObject()?->getEntity();
    if (!$field_config instanceof FieldConfig || $field_config->getType() !== 'image') {
      return;
    }

    // Add custom fields.
    $form['settings']['decorative_enabled'] = [
      '#type' => 'checkbox',
      '#title' => t('Enable the <em>Decorative</em> field'),
      '#description' => t('The image may have a decorative, presentation-only role.'),
      '#default_value' => $field_config->getThirdPartySetting('decorative_images', 'decorative_enabled', 0),
      '#weight' => $form['settings']['alt_field_required']['#weight'] + 1,
    ];
    $form['settings']['decorative_or_alternative_required'] = [
      '#type' => 'checkbox',
      '#title' => t('Require <em>Alt</em> or <em>Decorative</em>'),
      '#description' => t('If enabled, either alternative text or the decorative option is required. For use, <em>Decorative</em> must be enabled and <em>Alt</em> cannot be required.'),
      '#default_value' => $field_config->getThirdPartySetting('decorative_images', 'decorative_or_alternative_required', 0),
      '#weight' => $form['settings']['alt_field_required']['#weight'] + 2,
    ];

    // Attach entity builder.
    $form['#entity_builders'][] = [self::class, 'saveEntitySettings'];
  }

  /**
   * Saves third-party settings on the field entity.
   */
  public static function saveEntitySettings($entity_type, FieldConfig $entity, array &$form, FormStateInterface $form_state): void {
    if ($entity->getType() === 'image') {
      $entity->setThirdPartySetting(
        'decorative_images',
        'decorative_enabled',
        $form_state->getValue(['settings', 'decorative_enabled']) ?? 0
      );
      $entity->setThirdPartySetting(
        'decorative_images',
        'decorative_or_alternative_required',
        $form_state->getValue(['settings', 'decorative_or_alternative_required']) ?? 0
      );
    }
  }

}
