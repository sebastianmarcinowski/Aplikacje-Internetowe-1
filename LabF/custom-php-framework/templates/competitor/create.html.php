<?php

/** @var \App\Model\Competitor $competitor */
/** @var \App\Service\Router $router */

$title = 'Create Competitor';
$bodyClass = "edit";

ob_start(); ?>
    <h1>Add Competitor</h1>
    <form action="<?= $router->generatePath('competitor-create') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="competitor-create">
    </form>

    <a href="<?= $router->generatePath('competitor-index') ?>">Back to list</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
