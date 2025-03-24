<?php

namespace Drupal\if_lagoonfactsgraph\Utilities;

use Symfony\Component\VarDumper\Cloner\VarCloner;
use Symfony\Component\VarDumper\Dumper\HtmlDumper;

/**
 * Pretty print.
 */
class Dumper {

  /**
   * Pretty print.
   */
  public static function print(mixed $data) {
    $cloner = new VarCloner();
    $cloner->setMaxItems(-1);

    $dumper = new HtmlDumper();
    $dumper->setTheme("light");

    return $dumper->dump($cloner->cloneVar($data)->withMaxDepth(60), TRUE, [
      'maxDepth' => -1,
    ]);

  }

}
