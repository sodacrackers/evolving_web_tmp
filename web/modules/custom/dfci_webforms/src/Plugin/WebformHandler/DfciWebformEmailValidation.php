<?php

namespace Drupal\dfci_webforms\Plugin\WebformHandler;

use Drupal\Core\Form\FormStateInterface;
use Drupal\webform\Plugin\WebformHandler\EmailWebformHandler;
use Drupal\webform\WebformSubmissionInterface;

/**
 * Custom email webform handler with additional validation.
 *
 * @WebformHandler(
 *   id = "dfci_email_validation",
 *   label = @Translation("DFCI Email Validation"),
 *   category = @Translation("Notification"),
 *   description = @Translation("Webform handler retricting email domains."),
 *   cardinality = \Drupal\webform\Plugin\WebformHandlerInterface::CARDINALITY_UNLIMITED,
 *   results = \Drupal\webform\Plugin\WebformHandlerInterface::RESULTS_PROCESSED,
 * )
 */
class DfciWebformEmailValidation extends EmailWebformHandler {

  /**
   * Allowed mail to domains.
   */
  const ALLOWED_RECIPIENT_DOMAINS = ['@harvard.edu', '@dfci.harvard.edu'];

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state, WebformSubmissionInterface $webform_submission) {
    // Call the parent validation.
    parent::validateForm($form, $form_state, $webform_submission);

    // Fetch resolved mail addresses.
    $recipients = $this->getRecipients($webform_submission);

    // Skip validation for empty or `_default` values.
    $recipients = array_filter($recipients, function ($email) {
      return $email !== '_default';
    });

    // Validate email domains.
    if (!$this->isEmailAllowed($recipients)) {
      $form_state->setErrorByName('to_mail', $this->t('An email (@emails) did not match allowed domains: @domains', [
        '@emails' => implode(', ', $recipients),
        '@domains' => implode(', ', self::ALLOWED_RECIPIENT_DOMAINS),
      ]));
    }
  }

  /**
   * Resolve recipients in configuration.
   *
   * @param \Drupal\webform\WebformSubmissionInterface $webform_submission
   *   The Webform submission.
   *
   * @return array
   *   The resolved recipient email addresses.
   */
  private function getRecipients(WebformSubmissionInterface $webform_submission) {
    $to_mail = $this->configuration['to_mail'] ?? NULL;

    // Resolve tokens in 'to_mail'.
    if ($to_mail) {
      $to_mail = \Drupal::token()->replace($to_mail, [
        'webform_submission' => $webform_submission,
        'user' => \Drupal::currentUser(),
      ]);
    }
    // Provide an array, if a comma-separated string.
    return is_array($to_mail) ? $to_mail : array_filter(array_map('trim', explode(',', $to_mail)));
  }

  /**
   * Check emails have allowed domains.
   *
   * @param string|array $recipients
   *   The email address or array of email addresses.
   *
   * @return bool
   *   TRUE if all recipients are within allowed domains, FALSE otherwise.
   */
  private function isEmailAllowed($recipients) {
    $recipients = is_array($recipients) ? $recipients : [$recipients];
    foreach ($recipients as $single_email) {
      $valid = FALSE;
      foreach (self::ALLOWED_RECIPIENT_DOMAINS as $domain) {
        if (str_ends_with(trim($single_email), $domain)) {
          $valid = TRUE;
          break;
        }
      }
      if (!$valid) {
        return FALSE;
      }
    }
    return TRUE;
  }

}
